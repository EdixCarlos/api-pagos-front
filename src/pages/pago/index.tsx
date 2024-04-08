import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { columnsPagos } from '@/pages/pago/components/columnsPagos.tsx'
import { getPagos } from '@/services/pagoService.ts'
import { pagoContext } from '@/context/pagoContext.tsx'
export default function Tasks() {
const [pagosData, setPagosData] = useState([]); // Initialize with an empty array
  const fetchPago = async () => {
    try {
      const pagos = await getPagos();
      setPagosData(pagos.content);
    } catch (error) {
      console.error('Error fetching pagos:', error);
    }
  };
  useEffect(() => {


    fetchPago();
    console.log('pagosData', pagosData);
  }, []);



  return (
     <pagoContext.Provider value={{ fetchPago }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Pagos</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={pagosData} columns={columnsPagos}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </pagoContext.Provider>

  )
}
