import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import request from 'supertest'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import authRoutes from '../routes/auth'
import dotenv from 'dotenv'

// Mock email service
vi.mock('../lib/email', () => ({
  sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
}))

dotenv.config()

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

const prisma = new PrismaClient()

describe('Auth API', () => {
  beforeAll(async () => {
    // Setup test database
    try {
      await prisma.$connect()
    } catch (error) {
      console.error('Database connection error:', error)
      throw error
    }
  })

  afterAll(async () => {
    // Cleanup
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    // Clean database before each test
    vi.clearAllMocks()
    try {
      await prisma.user.deleteMany()
    } catch (error) {
      console.error('Database cleanup error:', error)
    }
  })

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        })

      expect(res.status).toBe(201)
      expect(res.body.message).toContain('สมัครสมาชิกสำเร็จ')
    })

    it('should return error for invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: 'password123',
          confirmPassword: 'password123',
        })

      expect(res.status).toBe(400)
      expect(res.body.error).toContain('รูปแบบอีเมลไม่ถูกต้อง')
    })

    it('should return error for mismatched passwords', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password456',
        })

      expect(res.status).toBe(400)
      expect(res.body.error).toContain('รหัสผ่านไม่ตรงกัน')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Register first
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        })

      // Auto-verify email for testing
      await prisma.user.updateMany({
        where: { email: 'test@example.com' },
        data: { emailVerified: new Date() }
      })

      // Login
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('user')
    })

    it('should return error for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })

      expect(res.status).toBe(401)
      expect(res.body.error).toContain('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    })
  })
})
