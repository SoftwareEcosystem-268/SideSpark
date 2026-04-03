import { describe, it, expect, beforeEach, vi } from 'vitest'
import { apiRequest } from '../api'

// Mock fetch
global.fetch = vi.fn() as any

describe('API Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call API with correct data', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ message: 'สำเร็จ' }),
    }
    ;(global.fetch as any).mockResolvedValue(mockResponse)

    await apiRequest('/api/test', {
      method: 'POST',
      body: JSON.stringify({ test: 'data' }),
    })

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/test',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ test: 'data' }),
      })
    )
  })
})
