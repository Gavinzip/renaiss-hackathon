import { readFile } from 'node:fs/promises'
import pg from 'pg'
import { PROJECT_IDS } from '../shared/projects.mjs'

const file = process.argv[2]
if (!file || !process.env.DATABASE_URL_UNPOOLED) throw new Error('Usage: DATABASE_URL_UNPOOLED=... node scripts/postgres-import.mjs <private-snapshot.json>')
const data = JSON.parse(await readFile(file,'utf8'))
const tables = ['vote_allocations','vote_ballots','vote_choices','vote_events']
const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED })
await client.connect()
try {
  await client.query('BEGIN')
  await client.query('SET LOCAL search_path TO public')
  for (const table of tables) {
    if (Number((await client.query(`SELECT COUNT(*) AS n FROM ${table}`)).rows[0].n)) throw new Error(`Refusing to overwrite ${table}.`)
    if (!Array.isArray(data[table])) throw new Error(`Snapshot is missing ${table}.`)
    for (const row of data[table]) {
      if (row.project_id && !PROJECT_IDS.includes(row.project_id)) throw new Error(`Unknown project in ${table}.`)
      const columns = Object.keys(row)
      if (columns.some((c) => !/^[a-z_]+$/.test(c))) throw new Error('Invalid snapshot column.')
      await client.query(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${columns.map((_,i) => '$'+(i+1)).join(',')})`,Object.values(row))
    }
  }
  await client.query('COMMIT')
  console.log(JSON.stringify({ imported: Object.fromEntries(tables.map(t => [t,data[t].length])), auth: 'Retained in private SQLite backup only; pilot uses independent cookies and session secret.' }))
} catch(error) {
  await client.query('ROLLBACK')
  throw error
} finally { await client.end() }
