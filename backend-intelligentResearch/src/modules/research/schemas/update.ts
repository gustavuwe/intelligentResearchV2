import { z } from 'zod'

export const updateCandidateSchema = z.object({
  id: z.string(),
  name: z.string(),
  imgUrl: z.string(),
  votes: z.number().int(),
  researchId: z.string(),
  Voters: z.array(z.string()),
  Vote: z.array(z.string()),
})

export type UpdateCandidateSchema = z.infer<typeof updateCandidateSchema>

export const updateVoteSchema = z.object({
  id: z.string(),
  voterId: z.string(),
  candidateId: z.string().optional(),
  researchId: z.string().optional(),
})

export const updateResearchSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  candidates: z.array(updateCandidateSchema).optional(),
  vote: z.array(updateVoteSchema).optional(),
})

export type UpdateResearchSchema = z.infer<typeof updateResearchSchema>
