import { z } from 'zod'
import { sedeSchema } from '@/domain/sedeSchema.ts'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'
import { tipoDeudaSchema } from '@/pages/tasks/data/tipoDeudaSchema.ts'
import { alumnoSchema } from '@/pages/alumnos/data/alumnoSchema.ts'
import { usuarioSchema } from '@/domain/userSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const matriculaSchema = z.object({
  id: z.number().optional().nullable(),
  alumno: alumnoSchema,
  semestre: semestreSchema,
  fechaInscripcion: z.string().optional().nullable(),
  user: usuarioSchema,
  estado: z.string().optional().nullable(),
})

export type Matricula = z.infer<typeof matriculaSchema>
