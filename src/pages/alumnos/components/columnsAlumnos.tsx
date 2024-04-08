import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { IconCoins } from '@tabler/icons-react';
import { Alumno } from '@/domain/alumnoSchema.ts'
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
    accessorKey: 'codigo',
    id: 'codigo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Codigo' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        {/*<IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />*/}
        {row.original.codigo}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'nombreCompleto',
    id: 'nombreCompleto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Completo' />
    ),
    cell: ({ row }) => `${row.original.apellidos}, ${row.original.nombres}`,
    filterFn: (row, _id, value) => {
      const alumno = `${row.original.apellidos}, ${row.original.nombres}`;
      return alumno.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: 'sexo',
    id: 'sexo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Genero' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        {/*<IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />*/}
        {row.original.sexo}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'fechaNacimiento',
    id: 'fechaNacimiento',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Nacimiento" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaNacimiento + 'T00:00');
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },{
    accessorKey: 'fechaInscripcion',
    id: 'fechaInscripcion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha inscripcion" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaInscripcion + 'T00:00');
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
  },
  {
    accessorKey: 'celular',
    id: 'celular',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Celular' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        {/*<IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />*/}
        +51 {row.original.celular}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'telefono',
    id: 'telefono',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Telefono' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        {/*<IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />*/}
        {row.original.telefono}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'dni',
    id: 'dni',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='DNI' />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center ">
        {/*<IconCoins className="mr-2 h-4 w-4 text-muted-foreground" />*/}
        {row.original.dni}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'direccion',
    id: 'direccion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Direccion' />
    ),
    cell: ({ row }) => `${row.original.direccion}, ${row.original.distrito, row.original.provincia, row.original.departamento}`,
    filterFn: (row, _id, value) => {
      const alumno = `${row.original.apellidos}, ${row.original.nombres}`;
      return alumno.toLowerCase().includes(value.toLowerCase());
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
