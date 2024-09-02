import { z } from 'zod'

export const updateVoterSchema = z.object({
  lat: z.string(),
  long: z.string(),
})

export type UpdateVoterSchema = z.infer<typeof updateVoterSchema>
