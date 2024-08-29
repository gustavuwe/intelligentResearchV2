import { Research } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerResearchSchema } from '../schemas/register'
import * as service from '../services'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Research> => {
  // zod to validate the request body
  try {
    const data = registerResearchSchema.safeParse(request.body)
    if (!data.success) {
      return reply.status(400).send(data.error)
    }

    const research = await service.register(data.data)

    return reply.status(201).send({ research })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
