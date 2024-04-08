import { z } from 'zod'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const horariosSchema = z.object({
  id: z.number().optional().nullable(),
  dia: z.string().nullable().optional(),
  horaInicio: z.string().nullable().optional(),
  horaFin: z.string().nullable().optional(),
  semestre: semestreSchema,
})

export type Horario = z.infer<typeof horariosSchema>
