import { CircleIcon, Cross2Icon, PlusIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { semestres } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { AddRecordDialog } from '@/components/custom/AddRecordDialog.tsx'
import { useEffect, useState } from 'react'
import { getSemestres } from '@/services/semestresService.ts'
import { getSedes } from '@/services/sedeService.ts'
import { AddAlumnoDialog } from '@/pages/alumnos/components/AddAlumnoDialog.tsx'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
interface Option {
  value: number;
  label: string;
  icon?: any;
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [isOpen, setIsOpen] = useState(false)
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);

  const fetchSedes = async () => {
    const response = await getSedes();
    const options = response.content.map(sedes => ({
      value: sedes.nombre,
      label: sedes.nombre,
      icon: QuestionMarkCircledIcon,
    }));
    setSedeOptions(options);
  };
  useEffect(() => {
    fetchSedes();
  }, [])
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar por Nombre'
          value={(table.getColumn('nombreCompleto')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nombreCompleto')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('sede') && (
            <DataTableFacetedFilter
              column={table.getColumn('sede')}
              title='Sede'
              options={sedeOptions}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
        <AddAlumnoDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
