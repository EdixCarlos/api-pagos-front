import { z } from 'zod'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const modalidadesSchema = z.object({
  id: z.number().optional().nullable(),
    name: z.string().optional().nullable(),
  descripcion: z.string().nullable().optional(),
})

export type Modalidad = z.infer<typeof modalidadesSchema>
