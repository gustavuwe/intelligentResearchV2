import { prisma } from '@/lib/prisma'
import { SignUpSchema } from '../schemas/sign-up'
import bcrypt from 'bcryptjs'
export const signUp = async (data: SignUpSchema) => {
  console.log(data.password)
  const hashedPassword = bcrypt.hashSync(data.password, 10)

  return prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
    },
  })
}
