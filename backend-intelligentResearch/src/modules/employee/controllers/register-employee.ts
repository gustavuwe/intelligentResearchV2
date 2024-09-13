import { FastifyReply, FastifyRequest } from 'fastify'
import * as service from '../services'
import { registerEmployeeSchema } from '../schemas/register-employee'

export const registerEmployee = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // zod to validate the request body
  const data = registerEmployeeSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const employee = await service.registerEmployee(data.data)
    // const token = signJWT(user)

    return reply.status(200).send({ employee })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
