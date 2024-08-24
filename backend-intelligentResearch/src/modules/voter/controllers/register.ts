import { FastifyReply, FastifyRequest } from 'fastify'
import { registerVoterSchema } from '../schemas/register'
import * as service from '../services'
import { Voter } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { JwtPayload } from '@/modules/auth/controllers/verify'

export const registerVoter = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Voter> => {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    jwt.verify(token, env.JWT_SECRET) as JwtPayload

    const data = registerVoterSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }
    const voter = await service.register(data.data)

    return reply.status(201).send({ voter })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
