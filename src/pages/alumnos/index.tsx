import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { alumnosContext } from '@/context/alumnosContext.tsx'

import { useEffect, useState } from 'react'
import { getAlumnos } from '@/services/alumnosService.ts'
import { columnsAlumnos } from '@/pages/alumnos/components/columnsAlumnos.tsx'
export default function Tasks() {
const [alumnosData, setAlumnosData] = useState([]); // Initialize with an empty array

  const fetchAlumnos = async () => {
    try {
      const alumnos = await getAlumnos();
      setAlumnosData(alumnos.content);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };
  useEffect(() => {


    fetchAlumnos();
  }, []);



  return (
    <alumnosContext.Provider value={{ fetchAlumnos }}>

    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Alumnos</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={alumnosData} columns={columnsAlumnos}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </alumnosContext.Provider>

  )
}
