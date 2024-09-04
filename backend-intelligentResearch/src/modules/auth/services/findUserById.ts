import { prisma } from '@/lib/prisma'

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return user
}
