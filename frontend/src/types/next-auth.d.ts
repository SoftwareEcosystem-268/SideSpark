import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      email: string
      name: string
      username: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    username: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    username: string
    accessToken?: string
    refreshToken?: string
  }
}
