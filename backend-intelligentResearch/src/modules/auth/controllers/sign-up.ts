import { FastifyReply, FastifyRequest } from 'fastify'
import { signUpSchema } from '../schemas/sign-up'
import * as service from '../services'
import { env } from '../../../lib/env'
import jwt from 'jsonwebtoken'

export const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
  // zod to validate the request body
  const data = signUpSchema.safeParse(request.body)
  if (!data.success) {
    return reply.status(400).send(data.error)
  }
  try {
    const user = await service.signUp(data.data)

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      String(env.JWT_SECRET),
    )

    reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true,
      })
      .send({
        id: user.id,
        username: user.username,
        role: user.role,
      })

    return reply.status(200).send({ token })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
