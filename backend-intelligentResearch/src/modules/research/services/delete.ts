import { prisma } from '@/lib/prisma'
import { deleteResearchSchema, DeleteResearchSchema } from '../schemas/delete'

export const deleteResearch = async (id: DeleteResearchSchema) => {
  const parsedData = deleteResearchSchema.parse(id)

  await prisma.research.delete({
    where: {
      id: parsedData.id,
    },
  })
}
