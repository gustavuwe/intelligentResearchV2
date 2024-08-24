import { prisma } from '@/lib/prisma'

export const fetch = async () => {
  return await prisma.voter.findMany({
    include: {
      Vote: true,
    },
  })
}
