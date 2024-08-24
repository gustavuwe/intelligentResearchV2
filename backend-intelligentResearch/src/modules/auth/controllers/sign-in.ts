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

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .send({
        sub: user.id,
      })

    return reply.status(200).send()

    // const token = request.server.jwt.sign(
    //   { id: user.id, username: user.username },
    //   { expiresIn: '3d' },
    // )

    // const token = reply.jwtSign({
    //   sign: {
    //     sub: user.id,
    //     role: user.role,
    //   },
    // })

    // const refreshToken = await reply.jwtSign({
    //   sign: {
    //     sub: user.id,
    //     role: user.role,
    //     expiresIn: '7d',
    //   },
    // })

    // return reply
    //   .setCookie('refreshToken', refreshToken, {
    //     path: '/', // all paths of backend can access the token
    //     secure: true, // use https system
    //     sameSite: true, // only in this site
    //     httpOnly: true, // only backend can access, frontend can not.
    //   })
    //   .status(200)
    //   .send({
    //     token,
    //   })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
