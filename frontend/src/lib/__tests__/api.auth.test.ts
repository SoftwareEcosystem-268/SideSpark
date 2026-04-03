/**
 * TDD Tests — API client auth header attachment
 *
 * RED phase: These tests FAIL with the current implementation because
 * `api.ts` reads from sessionStorage instead of calling `getSession()`.
 *
 * GREEN phase will pass after `api.ts` is updated to use `getSession()`.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiRequest } from '../api'

// ─── Mock next-auth/react ──────────────────────────────────────────────────
vi.mock('next-auth/react', () => ({
  getSession: vi.fn(),
}))

import { getSession } from 'next-auth/react'

// ─── Mock fetch ────────────────────────────────────────────────────────────
global.fetch = vi.fn() as any

const mockFetch = global.fetch as ReturnType<typeof vi.fn>
const mockGetSession = getSession as ReturnType<typeof vi.fn>

// Helper: capture the headers actually passed to fetch
function capturedHeaders(): Record<string, string> {
  const call = mockFetch.mock.calls[0]
  return (call?.[1]?.headers ?? {}) as Record<string, string>
}

describe('apiRequest — Authorization header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
  })

  it('attaches Bearer token when session has accessToken', async () => {
    // Arrange – simulate a logged-in session returned by getSession()
    mockGetSession.mockResolvedValue({ accessToken: 'test-jwt-token-abc' })

    // Act
    await apiRequest('/api/projects')

    // Assert – Authorization header must be present and correct
    expect(getSession).toHaveBeenCalledTimes(1)
    expect(capturedHeaders()['Authorization']).toBe('Bearer test-jwt-token-abc')
  })

  it('sends no Authorization header when session is null (logged out)', async () => {
    // Arrange – no session (unauthenticated)
    mockGetSession.mockResolvedValue(null)

    // Act
    await apiRequest('/api/projects')

    // Assert – Authorization header must be absent
    expect(capturedHeaders()['Authorization']).toBeUndefined()
  })

  it('sends no Authorization header when session has no accessToken', async () => {
    // Arrange – session exists but accessToken is missing (bug scenario)
    mockGetSession.mockResolvedValue({ user: { email: 'test@test.com' } })

    // Act
    await apiRequest('/api/projects')

    // Assert
    expect(capturedHeaders()['Authorization']).toBeUndefined()
  })

  it('always sends Content-Type: application/json', async () => {
    mockGetSession.mockResolvedValue(null)

    await apiRequest('/api/projects')

    expect(capturedHeaders()['Content-Type']).toBe('application/json')
  })

  it('calls the correct backend URL', async () => {
    mockGetSession.mockResolvedValue(null)

    await apiRequest('/api/projects')

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/projects',
      expect.any(Object)
    )
  })
})
