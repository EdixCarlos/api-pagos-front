import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { columnsEgresos } from '@/pages/egreso/components/columnsEgresos.tsx'
import { egresoContext } from '@/context/egresoContext.tsx'
import { getEgresos } from '@/services/egresoService.ts'
export default function Tasks() {
const [egresosData, setEgresosData] = useState([]); // Initialize with an empty array
  const fetchEgreso = async () => {
    try {
      const egresos = await getEgresos();
      setEgresosData(egresos.content);
    } catch (error) {
      console.error('Error fetching egresos:', error);
    }
  };
  useEffect(() => {


    fetchEgreso();
  }, []);



  return (
     <egresoContext.Provider value={{ fetchEgreso }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Egresos</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={egresosData} columns={columnsEgresos}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </egresoContext.Provider>

  )
}
