import { z } from 'zod'
import { sedeSchema } from '@/domain/sedeSchema.ts'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const alumnoSchema = z.object({
  id: z.number().optional().nullable(),
  codigo: z.string().optional().nullable(),
  apellidos: z.string().optional().nullable(),
  nombres: z.string().optional().nullable(),
  sexo: z.string().optional().nullable(),
  fechaNacimiento: z.string().optional().nullable(),
  fechaInscripcion: z.string().optional().nullable(),
  celular: z.string().optional().nullable(),
  telefono: z.string().optional().nullable(),
  dni: z.string().optional().nullable(),
  direccion: z.string().optional().nullable(),
  distrito: z.string().optional().nullable(),
  provincia: z.string().optional().nullable(),
  departamento: z.string().optional().nullable(),
  sede: sedeSchema,
  estado: z.string().optional().nullable(),
})

export type Alumno = z.infer<typeof alumnoSchema>
