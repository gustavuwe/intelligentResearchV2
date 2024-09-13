import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'

export const findByEmployerId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // zod to validate the request body
  const { id } = request.params as { id: string }
  try {
    const employees = await service.findByEmployerId(id)
    // const token = signJWT(user)

    return reply.status(200).send({ employees })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
