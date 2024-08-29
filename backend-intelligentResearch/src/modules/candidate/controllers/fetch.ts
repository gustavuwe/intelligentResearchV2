import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const fetchCandidates = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const candidates = await service.fetch()

    return reply.status(200).send({ candidates })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
