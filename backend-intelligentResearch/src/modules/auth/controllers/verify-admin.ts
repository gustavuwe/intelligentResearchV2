import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export interface JwtPayload {
  sub: string
}

export const verifyAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // const token = request.cookies.token

    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload // parei aqui

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: decoded.sub,
      },
    })

    if (user.role.toString() !== 'ADMIN') {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    reply.status(200).send({ message: 'Verified', user: decoded })
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
