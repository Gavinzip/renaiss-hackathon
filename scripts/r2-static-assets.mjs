import { createHash } from 'node:crypto';
import { access, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { basename, extname, relative, resolve, sep } from 'node:path';
import { spawn } from 'node:child_process';

const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const MEDIA_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.mp3', '.mp4', '.ogg', '.pdf', '.png', '.svg', '.webm', '.webp']);
const CONVERSION_CANDIDATE_EXTENSIONS = new Set(['.gif', '.jpeg', '.jpg', '.png']);
const ICON_NAME = /(apple-touch-icon|favicon|icon|manifest)/i;
const CONTENT_TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'audio/ogg',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const [command = 'audit', ...rawOptions] = process.argv.slice(2);
const options = parseOptions(rawOptions);
const projectRoot = resolve(options.project || process.cwd());
const publicRoot = resolve(projectRoot, options['public-dir'] || 'public');
const assetRoot = resolve(projectRoot, options['asset-dir'] || 'public/assets');
const releaseFile = resolve(projectRoot, options['release-file'] || 'src/generated/staticAssetRelease.js');

if (!['audit', 'publish', 'verify', 'assert-build'].includes(command)) {
  throw new Error(`Unknown command: ${command}`);
}

if (command === 'assert-build') {
  await assertBuild();
  process.exit(0);
}

const files = await collectFiles(assetRoot);
const inventory = await buildInventory(files);

if (command === 'audit') {
  printAudit(inventory);
  process.exit(0);
}

if (inventory.conversionCandidates.length) {
  throw new Error(`Convert these content images to WebP before publishing: ${inventory.conversionCandidates.join(', ')}`);
}

if (command === 'publish') {
  const bucket = requiredOption('bucket');
  if (options['dry-run']) {
    console.log(`Dry run: ${inventory.files.length} objects would publish to r2://${bucket}/${inventory.release}/`);
    process.exit(0);
  }
  await publish(bucket, inventory);
  await writeReleaseFile(inventory);
  console.log(`Published ${inventory.files.length} immutable objects to r2://${bucket}/${inventory.release}/`);
  console.log(`Updated ${relative(projectRoot, releaseFile)}. Rebuild the frontend with VITE_STATIC_ASSET_CDN_BASE_URL set to the custom CDN hostname.`);
  process.exit(0);
}

await verify(inventory);

function parseOptions(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith('--')) throw new Error(`Unexpected argument: ${value}`);
    const equalsIndex = value.indexOf('=');
    const key = value.slice(2, equalsIndex === -1 ? undefined : equalsIndex);
    if (equalsIndex !== -1) {
      result[key] = value.slice(equalsIndex + 1);
      continue;
    }
    const next = values[index + 1];
    if (!next || next.startsWith('--')) {
      result[key] = true;
      continue;
    }
    result[key] = next;
    index += 1;
  }
  return result;
}

async function collectFiles(directory) {
  try {
    await access(directory, constants.R_OK);
  } catch {
    throw new Error(`Asset directory is not readable: ${directory}`);
  }
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const filePath = resolve(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(filePath);
    if (entry.isFile() && !entry.name.startsWith('.')) return [filePath];
    return [];
  }));
  return nested.flat().sort((left, right) => left.localeCompare(right));
}

async function buildInventory(filePaths) {
  const entries = await Promise.all(filePaths.map(async (filePath) => {
    const relativeToPublic = relative(publicRoot, filePath).split(sep).join('/');
    if (relativeToPublic.startsWith('../') || relativeToPublic === '..') {
      throw new Error(`${filePath} is outside ${publicRoot}`);
    }
    const extension = extname(filePath).toLowerCase();
    const fileStat = await stat(filePath);
    const hash = createHash('sha256').update(await readFile(filePath)).digest('hex');
    return {
      extension,
      filePath,
      hash,
      relativeToPublic,
      size: fileStat.size,
    };
  }));
  const releaseHash = createHash('sha256');
  for (const entry of entries) {
    releaseHash.update(entry.relativeToPublic);
    releaseHash.update('\0');
    releaseHash.update(entry.hash);
    releaseHash.update('\0');
  }
  const contentHash = releaseHash.digest('hex');
  const conversionCandidates = entries
    .filter((entry) => CONVERSION_CANDIDATE_EXTENSIONS.has(entry.extension) && !ICON_NAME.test(basename(entry.filePath)))
    .map((entry) => entry.relativeToPublic);
  return {
    contentHash,
    conversionCandidates,
    files: entries,
    release: `r${contentHash.slice(0, 20)}`,
    totalBytes: entries.reduce((total, entry) => total + entry.size, 0),
  };
}

