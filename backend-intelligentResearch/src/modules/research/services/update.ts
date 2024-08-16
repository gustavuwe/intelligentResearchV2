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
    throw new Error('Research not found') // TODO: refactor this error with a better practice
  }

  // await prisma.research.updateMany({
  //   where: {
  //     id: data.id
  //   },

  //   data: {
  //     title: data.title,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //     candidates: {
  //       create: data.candidates?.map((candidate) => ({
  //         id: candidate.id,
  //         name: candidate.name,
  //         imgUrl: candidate.imgUrl,
  //         votes: candidate.votes,
  //       })),
  //     },
  //     Vote: {
  //       create: data.Vote?.map((vote) => ({
  //         id: vote.id,
  //         voterId: vote.voterId,
  //         candidateId: vote.candidateId,
  //         researchId: vote.researchId,
  //       })),
  //     },
  //   }

  // }),
  // })

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
