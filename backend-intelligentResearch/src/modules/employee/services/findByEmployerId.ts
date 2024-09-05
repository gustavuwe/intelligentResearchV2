import { prisma } from '@/lib/prisma'

export const findByEmployerId = async (id: string) => {
  //   const employees = await prisma.employee.findMany({
  //     where: {
  //       userId: id,
  //     },
  //     select: {
  //       user: {
  //         select: {
  //           username: true,
  //         },
  //       },
  //     },
  //   })

  const employees = await prisma.employee.findMany({
    where: {
      employerId: id, // Busca os funcionários baseados no employerId
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  })

  return {
    employees,
  }
  //   const users: string[] = []
  //   const employees = await prisma.user.findUniqueOrThrow({
  //     where: {
  //       id,
  //     },
  //     select: {
  //       employees: true,
  //     },
  //   })

  //   employees.employees.map(async (employee) => {
  //     const username = await prisma.user.findUniqueOrThrow({
  //       where: {
  //         id: employee.userId,
  //       },
  //       select: {
  //         username: true,
  //       },
  //     })

  //     users.push(username.toString())
  //   })
}
