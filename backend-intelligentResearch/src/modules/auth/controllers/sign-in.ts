import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyReply, FastifyRequest } from 'fastify'
import { signInSchema } from '../schemas/sign-in'
import * as service from '../services'
import { generateTokens } from '../services/jwt'

export const signIn = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = signInSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const user = await service.signIn(data.data)
    if (!user) {
      return reply.status(404).send({ message: 'User not found.' })
    }

    const { accessToken, refreshToken } = generateTokens(user)
    reply
      .setCookie('token', accessToken, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      })
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      })
      .send({
        sub: user.id,
        role: user.role,
      })

    return reply.status(200).send()
  } catch (err) {
    console.error(err)

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return reply.status(404).send({ message: 'User not found.' })
      }
    }
    return reply.status(500).send(err)
  }
}
