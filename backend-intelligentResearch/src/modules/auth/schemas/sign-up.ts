import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
