import { z } from 'zod'
import { sedeSchema } from '@/domain/sedeSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const carreraSchema = z.object({
  id: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
  numSemestres: z.number().optional().nullable(),
  sede: sedeSchema,
})

export type Carrera = z.infer<typeof carreraSchema>
