import '@fastify/jwt'
import { JwtPayload } from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: FastifyJWT
  }

  interface FastifyRequest {
    user: JwtPayload
  }
}
