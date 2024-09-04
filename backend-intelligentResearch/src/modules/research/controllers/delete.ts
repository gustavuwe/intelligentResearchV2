import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const deleteResearch = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  try {
    await service.deleteResearch(id)
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(200).send()
}
