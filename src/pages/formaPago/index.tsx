import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { useEffect, useState } from 'react'
import { getFormasPago } from '@/services/formaPagoService.ts'
import { formaPagoContext } from '@/context/formaPagoContext.tsx'
import { columnsFormaPago } from '@/pages/formaPago/components/columnsFormaPago.tsx'
export default function FormaPago() {
  const [formaPagoData, setFormaPagoData] = useState([]); // Initialize with an empty array
  const fetchFormaPago = async () => {
    try {
      const formaPago = await getFormasPago();
      setFormaPagoData(formaPago.content);
    } catch (error) {
      console.error('Error fetching formapago:', error);
    }
  };
  useEffect(() => {


    fetchFormaPago();
  }, []);


  return (
    <formaPagoContext.Provider value={{ fetchFormaPago }}>

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
              <h2 className='text-2xl font-bold tracking-tight'>Forma de Pago</h2>
            </div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={formaPagoData} columns={columnsFormaPago}/>
          </div>
        </LayoutBody>
      </Layout>
    </formaPagoContext.Provider>

  )
}
