import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Egreso } from '@/domain/egresoSchema.ts'

export const columnsEgresos: ColumnDef<Egreso>[] = [
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
    id: 'numRecibo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Numero recibo' />
    ),
    cell: ({ row }) => row.original.numRecibo,
  },
  {
    id: 'cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
    cell: ({ row }) => row.original.cantidad,
  },
  {
    id: 'concepto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Concepto' />
    ),
    cell: ({ row }) => row.original.concepto,
  },
  {
    accessorKey: 'fechaPago',
    id: 'fechaPago',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Pago" />
    ),
    cell: ({ row }) => {
      const fechaCreacion = new Date(row.original.fechaPago + 'T00:00');
      return fechaCreacion.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },
  {
    accessorKey: 'user.name',
    id: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Usuario' />
    ),
    cell: ({ row }) => row.original.user.name,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'formaPago.nombre',
    id: 'formaPago',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Forma Pago' />
    ),
    cell: ({ row }) => row.original.formaPago.name,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
