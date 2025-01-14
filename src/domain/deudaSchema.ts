import { z } from 'zod'
import { alumnoSchema } from '@/pages/alumnos/data/alumnoSchema.ts'
import { tipoDeudaSchema } from '@/pages/tasks/data/tipoDeudaSchema.ts'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'
import { pagoSchema } from '@/domain/pagoSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const deudaSchema = z.object({
  id: z.number().optional().nullable(),
  alumno: alumnoSchema,
  semestre: semestreSchema,
  montoTotal: z.number().optional().nullable(),
  saldoPendiente: z.number().optional().nullable(),
  fechaCreacion: z.string().optional().nullable(),
  fechaVencimiento: z.string().optional().nullable(),
  fechaUltimoPago: z.string().optional().nullable(),
  estado: z.string().optional().nullable(),
  tipoDeuda: tipoDeudaSchema,
  pagos: z.array(pagoSchema).optional().nullable(),
  })

export type Deuda = z.infer<typeof deudaSchema>
