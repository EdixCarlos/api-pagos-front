import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActionsFormaPago } from './data-table-row-actions-forma-pago.tsx'
import { Deuda } from '@/pages/tasks/data/deudaSchema.ts'
import { IconCoins } from '@tabler/icons-react';

export const columnsDeudas: ColumnDef<Deuda>[] = [
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
    accessorKey: 'montoTotal',
    id: 'montoTotal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Monto Total' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.montoTotal}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'saldoPendiente',
    id: 'saldoPendiente',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Saldo Pendiente' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.saldoPendiente}
      </div>
    ),
  },
  {
    accessorKey: 'fechaCreacion',
    id: 'fechaCreacion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Creación" />
    ),
    cell: ({ row }) => {
      const fechaCreacion = new Date(row.original.fechaCreacion + 'T00:00');
      return fechaCreacion.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },
  {
    accessorKey: 'fechaVencimiento',
    id: 'fechaVencimiento',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha Vencimiento' />
    ),
    cell: ({ row }) => {
      const fechaVencimiento = new Date(row.original.fechaVencimiento + 'T00:00');
      return fechaVencimiento.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },
  {
    accessorKey: 'fechaUltimoPago',
    id: 'fechaUltimoPago',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha Último Pago' />
    ),
    cell: ({ row }) => {
      const fechaUltimoPago = new Date(row.original.fechaUltimoPago + 'T00:00');
      return fechaUltimoPago.toLocaleDateString('es-ES', {
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
    id: 'tipoDeuda',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo Deuda' />
    ),
    cell: ({ row }) => row.original.tipoDeuda.nombre,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsFormaPago row={row} />,
  },
]
