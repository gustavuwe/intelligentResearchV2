import { prisma } from '@/lib/prisma'
import {
  RegisterVoteSchema,
  registerVoteSchema,
} from '../schemas/registerVoteSchema'

export const register = async (data: RegisterVoteSchema) => {
  const parsedData = registerVoteSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error('Invalid data')
  }

  await prisma.vote.create({
    data: {
      voter: {
        connect: {
          id: parsedData.data.voterId,
        },
      },
      candidate: {
        connect: {
          id: parsedData.data.candidateId,
        },
      },
      research: {
        connect: {
          id: parsedData.data.researchId,
        },
      },
    },
  })
}
