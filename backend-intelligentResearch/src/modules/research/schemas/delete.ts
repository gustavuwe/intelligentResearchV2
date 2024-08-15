import { z } from 'zod'

export const deleteResearchSchema = z.object({
  id: z.string(),
})

export type DeleteResearchSchema = z.infer<typeof deleteResearchSchema>
