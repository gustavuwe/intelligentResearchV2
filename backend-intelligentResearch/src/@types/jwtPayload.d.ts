import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}
// export interface JwtPayload {
//   userId: string
//   username: string
//   role: 'USER' | 'ADMIN'
// }
