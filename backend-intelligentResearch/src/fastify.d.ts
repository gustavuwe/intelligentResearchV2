import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: FastifyJWT
  }

  interface FastifyRequest {
    user: {
      userId: number
    }
  }
}
