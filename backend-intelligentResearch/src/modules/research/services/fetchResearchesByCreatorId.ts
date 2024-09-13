import { prisma } from '@/lib/prisma'

export const fetchResearchesByCreatorId = async (creatorId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: creatorId,
    },
    include: {
      researches: true,
      employees: true,
      Employee: true,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado.')
  }

  const employerId = user.Employee[0]?.employerId

  if (employerId) {
    return prisma.research.findMany({
      where: {
        creatorId: employerId,
      },
      include: {
        candidates: true,
        Vote: true,
      },
    })
  } else {
    return prisma.research.findMany({
      where: {
        creatorId,
      },
      include: {
        candidates: true,
        Vote: true,
      },
    })
  }
}
