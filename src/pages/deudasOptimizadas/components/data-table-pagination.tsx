import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
  setSize: (size: number) => void
  pageNumber: number
  sizeNumber: number
}

export function DataTablePagination<TData>({
  table,
  totalPages,
  currentPage,
  setPage,
  setSize,
  pageNumber,
  sizeNumber,
}: DataTablePaginationProps<TData>) {
 return (
  <div className='flex items-center justify-between overflow-auto px-2'>
    <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
      {table.getFilteredSelectedRowModel().rows.length} de{' '}
      {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
    </div>
    <div className='flex items-center sm:space-x-6 lg:space-x-8'>
      <div className='flex items-center space-x-2'>
        <p className='hidden text-sm font-medium sm:block'>Filas por página</p>
        <Select
          value={`${sizeNumber}`}
          onValueChange={(value) => {
            setSize(Number(value))
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={sizeNumber} />
          </SelectTrigger>
          <SelectContent side='top'>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Pagina {currentPage + 1} de {totalPages}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => setPage(0)}
          disabled={currentPage === 0}
        >
          <span className='sr-only'>Go to first page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => setPage(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <span className='sr-only'>Go to last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  </div>
)
}
