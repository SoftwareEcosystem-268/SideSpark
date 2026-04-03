/**
 * TDD Tests — NextAuth options.ts callbacks
 *
 * RED phase: The `session` callback test FAILS with the current implementation
 * because it never copies `accessToken` from the JWT token to the session.
 *
 * GREEN phase will pass after `options.ts` session callback is updated.
 */
import { describe, it, expect } from 'vitest'
import { authOptions } from '../options'

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Call the jwt callback directly */
async function callJwtCallback(params: Parameters<typeof jwtCb>[0]) {
  return jwtCb(params)
}

// Retrieve the callbacks from authOptions
const { jwt: jwtCb, session: sessionCb } = authOptions.callbacks as {
  jwt: Function
  session: Function
}

// ─── jwt callback ──────────────────────────────────────────────────────────

describe('NextAuth jwt callback', () => {
  it('stores accessToken on the token when user signs in', async () => {
    const token = {}
    const user = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    }

    const result = await jwtCb({ token, user, account: null })

    expect(result.accessToken).toBe('jwt-access-token')
    expect(result.refreshToken).toBe('jwt-refresh-token')
    expect(result.id).toBe('user-1')
  })

  it('returns existing token unchanged when user is not present (subsequent requests)', async () => {
    const token = { id: 'user-1', accessToken: 'existing-token' }

    const result = await jwtCb({ token, user: undefined, account: null })

    expect(result.accessToken).toBe('existing-token')
    expect(result.id).toBe('user-1')
  })
})

// ─── session callback ──────────────────────────────────────────────────────

describe('NextAuth session callback', () => {
  it('copies accessToken from JWT token to the session object', async () => {
    // Arrange – simulate what the jwt callback produces
    const token = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
      accessToken: 'jwt-access-token',   // ← this MUST reach the session
    }
    const session: Record<string, any> = {
      user: {},
      expires: '2099-01-01',
    }

    // Act
    const result = await sessionCb({ session, token })

    // Assert – accessToken must be forwarded to session
    expect(result.accessToken).toBe('jwt-access-token')
  })

  it('copies user fields from JWT token to session.user', async () => {
    const token = {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
      accessToken: 'jwt-access-token',
    }
    const session: Record<string, any> = { user: {}, expires: '2099-01-01' }

    const result = await sessionCb({ session, token })

    expect(result.user.id).toBe('user-1')
    expect(result.user.email).toBe('test@example.com')
    expect(result.user.name).toBe('Test User')
    expect(result.user.username).toBe('testuser')
  })

  it('returns session unchanged when token is null/undefined', async () => {
    const session = { user: {}, expires: '2099-01-01' }

    const result = await sessionCb({ session, token: null })

    // Should not throw; session returned as-is
    expect(result).toBeDefined()
  })
})
