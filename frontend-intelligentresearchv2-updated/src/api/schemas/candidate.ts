import { z } from "zod";

export const createCandidateFormSchema = z.object({
    name: z.string().min(3),
})

export type CreateCandidateFormSchema = z.infer<typeof createCandidateFormSchema>;