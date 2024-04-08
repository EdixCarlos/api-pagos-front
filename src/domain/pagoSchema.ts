import { z } from 'zod'
import { usuarioSchema } from '@/domain/userSchema.ts'
import { tipoPagoSchema } from '@/domain/tipoPagoSchema.ts'
import { formaPagoSchema } from '@/domain/formaPagoSchema.ts'
import { alumnoSchema } from '@/domain/alumnoSchema.ts'
import { deudaSchema } from '@/domain/deudaSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const pagoSchema = z.object({
  id: z.number().optional().nullable(),
  numRecibo: z.string().optional().nullable(),
  cantidad: z.number().optional().nullable(),
  concepto: z.string().optional().nullable(),
  fechaPago: z.string().optional().nullable(),
  user: usuarioSchema,
  tipoPago: tipoPagoSchema,
  formaPago: formaPagoSchema,
  alumno: alumnoSchema,
})

export type Pago = z.infer<typeof pagoSchema>
