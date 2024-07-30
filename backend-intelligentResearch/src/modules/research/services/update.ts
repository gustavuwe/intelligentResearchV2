import { prisma } from '@/lib/prisma'
import {
  UpdateResearchSchema,
  updateResearchSchema,
  updateCandidateSchema,
} from '../schemas/update'

// TODO: update the research data like title, desc, and more.
export const update = async (data: UpdateResearchSchema) => {
  const research = await prisma.research.findUnique({
    where: {
      id: data.id,
    },
  })

  if (!research) {
    throw new Error('Research not found') // TODO: refactor this error with a better practice
  }

  await prisma.research.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title ?? research.title,
      startDate: data.startDate ?? research.startDate,
      endDate: data.endDate ?? research.endDate,
      candidates: {
        upsert: data.candidates.map((candidate) => ({ // TODO: fix this type error
          // fix this
          where: { id: candidate.id },
          update: {
            name: candidate.name,
            imgUrl: candidate.imgUrl,
            votes: candidate.votes,
            researchId: candidate.researchId,
            Voters: candidate.Voters,
            Vote: candidate.Vote,
          },
          create: {
            name: candidate.name,
            imgUrl: candidate.imgUrl,
            votes: candidate.votes,
            researchId: research.id,
            Voters: candidate.Voters,
            Vote: candidate.Vote,
          },
        })),
      },
    },
  })
}
