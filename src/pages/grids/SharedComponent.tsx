import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { useEffect, useState } from 'react'
import { getDeudas } from '@/services/deudasService.ts'
import { columnsDeudas } from '@/pages/tasks/components/deudas/columnsDeudas.tsx'
import { DataTableDeudas } from '@/pages/tasks/components/data-table-deudas.tsx'


export default function SharedComponent(

                                        ) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDeudas();
      setData(result.content); // Extrae el array de la propiedad 'content'
      setLoading(false);
    };
    fetchData();
  }, [getDeudas]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {/*<DataTableDeudas data={data} columns={columnsCarreras} />*/}
        </div>
      </LayoutBody>
    </Layout>
  )
}
