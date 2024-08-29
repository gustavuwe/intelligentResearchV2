import { Candidate } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const findByResearchId = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Candidate[]> => {
  try {
    const { id } = request.params as { id: string }

    const candidates = await service.findByResearchId(id)

    return reply.status(200).send({ candidates })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
