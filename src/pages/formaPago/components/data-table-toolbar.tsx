import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { useState } from 'react'
import { AddFormaPagoDialog } from '@/pages/formaPago/components/AddFormaPagoDialog.tsx'
import { Button } from '@/components/custom/button.tsx'
import { Cross2Icon } from '@radix-ui/react-icons'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar por nombre'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
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
        <AddFormaPagoDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
