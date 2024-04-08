import { z } from 'zod'
import { sedeSchema } from '@/domain/sedeSchema.ts'

const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export const usuarioSchema = z.object({
  id: z.number().optional().nullable(),
  username: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  sexo: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  dni: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  sede: sedeSchema,
  estado: z.string().optional().nullable(),
  roles: z.array(roleSchema).optional().nullable(),
  admin: z.boolean().optional().nullable(),
})

export type User = z.infer<typeof usuarioSchema>
