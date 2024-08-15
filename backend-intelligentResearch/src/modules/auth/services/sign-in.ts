import { prisma } from '@/lib/prisma'
import { SignInSchema } from '../schemas/sign-in'
import bcrypt from 'bcryptjs'

export const signIn = async (data: SignInSchema) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: data.username,
    },
    select: {
      id: true,
      username: true,
      password: true, // maybe we don't need this but for now it's ok, but not secure
      role: true,
    },
  })
  const isUserPassword = bcrypt.compareSync(data.password, user.password)

  if (isUserPassword) {
    return user
  }
}
