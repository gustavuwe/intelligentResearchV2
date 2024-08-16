import { z } from 'zod'

/* 
  id          String    @id @default(uuid())
  voter       Voter     @relation(fields: [voterId], references: [id])
  voterId     String
  candidate   Candidate @relation(fields: [candidateId], references: [id])
  candidateId String
  research    Research  @relation(fields: [researchId], references: [id])
  researchId  String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
*/
export const registerVoteSchema = z.object({
  voterId: z.string(),
  candidateId: z.string(),
  researchId: z.string(),
})

export type RegisterVoteSchema = z.infer<typeof registerVoteSchema>
