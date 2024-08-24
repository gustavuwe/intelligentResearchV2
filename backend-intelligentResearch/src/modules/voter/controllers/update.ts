import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Voter } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { JwtPayload } from '@/modules/auth/controllers/verify'
import { updateVoterSchema } from '../schemas/update'

export const updateVoter = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Voter> => {
  try {
    const { id } = request.params as { id: string }

    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    jwt.verify(token, env.JWT_SECRET) as JwtPayload

    const data = updateVoterSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }
    const voter = await service.update(id, data.data)

    return reply.status(200).send({ voter })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
