import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret-here'
const REFRESH_TOKEN_EXPIRES_IN_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '7') || 7

const signOptions: SignOptions = {
  expiresIn: 3600, // 1 hour in seconds
}

const refreshSignOptions: SignOptions = {
  expiresIn: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 3600, // Convert days to seconds
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

/**
 * Generate a JWT access token
 */
export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, signOptions)
}

/**
 * Generate a JWT refresh token
 */
export function generateRefreshToken(payload: any): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, refreshSignOptions)
}

/**
 * Verify a JWT access token
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

/**
 * Verify a JWT refresh token
 */
export function verifyRefreshToken(token: string): any {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
  } catch (error) {
    return null
  }
}

/**
 * Generate a random token for email verification
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Calculate refresh token expiry date
 */
export function getRefreshTokenExpiry(): Date {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS)
  return expiry
}
