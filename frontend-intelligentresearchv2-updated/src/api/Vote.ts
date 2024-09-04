import { useAPIMutation } from "@/hooks/useApi";
import { z } from "zod";

export type Vote = {
  id?: string;
  voterId: string;
  candidateId: string;
  researchId: string;
}

export const createVoteSchema = z.object({
  voterName: z.string(),
  phoneNumber: z.string().optional(),
  candidateId: z.string(),
})

type VoteResponse = {
  votes: Vote[];
}

export const useCreateVote = (researchId: string) => useAPIMutation<VoteResponse>(`/vote/register`, 'post', { withCredentials: true })

export const useSendVote = () => useAPIMutation<VoteResponse>(`/vote/sendVote`, 'post', { withCredentials: true })

export type CreateVoteSchema = z.infer<typeof createVoteSchema>;

