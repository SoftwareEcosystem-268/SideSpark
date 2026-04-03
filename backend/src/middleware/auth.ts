import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../lib/auth'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        email: string
        username: string
      }
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({ error: 'Authentication failed' })
  }
}

// Optional auth - doesn't fail if no token
export async function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)

      if (decoded) {
        req.user = {
          userId: decoded.userId,
          email: decoded.email,
          username: decoded.username
        }
      }
    }

    next()
  } catch (error) {
    console.error('Optional auth middleware error:', error)
    next() // Continue without failing
  }
}