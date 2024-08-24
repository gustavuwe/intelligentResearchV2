import { prisma } from '@/lib/prisma'

export const findByName = async (name: string) => {
  return await prisma.candidate.findMany({
    where: {
      name,
    },
  })
}
