import { prisma } from '@/lib/prisma'
import { deleteResearchSchema, DeleteResearchSchema } from '../schemas/delete'

export const deleteResearch = async (id: DeleteResearchSchema) => {
  const parsedData = deleteResearchSchema.parse(id)

  return prisma.research.delete({
    where: {
      id: parsedData.id,
    },
  })
}
