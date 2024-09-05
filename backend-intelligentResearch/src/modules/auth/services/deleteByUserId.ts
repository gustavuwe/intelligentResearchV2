import { prisma } from '@/lib/prisma'

export const deleteByUserId = async (id: string) => {
  //   await prisma.employee.deleteMany({
  //     where: {
  //       employerId: id,
  //       userId: id,
  //     },
  //   })

  //   await prisma.research.deleteMany({
  //     where: {
  //       creatorId: id,
  //     },
  //   })
  await prisma.$transaction(async (prisma) => {
    await prisma.employee.deleteMany({
      where: {
        employerId: id,
      },
    })

    await prisma.research.deleteMany({
      where: {
        creatorId: id,
      },
    })

    await prisma.user.delete({
      where: {
        id,
      },
    })
  })
}
