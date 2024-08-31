import { prisma } from '@/lib/prisma'
import { RegisterVoteSchema } from '../schemas/registerVoteSchema'
import { sendVoteSchema } from '../schemas/sendVoteSchema'

export const register = async (data: RegisterVoteSchema) => {
  const parsedData = sendVoteSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error('Invalid data')
  }

  const { voterName, candidateName, researchId, lat, long } = parsedData.data

    
}
