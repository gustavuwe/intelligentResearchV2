import { prisma } from '@/lib/prisma'

export const findByName = async (name: string) => {
  return await prisma.voter.findMany({
    where: {
      name,
    },
    include: {
      Vote: true,
    },
  })
}
