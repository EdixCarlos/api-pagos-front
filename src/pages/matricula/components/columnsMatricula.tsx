import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Deuda } from '@/pages/tasks/data/deudaSchema.ts'
import { IconCoins } from '@tabler/icons-react';
import { Matricula } from '@/domain/matriculaSchema.ts'

export const columnsMatricula: ColumnDef<Matricula>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: 'id',
  //   id: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='ID' />
  //   ),
  //   cell: ({ row }) => <div className='w-[80px]'>{row.original.id}</div>,
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    accessorKey: 'alumno',
    id: 'alumno',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Alumno' />
    ),
    cell: ({ row }) => `${row.original.alumno.apellidos}, ${row.original.alumno.nombres}`,
    filterFn: (row, _id, value) => {
      const alumno = `${row.original.alumno.apellidos}, ${row.original.alumno.nombres}`;
      return alumno.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: 'semestre.nombre',
    id: 'semestre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Semestre' />
    ),
    cell: ({ row }) => row.original.semestre.nombre,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'user.name',
    id: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='user' />
    ),
    cell: ({ row }) => row.original.user.name,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'fechaInscripcion',
    id: 'fechaInscripcion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Inscripcion" />
    ),
    cell: ({ row }) => {
      const fechaCreacion = new Date(row.original.fechaInscripcion + 'T00:00');
      return fechaCreacion.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },
  {
    id: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => row.original.estado,
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
