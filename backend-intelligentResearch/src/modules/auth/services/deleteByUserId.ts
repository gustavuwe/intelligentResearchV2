import { prisma } from '@/lib/prisma'

export const deleteByUserId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado.')
  }

  return await prisma.user.delete({
    where: { id },
  })
}
