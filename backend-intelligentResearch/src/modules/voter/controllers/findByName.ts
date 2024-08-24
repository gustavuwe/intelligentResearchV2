import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const findByName = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const query = request.query as { name: string }
  try {
    const voters = await service.findByName(query.name)

    return reply.status(200).send({ voters })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
