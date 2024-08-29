import { prisma } from '@/lib/prisma'
import { UpdateResearchSchema } from '../schemas/update'

// TODO: update the research data like title, desc, and more.
export const update = async (data: UpdateResearchSchema) => {
  const research = await prisma.research.findUnique({
    where: {
      id: data.id,
    },
  })

  if (!research) {
    throw new Error('Research not found')
  }

  await prisma.research.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title ?? research.title,
      startDate: data.startDate ?? research.startDate,
      endDate: data.endDate ?? research.endDate,
    },
  })

  if (data.candidates) {
    await prisma.candidate.updateMany({
      where: {
        researchId: data.id,
      },
      data: data.candidates,
    })
  }

  if (data.Vote) {
    await prisma.vote.updateMany({
      where: {
        researchId: data.id,
      },
      data: data.Vote,
    })
  }
}
