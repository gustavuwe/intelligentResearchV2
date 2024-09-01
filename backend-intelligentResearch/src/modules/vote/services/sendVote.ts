import { prisma } from '@/lib/prisma'
import { SendVoteSchema, sendVoteSchema } from '../schemas/sendVoteSchema'

export const sendVote = async (data: SendVoteSchema) => {
  const parsedData = sendVoteSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error('Invalid data')
  }

  const { voterName, candidateName, researchId, lat, long } = parsedData.data

  const selectedVoter = await prisma.voter.findFirst({
    where: {
      name: voterName,
    },
  })

  const selectedCandidate = await prisma.candidate.findFirst({
    where: {
      name: candidateName,
    },
  })

  if (!selectedVoter || !selectedCandidate) {
    throw new Error('Voter or Candidate not found')
  }

  await prisma.vote.create({
    data: {
      voterId: selectedVoter.id,
      candidateId: selectedCandidate.id,
      researchId,
    },
  })

  await prisma.voter.update({
    where: {
      id: selectedVoter.id,
    },
    data: {
      lat,
      long,
    },
  })
}
