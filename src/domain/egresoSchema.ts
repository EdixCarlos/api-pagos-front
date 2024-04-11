import { z } from 'zod'
import { usuarioSchema } from '@/domain/userSchema.ts'
import { formaPagoSchema } from '@/domain/formaPagoSchema.ts'
import { sedeSchema } from '@/domain/sedeSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const egresoSchema = z.object({
  id: z.number().optional().nullable(),
  numRecibo: z.string().optional().nullable(),
  cantidad: z.number().optional().nullable(),
  concepto: z.string().optional().nullable(),
  fechaPago: z.string().optional().nullable(),
  user: usuarioSchema,
  formaPago: formaPagoSchema,
  sede: sedeSchema,
})

export type Egreso = z.infer<typeof egresoSchema>
