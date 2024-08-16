import { prisma } from '@/lib/prisma'
import {
  registerCandidateSchema,
  RegisterCandidateSchema,
} from '../schemas/register'

export const register = async (data: RegisterCandidateSchema) => {
  const parsedData = registerCandidateSchema.parse(data)

  return prisma.candidate.create({
    data: {
      name: parsedData.name,
      imgUrl: parsedData.imgUrl,
      votes: parsedData.votes,
      Research: {
        connect: {
          id: parsedData.researchId,
        },
      },
      Voters: {
        create: parsedData.Voters.map((voter) => ({
          id: voter.id,
          name: voter.name,
          phoneNumber: voter.phoneNumber,
          lat: voter.lat,
          long: voter.long,
          Candidate: {
            connect: {
              id: voter.candidateId,
            },
          },
          Vote: {
            create: voter.Vote.map((vote) => ({
              id: vote.id,
              voterId: vote.voterId,
              candidateId: vote.candidateId,
              researchId: vote.researchId,
            })),
          },
        })),
      },
      Vote: {
        create: parsedData.Vote.map((vote) => ({
          id: vote.id,
          voterId: vote.voterId,
          candidateId: vote.candidateId,
          researchId: vote.researchId,
        })),
      },
    },
  })
}
