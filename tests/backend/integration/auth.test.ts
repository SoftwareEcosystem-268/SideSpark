import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express from 'express'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import authRoutes from '@/routes/auth'

dotenv.config()

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

const prisma = new PrismaClient()

function registerUser(overrides: Partial<{
  username: string
  email: string
  password: string
  confirmPassword: string
}> = {}) {
  return request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      ...overrides,
    })
}

function loginUser(overrides: Partial<{
  email: string
  password: string
}> = {}) {
  return request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
      ...overrides,
    })
}

describe('Auth API', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    vi.clearAllMocks()
    await prisma.refreshToken.deleteMany()
    await prisma.user.deleteMany()
  })

  describe('POST /api/auth/register', () => {
    it('registers a new user', async () => {
      const res = await registerUser()

      expect(res.status).toBe(201)
      expect(res.body).toMatchObject({
        email: 'test@example.com',
        username: 'testuser',
      })
    })

    it('returns error for invalid email', async () => {
      const res = await registerUser({
        email: 'invalid-email',
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('returns error for mismatched passwords', async () => {
      const res = await registerUser({
        confirmPassword: 'password456',
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('returns error when username already exists', async () => {
      await registerUser()

      const res = await registerUser({
        email: 'second@example.com',
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('returns error when email already exists', async () => {
      await registerUser()

      const res = await registerUser({
        username: 'seconduser',
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })
  })

  describe('POST /api/auth/login', () => {
    it('logs in with valid credentials', async () => {
      await registerUser()

      const res = await loginUser()

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body).toHaveProperty('user')
    })

    it('returns error when credentials are missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' })

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('returns error for invalid credentials', async () => {
      const res = await loginUser({
        password: 'wrongpassword',
      })

      expect(res.status).toBe(401)
      expect(res.body.error).toBeTruthy()
    })

    it('returns error when the user has no password set', async () => {
      await prisma.user.create({
        data: {
          username: 'oauthuser',
          email: 'oauth@example.com',
          name: 'OAuth User',
        },
      })

      const res = await loginUser({
        email: 'oauth@example.com',
      })

      expect(res.status).toBe(401)
      expect(res.body.error).toBeTruthy()
    })
  })

  describe('POST /api/auth/refresh', () => {
    it('requires a refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('returns a new access token for a valid refresh token', async () => {
      await registerUser()
      const loginRes = await loginUser()

      const res = await request(app)
        .post('/api/auth/refresh')
        .send({
          refreshToken: loginRes.body.refreshToken,
        })

      expect(res.status).toBe(200)
      expect(res.body.accessToken).toBeTypeOf('string')
      expect(res.body.accessToken).not.toHaveLength(0)
    })

    it('rejects an invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({
          refreshToken: 'invalid-token',
        })

      expect(res.status).toBe(401)
      expect(res.body.error).toBeTruthy()
    })
  })

  describe('POST /api/auth/logout', () => {
    it('requires a refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .send({})

      expect(res.status).toBe(400)
      expect(res.body.error).toBeTruthy()
    })

    it('invalidates the refresh token on logout', async () => {
      await registerUser()
      const loginRes = await loginUser()

      const logoutRes = await request(app)
        .post('/api/auth/logout')
        .send({
          refreshToken: loginRes.body.refreshToken,
        })

      const refreshRes = await request(app)
        .post('/api/auth/refresh')
        .send({
          refreshToken: loginRes.body.refreshToken,
        })

      expect(logoutRes.status).toBe(200)
      expect(refreshRes.status).toBe(401)
    })
  })

  describe('GET /api/auth/me', () => {
    it('requires a bearer token', async () => {
      const res = await request(app).get('/api/auth/me')

      expect(res.status).toBe(401)
      expect(res.body.error).toBeTruthy()
    })

    it('returns the current user for a valid bearer token', async () => {
      await registerUser()
      const loginRes = await loginUser()

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)

      expect(res.status).toBe(200)
      expect(res.body.user).toMatchObject({
        email: 'test@example.com',
        username: 'testuser',
      })
    })

    it('rejects an invalid bearer token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')

      expect(res.status).toBe(401)
      expect(res.body.error).toBeTruthy()
    })

    it('returns 404 when the user from the token no longer exists', async () => {
      await registerUser()
      const loginRes = await loginUser()
      await prisma.refreshToken.deleteMany()
      await prisma.user.deleteMany()

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBeTruthy()
    })
  })
})
