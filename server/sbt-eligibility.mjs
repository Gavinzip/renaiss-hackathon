import { HttpError } from './http.mjs'

const PAGE_SIZE = 1000
const MAX_PAGES = 1000
const WALLET_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/

function normalizeWallet(value) {
  const wallet = typeof value === 'string' ? value.trim() : ''
  return WALLET_ADDRESS_PATTERN.test(wallet) ? wallet.toLowerCase() : ''
}

function requirePositiveInteger(value, code) {
  const text = String(value ?? '').trim()
  if (!/^\d+$/.test(text)) throw new HttpError(502, code)
  const amount = BigInt(text)
  if (amount <= 0n) throw new HttpError(502, code)
  return amount
}

function requireTokenId(value) {
  const tokenId = String(value ?? '').trim()
  if (!tokenId || !/^\d+$/.test(tokenId)) {
    throw new HttpError(502, 'bscscan_invalid_transfer_row')
  }
  return tokenId
}

export function applySbtTransferRow(balances, walletAddress, row) {
  const tokenId = requireTokenId(row?.tokenID ?? row?.tokenId)
  const amount = requirePositiveInteger(row?.tokenValue, 'bscscan_invalid_transfer_row')
  const fromAddress = normalizeWallet(row?.from)
  const toAddress = normalizeWallet(row?.to)

  if (!fromAddress || !toAddress) throw new HttpError(502, 'bscscan_invalid_transfer_row')
  if (fromAddress === walletAddress) {
    balances.set(tokenId, (balances.get(tokenId) || 0n) - amount)
  }
  if (toAddress === walletAddress) {
    balances.set(tokenId, (balances.get(tokenId) || 0n) + amount)
  }
}

export function positiveSbtBalances(balances) {
  return new Map([...balances].filter(([, balance]) => balance > 0n))
}

function noTransactionsResponse(payload) {
  const message = String(payload?.message || '').toLowerCase()
  const result = typeof payload?.result === 'string' ? payload.result.toLowerCase() : ''
  return payload?.status === '0' && (message.includes('no transactions') || result.includes('no transactions'))
}

function createBscScanRequestScheduler({
  maxConcurrentRequests = 3,
  maxQueuedRequests = 360,
  requestsPerSecond = 3,
}) {
  const queue = []
  const minimumIntervalMs = Math.ceil(1000 / requestsPerSecond)
  let activeRequests = 0
  let nextRequestAt = 0
  let timer = null

  function schedulePump(delay) {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      pump()
    }, delay)
  }

  function pump() {
    while (activeRequests < maxConcurrentRequests && queue.length > 0) {
      const delay = Math.max(0, nextRequestAt - Date.now())
      if (delay > 0) {
        schedulePump(delay)
        return
      }

      const request = queue.shift()
      activeRequests += 1
      nextRequestAt = Date.now() + minimumIntervalMs
      Promise.resolve()
        .then(request.run)
        .then(request.resolve, request.reject)
        .finally(() => {
          activeRequests -= 1
          pump()
        })
    }
  }

  return Object.freeze({
    run(run) {
      if (queue.length >= maxQueuedRequests) {
        return Promise.reject(new HttpError(
          503,
          'bscscan_capacity_exceeded',
          'The official SBT verification service is busy. No vote was recorded.',
        ))
      }
      return new Promise((resolve, reject) => {
        queue.push({ run, resolve, reject })
        pump()
      })
    },
  })
}

export function createSbtEligibilityService({ config, fetchImpl = fetch, now = () => Date.now() }) {
  const cache = new Map()
  const inFlight = new Map()
  const requestScheduler = createBscScanRequestScheduler(config.sbtEligibility)

  function requireReadyConfiguration() {
    if (!config.sbtEligibility.configured) {
      throw new HttpError(500, config.sbtEligibility.state)
    }
  }

  async function fetchTransferPage(walletAddress, page) {
    return requestScheduler.run(async () => {
      const url = new URL(config.sbtEligibility.apiUrl)
      url.searchParams.set('chainid', String(config.sbtEligibility.chainId))
      url.searchParams.set('module', 'account')
      url.searchParams.set('action', 'token1155tx')
      url.searchParams.set('address', walletAddress)
      url.searchParams.set('contractaddress', config.sbtEligibility.sbtContract)
      url.searchParams.set('page', String(page))
      url.searchParams.set('offset', String(PAGE_SIZE))
      url.searchParams.set('sort', 'asc')
      url.searchParams.set('apikey', config.sbtEligibility.apiKey)

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), config.sbtEligibility.requestTimeoutMs)
      try {
        const response = await fetchImpl(url, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })
        if (!response.ok) throw new HttpError(502, 'bscscan_http_error')

        let payload
        try {
          payload = await response.json()
        } catch {
          throw new HttpError(502, 'bscscan_invalid_response')
        }
        if (Array.isArray(payload?.result)) return payload.result
        if (noTransactionsResponse(payload)) return []
        throw new HttpError(502, 'bscscan_invalid_response')
      } catch (error) {
        if (error instanceof HttpError) throw error
        if (error?.name === 'AbortError') throw new HttpError(504, 'bscscan_request_timeout')
        throw new HttpError(502, 'bscscan_request_failed')
      } finally {
        clearTimeout(timeout)
      }
    })
  }

  async function readPositiveBalances(walletAddress) {
    const cacheKey = `${config.sbtEligibility.sbtContract}:${walletAddress}`
    const cached = cache.get(cacheKey)
    if (cached && now() - cached.checkedAt < config.sbtEligibility.cacheTtlMs) {
      return cached
    }

    const activeRequest = inFlight.get(cacheKey)
    if (activeRequest) return activeRequest

    const request = (async () => {
      const balances = new Map()
      for (let page = 1; page <= MAX_PAGES; page += 1) {
        const rows = await fetchTransferPage(walletAddress, page)
        for (const row of rows) applySbtTransferRow(balances, walletAddress, row)
        if (rows.length < PAGE_SIZE) {
          const record = Object.freeze({
            balances: positiveSbtBalances(balances),
            checkedAt: now(),
          })
          cache.set(cacheKey, record)
          return record
        }
      }
      throw new HttpError(502, 'bscscan_pagination_limit')
    })()
    inFlight.set(cacheKey, request)

    try {
      return await request
    } finally {
      if (inFlight.get(cacheKey) === request) inFlight.delete(cacheKey)
    }
  }

  async function read(session) {
    if (!session) throw new HttpError(401, 'session_required')
    const walletAddress = normalizeWallet(session.user?.safeWalletAddress)
    if (!walletAddress) throw new HttpError(409, 'safe_wallet_not_ready')
    requireReadyConfiguration()

    const { balances, checkedAt } = await readPositiveBalances(walletAddress)
    const sbtBadgeCount = balances.size
    const status = sbtBadgeCount >= config.sbtEligibility.minimumBadgeCount
      ? 'eligible'
      : 'unqualified'
    return Object.freeze({
      status,
      sbtBadgeCount,
      minimumBadgeCount: config.sbtEligibility.minimumBadgeCount,
      sbtContract: config.sbtEligibility.sbtContract,
      source: 'bscscan_token1155tx',
      checkedAt: new Date(checkedAt).toISOString(),
    })
  }

  async function requireEligible(session) {
    const eligibility = await read(session)
    if (eligibility.status !== 'eligible') {
      throw new HttpError(
        403,
        'sbt_vote_requirement_not_met',
        `At least ${config.sbtEligibility.minimumBadgeCount} distinct Renaiss SBTs are required to vote.`,
      )
    }
    return eligibility
  }

  return Object.freeze({ read, requireEligible })
}
