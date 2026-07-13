import { HttpError } from './http.mjs'

export function isAdministrator(config, session) {
  const safeWalletAddress = session?.user?.safeWalletAddress
  return Boolean(
    safeWalletAddress
    && config.adminSafeWalletAddresses.includes(safeWalletAddress),
  )
}

export function requireAdministrator(config, session) {
  if (!config.adminSafeWalletAddresses.length) {
    throw new HttpError(503, 'admin_not_configured', 'The administrator wallet allowlist is not configured.')
  }

  if (!isAdministrator(config, session)) {
    throw new HttpError(403, 'admin_access_denied', 'This Renaiss account is not authorized to view live voting results.')
  }

  return session
}
