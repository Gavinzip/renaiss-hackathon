import { readFile } from 'node:fs/promises'
import pg from 'pg'

if (!process.env.DATABASE_URL_UNPOOLED) throw new Error('Set DATABASE_URL_UNPOOLED to the migration owner connection.')
const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED })
await client.connect()
try {
  await client.query(await readFile(new URL('../server/migrations/001-postgres.sql', import.meta.url),'utf8'))
  if (process.env.APP_DATABASE_ROLE) {
    const role = process.env.APP_DATABASE_ROLE
    if (!/^[a-z][a-z0-9_]*$/.test(role)) throw new Error('Invalid APP_DATABASE_ROLE.')
    const memberships = await client.query('SELECT 1 FROM pg_auth_members WHERE member=(SELECT oid FROM pg_roles WHERE rolname=$1)', [role])
    if (memberships.rowCount) throw new Error('Application role must have no parent roles. Create an ordinary SQL login role, not a Neon management role.')
    await client.query(`ALTER ROLE ${role} NOCREATEDB NOCREATEROLE NOINHERIT`)
    await client.query(`REVOKE ALL ON SCHEMA public FROM ${role}; GRANT USAGE ON SCHEMA public TO ${role}`)
    await client.query(`GRANT SELECT, INSERT, DELETE ON auth_challenges,auth_sessions TO ${role}`)
    await client.query(`GRANT SELECT, INSERT ON vote_ballots,vote_choices,vote_events TO ${role}`)
    await client.query(`GRANT SELECT ON vote_allocations TO ${role}`)
    await client.query(`GRANT SELECT,INSERT,UPDATE,DELETE ON rate_limits,provider_requests TO ${role}`)
  }
  console.log('PostgreSQL schema and application permissions applied.')
} finally { await client.end() }
