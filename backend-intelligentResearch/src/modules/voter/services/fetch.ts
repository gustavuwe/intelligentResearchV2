import { prisma } from '@/lib/prisma'

export const fetch = async () =>
  prisma.voter.findMany({
    include: {
      Vote: true,
    },
  })
