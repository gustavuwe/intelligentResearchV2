import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignInSchema } from '../schemas/sign-in'

export const signIn = async (data: SignInSchema) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: data.username,
    },
  })
  const isUserPassword = await bcrypt.compare(data.password, user.password)

  if (isUserPassword) {
    return user
  }
}
