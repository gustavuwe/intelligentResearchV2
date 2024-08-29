import { env } from '@/lib/env'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    // @ts-expect-error: error
    request.user = decoded
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
