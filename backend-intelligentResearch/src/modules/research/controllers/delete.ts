import { FastifyReply, FastifyRequest } from 'fastify'
import { deleteResearchSchema } from '../schemas/delete'
import * as service from '../services'

export const deleteResearch = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  await request.jwtVerify()

  const data = deleteResearchSchema.safeParse(request.body)

  if (!data.success) {
    return reply.status(400).send(data.error)
  }

  try {
    await service.deleteResearch(data.data)
  } catch (err) {
    return reply.status(500).send(err)
  }

  return reply.status(200).send()
}
