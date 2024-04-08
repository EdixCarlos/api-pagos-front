import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const semestreSchema = z.object({
  id: z.number(),
  nombre: z.string(),
})

export type Task = z.infer<typeof semestreSchema>
