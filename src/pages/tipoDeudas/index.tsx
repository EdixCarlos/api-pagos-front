import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { getTipoDeudas } from '@/services/tipodeudaService.ts'
import { tipoDeudaContext } from '@/context/tipoDeudasContext.tsx'
import { columnsTipoDeuda } from '@/pages/tipoDeudas/components/columnsTipoDeuda.tsx'
import { FastFormAlumnos } from '@/components/fastFormAlumnos.tsx'
import { FastFormPagos } from '@/components/fastFormPagos.tsx'
export default function Tasks() {
const [tipoDeudaData, setTipoDeudaData] = useState([]); // Initialize with an empty array
  const fetchTipoDeuda = async () => {
    try {
      const tipoDeudas = await getTipoDeudas();
      setTipoDeudaData(tipoDeudas.content);
    } catch (error) {
      console.error('Error fetching tipo de deudas:', error);
    }
  };
  useEffect(() => {
    fetchTipoDeuda();
  }, []);



  return (
    <tipoDeudaContext.Provider value={{ fetchTipoDeuda }}>

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
          <DataTable data={tipoDeudaData} columns={columnsTipoDeuda}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </tipoDeudaContext.Provider>

  )
}
