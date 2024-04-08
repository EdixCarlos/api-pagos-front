import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const sedeSchema = z.object({
  id: z.number().optional().nullable(),
  nombre: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  distrito: z.string().optional().nullable(),
  provincia: z.string().optional().nullable(),
  departamento: z.string().optional().nullable(),
})

export type Sede = z.infer<typeof sedeSchema>
