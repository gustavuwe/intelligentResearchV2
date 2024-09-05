import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import {
  registerEmployeeSchema,
  RegisterEmployeeSchema,
} from '../schemas/register-employee'
export const registerEmployee = async (data: RegisterEmployeeSchema) => {
  const parsedData = registerEmployeeSchema.parse(data)
  const hashedPassword = bcrypt.hashSync(parsedData.password, 10)

  const userId = await prisma.user.create({
    data: {
      username: parsedData.username,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  })

  await prisma.employee.create({
    data: {
      user: {
        connect: {
          id: userId.id,
        },
      },
      employer: {
        connect: {
          id: parsedData.employerId,
        },
      },
    },
  })
}
