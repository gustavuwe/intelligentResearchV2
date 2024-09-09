import { prisma } from '@/lib/prisma'

export const deleteByUserId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error(`id: ${id}`)
  }

  await prisma.user.delete({
    where: { id },
  })
}
