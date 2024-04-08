import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { IconCoins } from '@tabler/icons-react';
import { Semestre } from '@/domain/semestreSchema.ts'

export const columnsSemestres: ColumnDef<Semestre>[] = [
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
    accessorKey: 'nombre',
    id: 'nombre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.nombre}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'mensualidades',
    id: 'mensualidades',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mensualidades' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.mensualidades}
      </div>
    ),
  },
  {
    accessorKey: 'estado',
    id: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => row.original.estado,
  },
  {
    accessorKey: 'modalidad.name',
    id: 'modalidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modalidades' />
    ),
    cell: ({ row }) => row.original.modalidad.name,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'carrera.nombre',
    id: 'carrera',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Carrera' />
    ),
    cell: ({ row }) => row.original.carrera.nombre,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'num',
    id: 'num',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Num Semestre' />
    ),
    cell: ({ row }) => (
      <div >
        {row.original.num}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'costoMatricula',
    id: 'costoMatricula',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Costo Matricula' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.costoMatricula}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'costoMensualidad',
    id: 'costoMensualidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Costo Mensualidad' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.costoMensualidad}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
