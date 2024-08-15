import { FastifyReply, FastifyRequest } from 'fastify'
import { registerResearchSchema } from '../schemas/register'
import * as service from '../services'
import { Research } from '@prisma/client'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Research> => {
  // zod to validate the request body
  await request.jwtVerify()

  const data = registerResearchSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const research = await service.register(data.data)

    return reply.status(201).send({ research })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
