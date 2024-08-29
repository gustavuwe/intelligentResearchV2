import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const fetchVoters = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const voters = await service.fetch()

    return reply.status(200).send({ voters })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
