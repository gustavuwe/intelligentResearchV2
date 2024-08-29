import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignUpSchema } from '../schemas/sign-up'
export const signUp = async (data: SignUpSchema) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10)

  return prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
  })
}
