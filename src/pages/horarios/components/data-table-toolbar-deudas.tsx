import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { priorities, statuses } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbarDeudas<TData>({
                                          table,
                                        }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar por alumno...'
          value={(table.getColumn('alumno')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('alumno')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {/*<div className='flex gap-x-2'>*/}
        {/*  {table.getColumn('semestre') && (*/}
        {/*    <DataTableFacetedFilter*/}
        {/*      column={table.getColumn('semestre')}*/}
        {/*      title='Semestre'*/}
        {/*      options={statuses} // Asegúrese de tener una lista de semestres para filtrar*/}
        {/*    />*/}
        {/*  )}*/}
        {/*  {table.getColumn('montoTotal') && (*/}
        {/*    <DataTableFacetedFilter*/}
        {/*      column={table.getColumn('montoTotal')}*/}
        {/*      title='Monto Total'*/}
        {/*      options={priorities} // Asegúrese de tener una lista de montos para filtrar*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</div>*/}
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
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
