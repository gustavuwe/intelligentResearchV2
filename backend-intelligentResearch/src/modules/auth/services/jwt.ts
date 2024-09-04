import { env } from '@/lib/env'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const signJWT = (user: User, expiresIn: string) =>
  jwt.sign({ id: user.id, role: user.role }, String(env.JWT_SECRET), {
    subject: user.id,
    expiresIn,
  })

export const generateTokens = (user: User) => {
  const accessToken = signJWT(user, '15m')
  const refreshToken = signJWT(user, '1m')

  return { accessToken, refreshToken }
}
