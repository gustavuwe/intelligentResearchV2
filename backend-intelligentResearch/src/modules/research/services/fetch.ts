import { prisma } from '@/lib/prisma'

export const fetch = async () =>
  prisma.research.findMany({
    include: {
      candidates: true,
      Vote: true,
    },
  })
