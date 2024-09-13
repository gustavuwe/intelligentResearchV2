import { useAPIMutation } from "@/hooks/useApi";
import { z } from "zod";
import { voteSchema } from "./schemas/vote";

export type Vote = {
  id?: string;
  name: string;
  phoneNumber?: string;
  candidateId: string;
  Vote: Vote[];
}

export const createVoterSchema = z.object({
    name: z.string(),
    phoneNumber: z.string().optional(),
  candidateId: z.string(),
  Vote: z.array(voteSchema),
})

type VoteResponse = {
  votes: Vote[];
}

export type CreateVoterSchema = z.infer<typeof createVoterSchema>;

export const useCreateVoter = () => useAPIMutation<VoteResponse>(`/voter/register`, 'post', { withCredentials: true })


