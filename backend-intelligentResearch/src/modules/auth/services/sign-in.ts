import { prisma } from '@/lib/prisma'
import { SignInSchema } from '../schemas/sign-in'
import * as bcrypt from 'bcryptjs'

export const signIn = async (data: SignInSchema) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10)

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: data.username,
    },
  })
  if (hashedPassword === user.password) {
    return user
  }
}
