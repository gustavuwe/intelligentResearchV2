import { FastifyReply, FastifyRequest } from 'fastify'

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    reply.clearCookie('token', { path: '/' })
    return reply.status(200).send({ message: 'Logged out successfully' })
  } catch (err) {
    return reply.status(500).send(err)
  }
}
