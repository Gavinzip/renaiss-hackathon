import { STATIC_ASSET_RELEASE } from '../generated/staticAssetRelease.js';

const configuredCdnBase = String(import.meta.env.VITE_STATIC_ASSET_CDN_BASE_URL || '')
  .trim()
  .replace(/\/+$/, '');

function normalizedAssetPath(value) {
  const path = `/${String(value || '').replace(/^\/+/, '')}`;
  if (!path.startsWith('/assets/')) {
    throw new Error(`Only public /assets paths can be resolved through the static CDN: ${value}`);
  }
  return path;
}

export function staticAssetUrl(path) {
  const assetPath = normalizedAssetPath(path);
  if (import.meta.env.DEV) return assetPath;

  if (!configuredCdnBase || STATIC_ASSET_RELEASE === 'unpublished') {
    throw new Error('Static asset CDN is not configured. Set VITE_STATIC_ASSET_CDN_BASE_URL and publish an asset release before building for production.');
  }

  return `${configuredCdnBase}/${STATIC_ASSET_RELEASE}${assetPath}`;
}

export function staticAssetCssUrl(path) {
  return `url("${staticAssetUrl(path)}")`;
}
