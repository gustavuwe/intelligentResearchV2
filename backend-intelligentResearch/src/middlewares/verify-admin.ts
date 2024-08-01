import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyRole = (role: 'USER' | 'ADMIN') => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      if (request.user.role !== role) {
        return reply.status(403).send({ message: 'Forbidden' })
      }
    } catch (err) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
