import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { deudaContext } from '@/context/DeudaContext.tsx'

import { useEffect, useState } from 'react'
import { getDeudas } from '@/services/deudasService.ts'
import { FastFormAlumnos } from '@/components/fastFormAlumnos.tsx'
import { FastFormPagos } from '@/components/fastFormPagos.tsx'
import { columnsDeudas } from '@/pages/deudasOptimizadas/components/columnsDeudas.tsx'
export default function DeudasOptimizadas() {
  const [deudas, setDeudas] = useState<{
    content: any[],
    pageable: any,
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: any,
    first: boolean,
    numberOfElements: number,
    empty: boolean
  }>({
    content: [],
    pageable: {},
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    sort: {},
    first: false,
    numberOfElements: 0,
    empty: false
  });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [alumnoFilter, setAlumnoFilter] = useState<string | undefined>();
  const [sedeIdFilter, setSedeIdFilter] = useState<number | undefined>();
  const [semestreIdFilter, setSemestreIdFilter] = useState<number | undefined>();
  const [vencidoFilter, setVencidoFilter] = useState<boolean | undefined>();

  const fetchDeudas = async () => {
    const data = await getDeudas(page, size, alumnoFilter, sedeIdFilter, semestreIdFilter, vencidoFilter);
    setDeudas(data);
    console.log(data)
  };
  useEffect(() => {
    console.log('llamo a fetchDeudas')

    fetchDeudas();
  }, [page, size, alumnoFilter, sedeIdFilter, semestreIdFilter, vencidoFilter]);



  return (
    <deudaContext.Provider value={{ fetchDeudas }}>

    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <FastFormAlumnos />
        <FastFormPagos />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Deudas</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            data={deudas.content}
            columns={columnsDeudas}
            pageable={deudas.pageable}
            last={deudas.last}
            totalPages={deudas.totalPages}
            totalElements={deudas.totalElements}
            size={deudas.size}
            number={deudas.number}
            sort={deudas.sort}
            first={deudas.first}
            numberOfElements={deudas.numberOfElements}
            empty={deudas.empty}
            setPage={setPage}
            setSize={setSize}
            pageNumber={page}
            sizeNumber={size}
            //filters
            setAlumnoFilter={setAlumnoFilter}
            setSedeIdFilter={setSedeIdFilter}
            setSemestreIdFilter={setSemestreIdFilter}
            setVencidoFilter={setVencidoFilter}
            alumnoFilter={alumnoFilter}
            sedeIdFilter={sedeIdFilter}
            semestreIdFilter={semestreIdFilter}
            vencidoFilter={vencidoFilter}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </deudaContext.Provider>

  )
}
