import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import {
  hashPassword,
  verifyPassword,
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from '../lib/auth'

const prisma = new PrismaClient()
const router = express.Router()

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบ' })
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้ต้องมีความยาว 3-20 ตัวอักษร' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'รูปแบบอีเมลไม่ถูกต้อง' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'รหัสผ่านไม่ตรงกัน' })
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUsername) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' })
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้แล้ว' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user (email verified immediately)
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: username,
      },
    })

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      email,
      username,
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    // Check if user has password
    if (!user.password) {
      return res.status(401).json({
        error: 'บัญชีนี้ไม่ได้ตั้งรหัสผ่าน',
      })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
    }

    // Generate tokens
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    })

    const refreshTokenValue = generateRefreshToken({ userId: user.id })

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshTokenValue,
        userId: user.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    })

    res.status(200).json({
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ error: 'กรุณาระบุ refresh token' })
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken)

    if (!decoded) {
      return res.status(401).json({ error: 'Refresh token ไม่ถูกต้อง' })
    }

    // Find refresh token in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    })

    if (!storedToken) {
      return res.status(401).json({ error: 'Refresh token ไม่ถูกต้อง' })
    }

    // Check if expired
    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      })
      return res.status(401).json({ error: 'Refresh token หมดอายุ' })
    }

    // Generate new access token
    const accessToken = generateToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      username: storedToken.user.username,
    })

    res.status(200).json({ accessToken })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

/**
 * POST /api/auth/logout
 * Logout by invalidating refresh token
 */
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ error: 'กรุณาระบุ refresh token' })
    }

    // Delete refresh token from database
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    })

    res.status(200).json({ message: 'ออกจากระบบสำเร็จ' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

/**
 * GET /api/auth/me
 * Get current user info (requires auth)
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'ไม่ได้รับอนุญาต' })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ error: 'Token ไม่ถูกต้อง' })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้' })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

export default router
