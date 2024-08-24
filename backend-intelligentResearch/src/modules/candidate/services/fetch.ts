import { prisma } from '@/lib/prisma'

export const fetch = async () => {
  return await prisma.candidate.findMany({
    include: {
      Voters: true,
      Vote: true,
    },
  })
}
