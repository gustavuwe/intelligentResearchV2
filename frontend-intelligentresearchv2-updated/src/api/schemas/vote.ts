import { z } from "zod";

export const voteSchema = z.object({
  voterId: z.string(),
  candidateId: z.string(),
  researchId: z.string(),
});