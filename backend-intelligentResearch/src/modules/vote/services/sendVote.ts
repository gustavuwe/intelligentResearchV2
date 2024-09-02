import { prisma } from '@/lib/prisma'
import { SendVoteSchema, sendVoteSchema } from '../schemas/sendVoteSchema'
import { env } from '@/lib/env'

export const sendVote = async (data: SendVoteSchema) => {
  const parsedData = sendVoteSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error('Invalid data')
  }

  const { voterName, candidateName, researchId, lat, long } = parsedData.data

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
