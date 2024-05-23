import { Cross2Icon, PlusIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { useEffect, useState } from 'react'
import { AddDeudaDialog } from '@/pages/deudas/components/AddDeudaDialog.tsx'
import { getSedes } from '@/services/sedeService.ts'
import { getDeudas } from '@/services/deudasService.ts'
import { getAlumnos } from '@/services/alumnosService.ts'
import { getSemestres } from '@/services/semestresService.ts'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  setAlumnoFilter: (value: string | undefined) => void
  setSedeIdFilter: (value: number | undefined) => void
  setSemestreIdFilter: (value: number | undefined) => void
  setVencidoFilter: (value: boolean | undefined) => void
  alumnoFilter: string | undefined
  sedeIdFilter: number | undefined
  semestreIdFilter: number | undefined
  vencidoFilter: boolean | undefined
}
interface Option {
  value: number;
  label: string;
  icon?: any;
}
export function DataTableToolbar<TData>({
  table,
  setAlumnoFilter,
  setSedeIdFilter,
  setSemestreIdFilter,
  setVencidoFilter,
  alumnoFilter,
  sedeIdFilter,
  semestreIdFilter,
  vencidoFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = alumnoFilter !== undefined || sedeIdFilter !== undefined || semestreIdFilter !== undefined || vencidoFilter !== undefined;
  const [isOpen, setIsOpen] = useState(false)
  const [semestreOptions, setSemestreOptions] = useState<Option[]>([]);
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);
  const fetchSedes = async () => {
    const response = await getSedes();
    const options = response.content.map(data => ({
      value: data.id,
      label: data.nombre,
    }));
    setSedeOptions(options);
  };
  useEffect(() => {
    fetchSedes();

  }, []);
  const fetchSemestres = async () => {
    const response = await getSemestres();
    const options = response.content.map(semestre => ({
      value: semestre.nombre,
      label: semestre.nombre,
      icon: QuestionMarkCircledIcon,
    }));
    setSemestreOptions(options);
  };
  useEffect(() => {
    fetchSemestres();
  }, [])

  const fechaVencimientoOptions = [
    { value: true, label: 'Vencidas' },
    { value: false, label: 'No Vencidas' },
  ];
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filtrar por alumno'
          value={(table.getColumn('alumno')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('alumno')?.setFilterValue(event.target.value);
            setAlumnoFilter(event.target.value);
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className="flex gap-x-2">
          {table.getColumn('sede') && (
            <DataTableFacetedFilter
              key={resetKey} // Change this line
              column={table.getColumn('sede')}
              title="Sede"
              options={sedeOptions}
              onChange={setSedeIdFilter}
              alumnoFilter={alumnoFilter}
              sedeIdFilter={sedeIdFilter}
              semestreIdFilter={semestreIdFilter}
              vencidoFilter={vencidoFilter}
            />
          )}

        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setAlumnoFilter(undefined);
              setSedeIdFilter(undefined);
              setSemestreIdFilter(undefined);
              setVencidoFilter(undefined);
              setResetKey(prevKey => prevKey + 1); // Add this line

            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <AddDeudaDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
