import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActionsFormaPago } from './data-table-row-actions-forma-pago.tsx'
import { Deuda } from '@/pages/tasks/data/deudaSchema.ts'
import { IconCoins } from '@tabler/icons-react';
import { formaPago } from '@/domain/formaPagoSchema.ts'

export const columnsFormaPago: ColumnDef<formaPago>[] = [
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
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ row }) => row.original.name,
    filterFn: (row, _id, value) => {
      const name = row.original.name;
      return name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsFormaPago row={row} />,
  },
]
