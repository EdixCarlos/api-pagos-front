import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Deuda } from '@/pages/tasks/data/deudaSchema.ts'
import { IconCoins } from '@tabler/icons-react';
import { Sede } from '@/domain/sedeSchema.ts'

export const columnsSedes: ColumnDef<Sede>[] = [
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
    accessorKey: 'nombre',
    id: 'nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='nombre' />
    ),
    cell: ({ row }) => row.original.nombre,
  },
  {
    accessorKey: 'direccion',
    id: 'direccion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Direccion' />
    ),
    cell: ({ row }) => row.original.direccion,
  },
  {
    accessorKey: 'distrito',
    id: 'distrito',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Distrito' />
    ),
    cell: ({ row }) => row.original.distrito,
  },
  {
    accessorKey: 'provincia',
    id: 'provincia',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Provincia' />
    ),
    cell: ({ row }) => row.original.provincia,
  },
  {
    accessorKey: 'departamento',
    id: 'departamento',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Departamento' />
    ),
    cell: ({ row }) => row.original.departamento,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
