import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const semestreSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().optional(),
  mensualidades: z.number().optional(),
  estado: z.string().optional(),
  modalidadId: z.number().optional(),
  carreraId: z.number().optional(),
  num: z.number().optional(),
})

export type Task = z.infer<typeof semestreSchema>
