import { VoteSchema } from '@/modules/research/schemas/register'
import { z } from 'zod'

export const VotersSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  phoneNumber: z.string().optional(),
  lat: z.string(),
  long: z.string(),
  candidateId: z.string(),
  Vote: z.array(VoteSchema),
})

/* 
  id         String    @id @default(uuid())
  name       String    @unique
  imgUrl     String
  votes      Int       @default(0)
  Research   Research? @relation(fields: [researchId], references: [id])
  researchId String?
  Voters     Voter[]
  Vote       Vote[]
*/

export const registerCandidateSchema = z.object({
  name: z.string(),
  imgUrl: z.string(),
  votes: z.number().optional(),
  researchId: z.string().optional(),
  Voters: z.array(VotersSchema),
  Vote: z.array(VoteSchema),
})

export type RegisterCandidateSchema = z.infer<typeof registerCandidateSchema>
