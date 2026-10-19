import { randomBytes } from 'node:crypto'
import { exportSnapshot, encryptSnapshot, decryptSnapshot, sha256 } from './snapshot.mjs'

async function driveAccessToken(backup) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: backup.clientId, client_secret: backup.clientSecret, refresh_token: backup.refreshToken, grant_type: 'refresh_token' }),
    signal: AbortSignal.timeout(15000),
  })
  const result = await response.json()
  if (!response.ok || !result.access_token) throw new Error(`Backup Drive authorization failed (${response.status}).`)
  return result.access_token
}
function requireConfigured(config) {
  if (!config.backup.configured) throw new Error(`Backup configuration is ${config.backup.state}.`)
}
export async function runDatabaseBackup(config, database) {
  requireConfigured(config)
  const token = await driveAccessToken(config.backup)
  const snapshot = await exportSnapshot(database)
  const bytes = encryptSnapshot(snapshot,config.backup.encryptionKey)
  const hash = sha256(bytes)
  const boundary = randomBytes(24).toString('hex')
  const metadata = { name: `hackathon-${snapshot.createdAt.replaceAll(':','-')}.json.enc`, parents: [config.backup.folderId], appProperties: { format: snapshot.format, sha256: hash } }
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/octet-stream\r\n\r\n`),
    bytes, Buffer.from(`\r\n--${boundary}--\r\n`),
  ])
  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,size,appProperties', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` }, body,
    signal: AbortSignal.timeout(30000),
  })
  const file = await response.json()
  if (!response.ok || !file.id || Number(file.size) !== bytes.length || file.appProperties?.sha256 !== hash) throw new Error(`Backup upload verification failed (${response.status}).`)
  return { completedAt: snapshot.createdAt, bytes: bytes.length, sha256: hash, fileId: file.id }
}
export async function runRepositoryCheck(config) {
  requireConfigured(config)
  const token = await driveAccessToken(config.backup)
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('q',`'${config.backup.folderId}' in parents and trashed=false and appProperties has { key='format' and value='renaiss-hackathon-postgres-v1' }`)
  url.searchParams.set('fields','files(id,size,appProperties)')
  url.searchParams.set('orderBy','createdTime desc')
  url.searchParams.set('pageSize','1')
  const list = await fetch(url,{ headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15000) })
  const result = await list.json(), file = result.files?.[0]
  if (!list.ok || !file) throw new Error('No offsite backup is available to verify.')
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,{ headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`Backup download failed (${response.status}).`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (sha256(bytes) !== file.appProperties?.sha256) throw new Error('Backup checksum mismatch.')
  const snapshot = decryptSnapshot(bytes,config.backup.encryptionKey)
  return { checkedAt: new Date().toISOString(), snapshotAt: snapshot.createdAt, bytes: bytes.length, fileId: file.id }
}
