import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { carreraContext } from '@/context/carrerasContext.tsx'

import { useEffect, useState } from 'react'
import { columnsCarreras } from '@/pages/carreras/components/columnsCarreras.tsx'
import { getCarreras } from '@/services/carrerasService.ts'
import { FastFormAlumnos } from '@/components/fastFormAlumnos.tsx'
import { FastFormPagos } from '@/components/fastFormPagos.tsx'
export default function Tasks() {
const [carrerasData, setCarrerasData] = useState([]); // Initialize with an empty array
  const fetchCarreras = async () => {
    try {
      const carreras = await getCarreras();
      setCarrerasData(carreras.content);
    } catch (error) {
      console.error('Error fetching carreras:', error);
    }
  };
  useEffect(() => {
    fetchCarreras();
  }, []);



  return (
    <carreraContext.Provider value={{ fetchCarreras }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Carreras</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={carrerasData} columns={columnsCarreras}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </carreraContext.Provider>

  )
}
