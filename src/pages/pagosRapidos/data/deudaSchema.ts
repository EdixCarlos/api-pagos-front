import { z } from 'zod'
import { alumnoSchema } from '@/pages/alumnos/data/alumnoSchema.ts'
import { tipoDeudaSchema } from '@/pages/tasks/data/tipoDeudaSchema.ts'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const deudaSchema = z.object({
  id: z.number(),
  alumno: alumnoSchema,
  semestre: semestreSchema,
  montoTotal: z.number(),
  saldoPendiente: z.number(),
  fechaCreacion: z.string(),
  fechaVencimiento: z.string(),
  fechaUltimoPago: z.string(),
  estado: z.string(),
  tipoDeuda: tipoDeudaSchema,
})

export type Deuda = z.infer<typeof deudaSchema>
