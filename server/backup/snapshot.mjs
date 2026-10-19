import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

export const SNAPSHOT_TABLES = Object.freeze(['auth_challenges','auth_sessions','vote_allocations','vote_ballots','vote_choices','vote_events','rate_limits','provider_requests'])
export const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex')
export async function exportSnapshot(database) {
  return database.connection.transaction(async () => {
    const tables = {}
    for (const table of SNAPSHOT_TABLES) {
      tables[table] = (await database.connection.query(`SELECT * FROM public.${table} ORDER BY 1,2`)).rows
    }
    return { format: 'renaiss-hackathon-postgres-v1', createdAt: new Date().toISOString(), tables }
  }, { readOnly: true })
}
export function encryptSnapshot(snapshot, keyHex) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm',Buffer.from(keyHex,'hex'),iv)
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(snapshot),'utf8'),cipher.final()])
  return Buffer.concat([Buffer.from('RHP1'),iv,cipher.getAuthTag(),ciphertext])
}
export function decryptSnapshot(bytes, keyHex) {
  if (bytes.subarray(0,4).toString() !== 'RHP1') throw new Error('Unknown backup format.')
  const decipher = createDecipheriv('aes-256-gcm',Buffer.from(keyHex,'hex'),bytes.subarray(4,16))
  decipher.setAuthTag(bytes.subarray(16,32))
  const snapshot = JSON.parse(Buffer.concat([decipher.update(bytes.subarray(32)),decipher.final()]).toString('utf8'))
  if (snapshot.format !== 'renaiss-hackathon-postgres-v1' || SNAPSHOT_TABLES.some((table) => !Array.isArray(snapshot.tables?.[table]))) throw new Error('Invalid backup schema.')
  return snapshot
}
