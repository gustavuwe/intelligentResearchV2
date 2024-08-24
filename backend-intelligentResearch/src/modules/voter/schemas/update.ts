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

export const updateVoterSchema = z.object({
  lat: z.string(),
  long: z.string(),
})

export type UpdateVoterSchema = z.infer<typeof updateVoterSchema>
