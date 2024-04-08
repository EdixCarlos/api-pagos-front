import { z } from 'zod'
import { alumnoSchema } from '@/pages/alumnos/data/alumnoSchema.ts'
import { tipoDeudaSchema } from '@/pages/tasks/data/tipoDeudaSchema.ts'
import { semestreSchema } from '@/pages/tasks/data/semestreSchema.ts'
import { pagoSchema } from '@/domain/pagoSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const deudaSchema = z.object({
  id: z.number(),
  alumno: alumnoSchema.optional(),
  semestre: semestreSchema.optional(),
  montoTotal: z.number().optional(),
  saldoPendiente: z.number().optional(),
  fechaCreacion: z.string().optional(),
  fechaVencimiento: z.string().optional(),
  fechaUltimoPago: z.string().optional(),
  estado: z.string().optional(),
  tipoDeuda: tipoDeudaSchema.optional(),
  pagos: z.array(pagoSchema).optional(),
});

export type Deuda = z.infer<typeof deudaSchema>
