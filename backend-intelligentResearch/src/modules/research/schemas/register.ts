import { z } from 'zod'

export const CandidateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  imgUrl: z.string(),
  votes: z.number().int(),
  researchId: z.string().optional(),
  Voters: z.array(z.string()),
  Vote: z.array(z.string()),
})

export const VoteSchema = z.object({
  id: z.string().optional(),
  voterId: z.string(),
  candidateId: z.string(),
  researchId: z.string(),
})

export const registerResearchSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  candidates: z.array(CandidateSchema),
  vote: z.array(VoteSchema),
})

export type RegisterResearchSchema = z.infer<typeof registerResearchSchema>
