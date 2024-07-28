import { FastifyReply, FastifyRequest } from 'fastify'
import { signInSchema } from '../schemas/sign-in'
import * as service from '../services'

export const signIn = async (request: FastifyRequest, reply: FastifyReply) => {
  // zod to validate the request body
  const data = signInSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const user = await service.signIn(data.data)

    if (!user) {
      return reply.status(404).send({ message: 'User not found.' })
    }

    const token = await request.server.jwt.sign(
      { userId: user.id },
      { expiresIn: '3d' },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
