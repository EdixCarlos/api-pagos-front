import { ColumnDef } from '@tanstack/react-table'

// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Alumno } from '@/pages/alumnos/data/alumnoSchema.ts'
import { DataTableColumnHeader } from '@/pages/alumnos/components/data-table-column-header.tsx'
import { DataTableRowActionsAlumnos } from '@/pages/alumnos/components/data-table-row-actions-alumnos.tsx'

export const columnsAlumnos: ColumnDef<Alumno>[] = [
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
  {
    accessorKey: 'id',
    id: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.original.id}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'apellidos',
    id: 'apellidos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Apellidos' />
    ),
    cell: ({ row }) => row.original.apellidos,
  },
  {
    accessorKey: 'nombres',
    id: 'nombres',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombres' />
    ),
    cell: ({ row }) => row.original.nombres,
  },
  {
    accessorKey: 'sede.nombre',
    id: 'sede',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sede' />
    ),
    cell: ({ row }) => row.original.sede.nombre,
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
    cell: ({ row }) => <DataTableRowActionsAlumnos row={row} />,
  },
]
