import { prisma } from '@/lib/prisma'

export const deleteResearch = async (id: string) => {
  return prisma.research.delete({
    where: {
      id,
    },
  })
}
