import { prisma } from '@/lib/prisma'

export const findByResearchId = async (id: string) => {
  return await prisma.candidate.findMany({
    where: {
      researchId: id,
    },
    include: {
      Voters: true,
      Vote: true,
    },
  })
}
