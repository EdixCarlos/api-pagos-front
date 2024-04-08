import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { deudaContext } from '@/context/DeudaContext.tsx'

import { useEffect, useState } from 'react'
import { getTipoPagos } from '@/services/tipoPagoService.ts'
import { tipoPagoContext } from '@/context/tipoPagosContext.tsx'
import { columnsTipoPago } from '@/pages/tipoPagos/components/columnsTipoPago.tsx'
export default function Tasks() {
const [deudasData, setDeudasData] = useState([]); // Initialize with an empty array
  const fetchTipoPago = async () => {
    try {
      const tipoPagos = await getTipoPagos();
      setDeudasData(tipoPagos.content);
    } catch (error) {
      console.error('Error fetching tipo de pagos:', error);
    }
  };
  useEffect(() => {


    fetchTipoPago();
  }, []);



  return (
    <tipoPagoContext.Provider value={{ fetchTipoPago }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Tipo de pagos</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={deudasData} columns={columnsTipoPago}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </tipoPagoContext.Provider>

  )
}
