import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { columnsDeudas } from '@/pages/tasks/components/deudas/columnsDeudas.tsx'
import { getHorarios } from '@/services/horariosService.ts'
import { horariosContext } from '@/context/horariosContext'
import { columnsHorarios } from '@/pages/horarios/components/columnsHorarios.tsx'
export default function Tasks() {
const [horariosData, setHorariosData] = useState([]); // Initialize with an empty array
  const fetchHorarios = async () => {
    try {
      const horarios = await getHorarios();
      setHorariosData(horarios.content);
    } catch (error) {
      console.error('Error fetching horarios:', error);
    }
  };
  useEffect(() => {
    fetchHorarios();
  }, []);
  return (
    <horariosContext.Provider value={{ fetchHorarios }}>
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
            <h2 className='text-2xl font-bold tracking-tight'>Horarios</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={horariosData} columns={columnsHorarios}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </horariosContext.Provider>

  )
}
