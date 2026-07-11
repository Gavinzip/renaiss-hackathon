import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function loadLocalEnv(cwd = process.cwd()) {
  // Process environment always wins. Loading .env.local first gives it
  // precedence over a non-secret .env file without exposing either file.
  for (const fileName of ['.env.local', '.env']) {
    const filePath = resolve(cwd, fileName)
    if (!existsSync(filePath)) continue
    const source = readFileSync(filePath, 'utf8')
    for (const line of source.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const separator = trimmed.indexOf('=')
      if (separator <= 0) continue
      const key = trimmed.slice(0, separator).trim()
      const rawValue = trimmed.slice(separator + 1).trim()
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue
      process.env[key] ??= unquote(rawValue)
    }
  }
}

function unquote(value) {
  if (value.length < 2) return value
  const first = value[0]
  const last = value[value.length - 1]
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return value.slice(1, -1)
  }
  return value
}
