import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Candidate } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { JwtPayload } from '@/modules/auth/controllers/verify'

export const findByResearchId = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Candidate[]> => {
  try {
    const { id } = request.params as { id: string }

    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    jwt.verify(token, env.JWT_SECRET) as JwtPayload
    const candidates = await service.findByResearchId(id)

    return reply.status(200).send({ candidates })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
