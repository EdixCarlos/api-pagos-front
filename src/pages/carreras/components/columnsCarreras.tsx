import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Carrera } from '@/domain/carreraSchema.ts'

export const columnsCarreras: ColumnDef<Carrera>[] = [
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
    accessorKey: 'nombre',
    id: 'nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ row }) => row.original.nombre,
  },
  {
    accessorKey: 'numSemestres',
    id: 'numSemestres',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Numero de semestres' />
    ),
    cell: ({ row }) => row.original.numSemestres,
  },
  {
    accessorKey: 'sede.nombre',
    id: 'sede',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sede' />
    ),
    cell: ({ row }) => row.original.sede.nombre,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
