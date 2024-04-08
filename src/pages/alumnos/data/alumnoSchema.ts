import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const alumnoSchema = z.object({
  id: z.number().optional(),
  codigo: z.string().optional(),
  apellidos: z.string().optional(),
  nombres: z.string().optional(),
})

export type Task = z.infer<typeof alumnoSchema>
