import { z } from "zod";

export const registerEmployeeFormSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type RegisterEmployeeFormSchema = z.infer<typeof registerEmployeeFormSchema>;