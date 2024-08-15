import { FastifyReply, FastifyRequest } from 'fastify'
import { updateResearchSchema } from '../schemas/update'
import * as service from '../services'

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  // zod to validate the request body
  await request.jwtVerify()

  const data = updateResearchSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const research = await service.update(data.data)

    return reply.status(201).send({ research })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
