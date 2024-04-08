import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Pago } from '@/domain/pagoSchema.ts'

export const columnsPagos: ColumnDef<Pago>[] = [
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
    accessorKey: 'tipoPago.nombre',
    id: 'tipoPago',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo Pago' />
    ),
    cell: ({ row }) => row.original.tipoPago.nombre,
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
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
