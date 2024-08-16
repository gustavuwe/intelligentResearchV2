import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Candidate } from '@prisma/client'
import { registerCandidateSchema } from '../schemas/register'

export const registerCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Candidate> => {
  await request.jwtVerify()

  const data = registerCandidateSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const voter = await service.register(data.data)

    return reply.status(201).send({ voter })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
