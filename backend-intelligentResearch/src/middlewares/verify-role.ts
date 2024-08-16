// import { FastifyReply, FastifyRequest } from 'fastify'
// import { JwtPayload } from '../@types/jwtPayload'

// export const verifyRole = (roleVerify: 'USER' | 'ADMIN') => {
//   return async (request: FastifyRequest, reply: FastifyReply) => {
//     const { role } = request.user as JwtPayload
//     try {
//       await request.jwtVerify<JwtPayload>()
//       if (role !== roleVerify) {
//         return reply.status(403).send({ message: 'Forbidden' })
//       }
//     } catch (err) {
//       return reply.status(401).send({ message: 'Unauthorized' })
//     }
//   }
// }
