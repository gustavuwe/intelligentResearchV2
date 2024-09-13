import { z } from 'zod'

export const registerEmployeeSchema = z.object({
  username: z.string(),
  password: z.string(),
  employerId: z.string(),
})

export type RegisterEmployeeSchema = z.infer<typeof registerEmployeeSchema>
