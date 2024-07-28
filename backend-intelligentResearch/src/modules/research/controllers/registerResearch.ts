import { FastifyReply, FastifyRequest } from 'fastify'
import { registerResearchSchema } from '../schemas/registerResearch'
import * as service from '../services'

export const registerResearch = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // zod to validate the request body
  const data = registerResearchSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const research = await service.registerResearch(data.data)

    return reply.status(201).send({ research })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
