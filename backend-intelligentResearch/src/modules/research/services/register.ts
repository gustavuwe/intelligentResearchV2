import { prisma } from '@/lib/prisma'
import {
  RegisterResearchSchema,
  registerResearchSchema,
} from '../schemas/register'

export const register = async (data: RegisterResearchSchema) => {
  const parsedData = registerResearchSchema.parse(data)

  return prisma.research.create({
    data: {
      title: parsedData.title,
      startDate: parsedData.startDate,
      endDate: parsedData.endDate,
      candidates: {
        create: parsedData.candidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          imgUrl: candidate.imgUrl,
          votes: candidate.votes,
        })),
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
    select: {
      id: true,
    },
  })
}
