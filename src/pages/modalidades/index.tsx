import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { modalidadContext } from '@/context/modalidadesContext.tsx'

import { useEffect, useState } from 'react'
import { getModalidades } from '@/services/modalidadesService.ts'
import { columnsModalidades } from '@/pages/modalidades/components/columnsModalidades.tsx'
export default function Modalidades() {
const [modalidadesData, setModalidadesData] = useState([]); // Initialize with an empty array
  const fetchModalidad = async () => {
    try {
      const modalidades = await getModalidades();
      setModalidadesData(modalidades.content);
    } catch (error) {
      console.error('Error fetching modalidades:', error);
    }
  };
  useEffect(() => {
    fetchModalidad();
  }, []);



  return (
    <modalidadContext.Provider value={{ fetchModalidad }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Modalidades</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={modalidadesData} columns={columnsModalidades}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </modalidadContext.Provider>

  )
}
