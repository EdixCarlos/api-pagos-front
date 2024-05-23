import { z } from 'zod'
import { modalidadesSchema } from '@/domain/modalidadSchema.ts'
import { carreraSchema } from '@/domain/carreraSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const semestreSchema = z.object({
  id: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
  mensualidades: z.number().optional().nullable(),
  estado: z.string().optional().nullable(),
  modalidad: modalidadesSchema,
  carrera: carreraSchema,
  num: z.number().optional().nullable(),
  costoMatricula: z.number().optional().nullable(),
  costoMensualidad: z.number().optional().nullable(),
  fechaInicio: z.string().optional().nullable(),
})
export type Semestre = z.infer<typeof semestreSchema>

