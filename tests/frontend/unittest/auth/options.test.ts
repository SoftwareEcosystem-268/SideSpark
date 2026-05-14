/**
 * TDD Tests — NextAuth options.ts callbacks
 *
 * RED phase: The `session` callback test FAILS with the current implementation
 * because it never copies `accessToken` from the JWT token to the session.
 *
 * GREEN phase will pass after `options.ts` session callback is updated.
 */
import { describe, it, expect } from 'vitest'
import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

// ─── Custom Types ───────────────────────────────────────────────────────────

type CustomJWT = JWT & {
  id?: string
  email?: string
  name?: string
  username?: string
  accessToken?: string
  refreshToken?: string
}

type CustomUser = User & {
  id: string
  email: string
  name: string
  username: string
  accessToken?: string
  refreshToken?: string
}

type CustomSession = Session & {
  accessToken?: string
  user: {
    id: string
    email: string
    name: string
    username: string
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Call the jwt callback directly */
async function callJwtCallback(params: Parameters<typeof jwtCb>[0]) {
  return jwtCb(params)
}

async function callSessionCallback(params: Parameters<typeof sessionCb>[0]) {
  return sessionCb(params)
}

type AuthCallbacks = NonNullable<typeof authOptions.callbacks>
type JwtCallback = NonNullable<AuthCallbacks['jwt']>
type SessionCallback = NonNullable<AuthCallbacks['session']>

// Retrieve the callbacks from authOptions
const { jwt: jwtCb, session: sessionCb } = authOptions.callbacks as {
  jwt: JwtCallback
  session: SessionCallback
}

function createToken(overrides: Partial<CustomJWT> = {}): CustomJWT {
  return {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    username: 'testuser',
    ...overrides,
  }
}

function createUser(overrides: Partial<CustomUser> = {}): CustomUser {
  return {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    username: 'testuser',
    ...overrides,
  }
}

function createSession(overrides: Partial<CustomSession> = {}): CustomSession {
  return {
    user: {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
    },
    expires: '2099-01-01',
    ...overrides,
  }
}

// ─── jwt callback ──────────────────────────────────────────────────────────

describe('NextAuth jwt callback', () => {
  it('stores accessToken on the token when user signs in', async () => {
    const token = createToken()
    const user = createUser({
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    })

    const result = await jwtCb({ token, user, account: null })

    expect(result.accessToken).toBe('jwt-access-token')
    expect(result.refreshToken).toBe('jwt-refresh-token')
    expect(result.id).toBe('user-1')
  })

  it('returns existing token unchanged when user is not present (subsequent requests)', async () => {
    const token = createToken({ accessToken: 'existing-token' })

    const result = await jwtCb({ token, user: undefined as never, account: null })

    expect(result.accessToken).toBe('existing-token')
    expect(result.id).toBe('user-1')
  })
})

// ─── session callback ──────────────────────────────────────────────────────

describe('NextAuth session callback', () => {
  it('copies accessToken from JWT token to the session object', async () => {
    // Arrange – simulate what the jwt callback produces
    const token = createToken({
      accessToken: 'jwt-access-token',   // ← this MUST reach the session
    })
    const session = createSession()

    // Act
    const result = await callSessionCallback({
      session,
      token,
      user: {} as any,
    } as unknown as Parameters<typeof sessionCb>[0])

    // Assert – accessToken must be forwarded to session
    expect((result as CustomSession).accessToken).toBe('jwt-access-token')
  })

  it('copies user fields from JWT token to session.user', async () => {
    const token = createToken({
      accessToken: 'jwt-access-token',
    })
    const session = createSession()

    const result = (await callSessionCallback({
      session,
      token,
      user: {} as any,
    } as unknown as Parameters<typeof sessionCb>[0])) as CustomSession

    expect(result.user.id).toBe('user-1')
    expect(result.user.email).toBe('test@example.com')
    expect(result.user.name).toBe('Test User')
    expect(result.user.username).toBe('testuser')
  })

  it('returns session unchanged when token is null/undefined', async () => {
    const session = createSession()

    const result = await callSessionCallback({
      session,
      token: null as unknown as JWT,
      user: {} as any,
    } as unknown as Parameters<typeof sessionCb>[0])

    // Should not throw; session returned as-is
    expect(result).toBeDefined()
  })
})
