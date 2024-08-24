import { FastifyReply, FastifyRequest } from 'fastify'
import { deleteResearchSchema } from '../schemas/delete'
import * as service from '../services'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { JwtPayload } from '@/modules/auth/controllers/verify'

export const countVotesOfVoters = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.cookies.token

  if (!token) {
    return reply.status(401).send({ message: 'No token provided' })
  }

  jwt.verify(token, env.JWT_SECRET) as JwtPayload

  try {
    await service.countVotesOfVoters()
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(200).send()
}
