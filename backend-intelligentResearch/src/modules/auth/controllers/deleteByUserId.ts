import { Candidate, type User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const deleteByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<User[]> => {
  try {
    const { id } = request.params as { id: string }

    const response = await service.deleteByUserId(id)

    return reply.status(200).send({ response })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