function printAudit(inventory) {
  const byExtension = new Map();
  for (const file of inventory.files) byExtension.set(file.extension || '[none]', (byExtension.get(file.extension || '[none]') || 0) + file.size);
  console.log(`Static assets: ${inventory.files.length} files, ${formatBytes(inventory.totalBytes)}, release ${inventory.release}`);
  for (const [extension, size] of [...byExtension].sort(([left], [right]) => left.localeCompare(right))) {
    console.log(`${extension}\t${formatBytes(size)}`);
  }
  if (inventory.conversionCandidates.length) {
    console.log(`Needs WebP conversion: ${inventory.conversionCandidates.join(', ')}`);
  } else {
    console.log('Web format check: passed (icons and platform-specific PNGs are intentionally exempt).');
  }
}

async function publish(bucket, inventory) {
  let completed = 0;
  const queue = [...inventory.files];
  const concurrency = Math.min(4, queue.length || 1);
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const entry = queue.shift();
      const objectKey = `${inventory.release}/${entry.relativeToPublic}`;
      await runWrangler([
        '--yes',
        'wrangler',
        'r2',
        'object',
        'put',
        `${bucket}/${objectKey}`,
        '--file', entry.filePath,
        '--content-type', CONTENT_TYPES[entry.extension] || 'application/octet-stream',
        '--cache-control', IMMUTABLE_CACHE_CONTROL,
        '--remote',
      ]);
      completed += 1;
      console.log(`Uploaded ${completed}/${inventory.files.length}: ${objectKey}`);
    }
  });
  await Promise.all(workers);
}

async function runWrangler(args, attempt = 1) {
  try {
    await runWranglerOnce(args);
  } catch (error) {
    const message = String(error?.message || error);
    const retryable = /\b(429|500|502|503|504)\b|ECONNRESET|ETIMEDOUT|fetch failed/i.test(message);
    if (!retryable || attempt >= 3) throw error;
    const delayMs = attempt * 1500;
    console.warn(`Transient Cloudflare upload error; retrying in ${delayMs}ms (attempt ${attempt + 1}/3).`);
    await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
    await runWrangler(args, attempt + 1);
  }
}

function runWranglerOnce(args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn('npx', args, { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    child.stdout.on('data', (chunk) => { output += chunk; });
    child.stderr.on('data', (chunk) => { output += chunk; });
    child.once('error', rejectPromise);
    child.once('close', (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`wrangler upload failed (${code}): ${output.trim()}`));
    });
  });
}

async function writeReleaseFile(inventory) {
  const source = [
    '// Generated by scripts/r2-static-assets.mjs. Do not edit by hand.',
    `export const STATIC_ASSET_RELEASE = '${inventory.release}';`,
    `export const STATIC_ASSET_CONTENT_HASH = '${inventory.contentHash}';`,
    `export const STATIC_ASSET_FILE_COUNT = ${inventory.files.length};`,
    '',
  ].join('\n');
  await mkdir(resolve(releaseFile, '..'), { recursive: true });
  await writeFile(releaseFile, source, 'utf8');
}

async function verify(inventory) {
  const base = normalizeAssetBase(requiredOption('base'));
  const failures = [];
  await Promise.all(inventory.files.map(async (entry) => {
    const response = await fetch(`${base}/${inventory.release}/${entry.relativeToPublic}`, { method: 'HEAD' });
    const cacheControl = response.headers.get('cache-control') || '';
    if (!response.ok || !cacheControl.includes('immutable')) {
      failures.push(`${entry.relativeToPublic}: HTTP ${response.status}, Cache-Control: ${cacheControl || '[missing]'}`);
    }
  }));
  if (failures.length) throw new Error(`CDN verification failed:\n${failures.join('\n')}`);
  console.log(`Verified ${inventory.files.length} CDN objects at ${base}/${inventory.release}/ with immutable cache headers.`);
}

async function assertBuild() {
  const distDirectory = resolve(projectRoot, options.dist || 'dist');
  const distFiles = await collectFiles(distDirectory);
  const copiedMedia = distFiles.filter((filePath) => MEDIA_EXTENSIONS.has(extname(filePath).toLowerCase()));
  if (copiedMedia.length) {
    throw new Error(`Build still contains local media files:\n${copiedMedia.map((filePath) => relative(projectRoot, filePath)).join('\n')}`);
  }
  const html = await readFile(resolve(distDirectory, 'index.html'), 'utf8');
  if (html.includes('__STATIC_ASSET_ORIGIN__')) throw new Error('Build left an unresolved static asset HTML token.');
  console.log('Build asset check passed: public media was not copied into dist.');
}

function requiredOption(name) {
  const value = options[name];
  if (!value || value === true) throw new Error(`--${name} is required`);
  return value;
}

function normalizeAssetBase(value) {
  const url = new URL(String(value).trim());
  if (url.protocol !== 'https:') {
    throw new Error('Use an HTTPS static-asset origin.');
  }
  return url.toString().replace(/\/$/, '');
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 ** 2)).toFixed(2)} MB`;
}
