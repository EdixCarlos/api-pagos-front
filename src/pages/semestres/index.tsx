import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { getSemestres } from '@/services/semestresService.ts'
import { semestreContext } from '@/context/semestresContext.tsx'
import { columnsSemestres } from '@/pages/semestres/components/columnsSemestres.tsx'
export default function Tasks() {
const [semestresData, setSemestresData] = useState([]); // Initialize with an empty array
  const fetchSemestre = async () => {
    try {
      const semestres = await getSemestres();
      setSemestresData(semestres.content);
    } catch (error) {
      console.error('Error fetching semestres:', error);
    }
  };
  useEffect(() => {


    fetchSemestre();
  }, []);



  return (
    <semestreContext.Provider value={{ fetchSemestre }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Semestres</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={semestresData} columns={columnsSemestres}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </semestreContext.Provider>

  )
}
