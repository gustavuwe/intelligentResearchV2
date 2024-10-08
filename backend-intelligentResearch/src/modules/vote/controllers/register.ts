import { Vote } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerVoteSchema } from '../schemas/registerVoteSchema'
import * as service from '../services'

export const registerVote = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Vote> => {
  try {
    const data = registerVoteSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }

    const voter = await service.register(data.data)

    return reply.status(201).send({ voter })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
