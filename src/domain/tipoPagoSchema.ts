import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tipoPagoSchema = z.object({
  id: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
})

export type TipoPago = z.infer<typeof tipoPagoSchema>
