import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Candidate } from '@prisma/client'
import { registerCandidateSchema } from '../schemas/register'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { JwtPayload } from '@/modules/auth/controllers/verify'

export const registerCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Candidate> => {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    jwt.verify(token, env.JWT_SECRET) as JwtPayload // parei aqui

    // reply.status(200).send({ message: 'Verified', user: decoded })

    const data = registerCandidateSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }

    const candidate = await service.register(data.data)

    return reply.status(201).send({ candidate })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
