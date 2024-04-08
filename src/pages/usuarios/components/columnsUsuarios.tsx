import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { IconCoins } from '@tabler/icons-react';
import { User } from '@/domain/userSchema.ts'

export const columnsUsuarios: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' />
    ),
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'username',
    id: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='username' />
    ),
    cell: ({ row }) => row.original.username,
  }
  // ,
  // {
  //   accessorKey: 'password',
  //   id: 'password',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='password' />
  //   ),
  //   cell: ({ row }) => row.original.password,
  // }
  // ,{
  //   accessorKey: 'email',
  //   id: 'email',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='email' />
  //   ),
  //   cell: ({ row }) => row.original.email,
  // }
  ,{
    accessorKey: 'sexo',
    id: 'sexo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='sexo' />
    ),
    cell: ({ row }) => row.original.sexo,
  }
  ,{
    accessorKey: 'phone',
    id: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='phone' />
    ),
    cell: ({ row }) => row.original.phone,
  }
  ,
  {
    accessorKey: 'dni',
    id: 'dni',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='dni' />
    ),
    cell: ({ row }) => row.original.dni,
  },
  {
    accessorKey: 'direccion',
    id: 'direccion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='direccion' />
    ),
    cell: ({ row }) => row.original.direccion,
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
    accessorKey: 'estado',
    id: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => row.original.estado,
  },
  {
    accessorKey: 'roles',
    id: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='roles' />
    ),
    cell: ({ row }) => row.original.roles.map(role => role.name).join(', '),
  },
  // {
  //   accessorKey: 'admin',
  //   id: 'admin',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='admin' />
  //   ),
  //   cell: ({ row }) => row.original.admin,
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
