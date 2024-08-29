import { Voter } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerVoterSchema } from '../schemas/register'
import * as service from '../services'

export const registerVoter = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Voter> => {
  try {
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
