import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Vote } from '@prisma/client'
import { sendVoteSchema } from '../schemas/sendVoteSchema'

export const sendVote = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Vote> => {
  try {
    const data = sendVoteSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }

    const voter = await service.sendVote(data.data)

    return reply.status(201).send({ voter })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
