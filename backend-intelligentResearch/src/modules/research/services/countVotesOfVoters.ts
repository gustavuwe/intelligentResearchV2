import { prisma } from '@/lib/prisma'
interface Idata {
  neighborhood: string
  votes: number
}

interface ICandidatesData {
  name: string
  data: Idata[]
}

export const countVotesOfVoters = async () => {
  const candidatesData: ICandidatesData[] = []
  await prisma.research.findMany({
    where: {
      id: parsedData.id,
    },
  })
}
