import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const countVotesOfVoters = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string }
    await service.countVotesOfVoters(id)
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(200).send()
}
