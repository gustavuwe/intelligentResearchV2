import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const fetchResearchesByCreatorId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { creatorId } = request.params as { creatorId: string }

    const researches = await service.fetchResearchesByCreatorId(creatorId)

    return reply.status(200).send({ researches })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
