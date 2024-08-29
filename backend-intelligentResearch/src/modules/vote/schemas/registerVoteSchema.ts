import { z } from 'zod'

export const registerVoteSchema = z.object({
  voterId: z.string(),
  candidateId: z.string(),
  researchId: z.string(),
})

export type RegisterVoteSchema = z.infer<typeof registerVoteSchema>
