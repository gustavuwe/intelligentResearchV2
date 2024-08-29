import { FastifyReply, FastifyRequest } from 'fastify'
import { signInSchema } from '../schemas/sign-in'
import * as service from '../services'
import { signJWT } from '../services/jwt'

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

    const token = signJWT(user)
    reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      })
      .send({
        sub: user.id,
      })

    return reply.status(200).send()
  } catch (err) {
    return reply.status(500).send(err)
  }
}
