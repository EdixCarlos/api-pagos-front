import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tipoDeudaSchema = z.object({
  id: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
})

export type TipoDeuda = z.infer<typeof tipoDeudaSchema>
