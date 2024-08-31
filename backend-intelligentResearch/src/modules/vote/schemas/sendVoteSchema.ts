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
export const sendVoteSchema = z.object({
  voterName: z.string(),
  candidateName: z.string(),
  researchId: z.string(),
  lat: z.string(),
  long: z.string(),
})

export type SendVoteSchema = z.infer<typeof sendVoteSchema>
