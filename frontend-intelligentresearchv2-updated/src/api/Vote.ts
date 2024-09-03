import { z } from "zod";

export type Vote = {
  id?: string;
  voterId: string;
  candidateId: string;
  researchId: string;
}

export const createVoteSchema = z.object({
  candidateId: z.string(),
  name: z.string(),
  phoneNumber: z.string().optional(),
})

export type CreateVoteSchema = z.infer<typeof createVoteSchema>;