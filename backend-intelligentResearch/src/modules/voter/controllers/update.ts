// import { Voter } from '@prisma/client'
// import { FastifyReply, FastifyRequest } from 'fastify'
// import { updateVoterSchema } from '../schemas/update'
// import * as service from '../services'

// export const updateVoter = async (
//   request: FastifyRequest,
//   reply: FastifyReply,
// ): Promise<Voter> => {
//   try {
//     const { id } = request.params as { id: string }

//     const data = updateVoterSchema.safeParse(request.body)
//     if (!data.success) {
//       return reply.status(400).send(data.error)
//     }
//     const voter = await service.update(id, data.data)

//     return reply.status(200).send({ voter })
//   } catch (err) {
//     return reply.status(500).send(err)
//   }
// }
