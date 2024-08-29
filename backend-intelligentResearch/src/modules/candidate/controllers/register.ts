import { Candidate } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerCandidateSchema } from '../schemas/register'
import * as service from '../services'

export const registerCandidate = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Candidate> => {
  try {
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
