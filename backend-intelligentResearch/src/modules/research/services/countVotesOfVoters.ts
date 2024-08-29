import { prisma } from '@/lib/prisma'

export const countVotesOfVoters = async (id: string) => {
  return prisma.research.findMany({
    where: { id },
  })
}
