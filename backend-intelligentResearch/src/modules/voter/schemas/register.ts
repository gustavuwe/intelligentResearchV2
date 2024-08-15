import { VoteSchema } from '@/modules/research/schemas/register'
import { z } from 'zod'

/* 
id          String    @id @default(uuid())
  name        String
  phoneNumber String?
  lat         String
  long        String
  Candidate   Candidate @relation(fields: [candidateId], references: [id])
  candidateId String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  Vote        Vote[]
*/

export const registerVoterSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
  lat: z.string(),
  long: z.string(),
  candidateId: z.string(),
  Vote: z.array(VoteSchema),
})

export type RegisterVoterSchema = z.infer<typeof registerVoterSchema>
