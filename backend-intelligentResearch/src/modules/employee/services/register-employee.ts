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

  const employee = await prisma.employee.create({
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
    select: {
      id: true,
    },
  })

  return {
    id: userId.id,
    user: {
      id: employee.id,
      username: parsedData.username,
    },
    employerId: parsedData.employerId,
  }
}
