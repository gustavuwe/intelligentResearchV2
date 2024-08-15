import { prisma } from '@/lib/prisma'
import { RegisterVoterSchema, registerVoterSchema } from '../schemas/register'

export const register = async (data: RegisterVoterSchema) => {
  const parsedData = registerVoterSchema.parse(data)

  return prisma.voter.create({
    data: {
      name: parsedData.name,
      phoneNumber: parsedData.phoneNumber,
      lat: parsedData.lat,
      long: parsedData.long,
      Candidate: {
        connect: {
          id: parsedData.candidateId,
        },
      },
      Vote: {
        create: parsedData.Vote.map((vote) => ({
          id: vote.id,
          voterId: vote.voterId,
          candidateId: vote.candidateId,
          researchId: vote.researchId,
        })),
      },
    },
  })
}
