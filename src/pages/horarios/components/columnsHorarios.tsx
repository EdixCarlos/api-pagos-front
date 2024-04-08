import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { IconCoins } from '@tabler/icons-react';
import { Horario } from '@/domain/horariosSchema.ts'

export const columnsHorarios: ColumnDef<Horario>[] = [
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
    accessorKey: 'dia',
    id: 'dia',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dia' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.dia}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'horaInicio',
    id: 'horaInicio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hora inicio' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.horaInicio}
      </div>
    ),
  },
  {
    accessorKey: 'horaFin',
    id: 'horaFin',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hora fin' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.original.horaFin}
      </div>
    ),
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
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
