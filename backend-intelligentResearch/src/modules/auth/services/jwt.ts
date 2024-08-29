import { env } from '@/lib/env'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const signJWT = (user: User) =>
  jwt.sign({ id: user.id, role: user.role }, String(env.JWT_SECRET), {
    subject: user.id,
  })
