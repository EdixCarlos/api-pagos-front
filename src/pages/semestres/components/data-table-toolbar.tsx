import { Cross2Icon, PlusIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { AddRecordDialog } from '@/components/custom/AddRecordDialog.tsx'
import { useEffect, useState } from 'react'
import { AddSemestreDialog } from '@/pages/semestres/components/AddSemestreDialog.tsx'
import { getSedes } from '@/services/sedeService.ts'
import { getCarreras } from '@/services/carrerasService.ts'

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
  const [carreaOptions, setCarreaOptions] = useState<Option[]>([]);

  const fetchCarreras = async () => {
    const response = await getCarreras();
    const options = response.content.map(carrera => ({
      value: carrera.nombre,
      label: carrera.nombre,
      icon: QuestionMarkCircledIcon,
    }));
    setCarreaOptions(options);
  };
  useEffect(() => {
    fetchCarreras();
  }, [])
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar por nombre'
          value={(table.getColumn('nombre')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('nombre')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('carrera') && (
            <DataTableFacetedFilter
              column={table.getColumn('carrera')}
              title='Semestre'
              options={carreaOptions}
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
        <AddSemestreDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}