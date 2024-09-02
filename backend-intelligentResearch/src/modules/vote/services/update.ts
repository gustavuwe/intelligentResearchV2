/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import { UpdateVoterSchema, updateVoterSchema } from '../schemas/update'

export const update = async (id: string, data: UpdateVoterSchema) => {
  const parsedData = updateVoterSchema.parse(data)

  async function getNeighborhood(latitude: string, longitude: string) {
    const apiKey = env.GOOGLE_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

    const response = await fetch(url)
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

  return prisma.vote.update({
    where: {
      id,
    },
    data: {
      ...parsedData,
      neighborhood: await getNeighborhood(parsedData.lat, parsedData.long),
    },
  })
}
