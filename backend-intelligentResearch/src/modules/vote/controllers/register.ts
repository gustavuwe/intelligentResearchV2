import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { Vote } from '@prisma/client'
import { registerVoteSchema } from '../schemas/registerVoteSchema'

export const registerVote = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Vote> => {
  await request.jwtVerify()

  const data = registerVoteSchema.safeParse(request.body)
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
