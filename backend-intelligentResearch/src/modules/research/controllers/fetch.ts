import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const fetchResearches = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const researches = await service.fetch()

    return reply.status(200).send({ researches })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
