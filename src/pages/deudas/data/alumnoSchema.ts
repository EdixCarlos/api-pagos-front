import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const alumnoSchema = z.object({
  id: z.number(),
  codigo: z.string(),
  apellidos: z.string(),
  nombres: z.string(),
})

export type Task = z.infer<typeof alumnoSchema>
