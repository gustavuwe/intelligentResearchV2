import { prisma } from '@/lib/prisma'
import { SendVoteSchema, sendVoteSchema } from '../schemas/sendVoteSchema'
import { env } from '@/lib/env'

export const sendVote = async (data: SendVoteSchema) => {
  const parsedData = sendVoteSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error('Invalid data')
  }

  const { voterName, phoneNumber, candidateId, researchId, lat, long, Vote } =
    parsedData.data

  async function getNeighborhood(latitude: string, longitude: string) {
    const apiKey = env.GOOGLE_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

    const response = await fetch(url)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await response.json()

    if (data.status === 'OK') {
      const addressComponents = data.results[0].address_components
      for (const component of addressComponents) {
        if (
          component.types.includes('sublocality') ||
          component.types.includes('neighborhood')
        ) {
          return component.long_name
        }
      }
    } else {
      throw new Error('Failed to fetch neighborhood information')
    }
  }

  const createVoter = await prisma.voter.create({
    data: {
      name: voterName,
      phoneNumber,
      Candidate: {
        connect: {
          id: candidateId,
        },
      },
      Vote: {
        create: Vote.map((vote) => ({
          id: vote.id,
          voterId: vote.voterId,
          candidateId: vote.candidateId,
          researchId: vote.researchId,
        })),
      },
    },
  })

  const selectedVoter = await prisma.voter.findFirst({
    where: {
      name: createVoter.name,
    },
  })

  if (!selectedVoter) {
    throw new Error('Voter not found')
  }

  await prisma.vote.create({
    data: {
      voterId: selectedVoter.id,
      candidateId,
      researchId,
      neighborhood: await getNeighborhood(lat, long),
      lat,
      long,
    },
  })

  // await prisma.vote.update({
  //   where: {
  //     id: selectedVoter.id,
  //   },
  //   data: {
  //     lat,
  //     long,
  //   },
  // })
}
