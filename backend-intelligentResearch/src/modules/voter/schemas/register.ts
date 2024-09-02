import { VoteSchema } from '@/modules/research/schemas/register'
import { z } from 'zod'

export const registerVoterSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
  candidateId: z.string(),
  Vote: z.array(VoteSchema),
})

export type RegisterVoterSchema = z.infer<typeof registerVoterSchema>
