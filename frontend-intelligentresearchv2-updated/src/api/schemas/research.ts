import { z } from "zod";

export const createResearchFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.string(),
  kind: z.enum(["prefeito", "vereador"]),
})

export type CreateResearchFormSchema = z.infer<typeof createResearchFormSchema>;