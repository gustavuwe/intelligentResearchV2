import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export interface JwtPayload {
  sub: string
}

export const verifyAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: request.user.sub,
      },
    })

    if (user.role.toString() !== 'ADMIN') {
      return reply.status(401).send({ message: 'Unauthorized' })
    }

    reply.status(200).send({ message: 'Verified', user })
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
