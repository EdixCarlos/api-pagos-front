import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const formaPagoSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
});

export type formaPago = z.infer<typeof formaPagoSchema>
