import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import * as service from '../services'
import { generateTokens } from '../services/jwt'
import { env } from '@/lib/env'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  const { refreshToken } = request.cookies

  if (!refreshToken) {
    return reply.status(401).send({ message: 'Refresh token not provided' })
  }

  try {
    const payload = jwt.verify(refreshToken, env.JWT_SECRET!)

    // Opcional: verifique o token no banco de dados, se estiver armazenando

    if (!payload.sub) {
      throw new Error('Invalid refresh token')
    }

    const user = await service.findUserById(payload.sub.toString())

    if (!user) {
      return reply.status(404).send({ message: 'User not found' })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user)

    reply
      .setCookie('token', accessToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .setCookie('refreshToken', newRefreshToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      .send({
        sub: user.id,
        role: user.role,
      })

    return reply.status(200).send()
  } catch (err) {
    console.error('Invalid refresh token:', err)
    return reply.status(401).send({ message: 'Invalid refresh token' })
  }
}
