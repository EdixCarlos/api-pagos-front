import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { getMatriculas } from '@/services/matriculasService.ts'
import { matriculaContext } from '@/context/matriculaContext'
import { columnsMatricula } from '@/pages/matricula/components/columnsMatricula.tsx'
export default function Matriculas() {
const [matriculasData, setMatriculasData] = useState([]); // Initialize with an empty array
  const fetchMatricula = async () => {
    try {
      const matriculas = await getMatriculas();
      setMatriculasData(matriculas.content);
    } catch (error) {
      console.error('Error fetching matriculas:', error);
    }
  };
  useEffect(() => {


    fetchMatricula();
  }, []);



  return (
    <matriculaContext.Provider value={{ fetchMatricula }}>

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
            <h2 className='text-2xl font-bold tracking-tight'>Matriculas</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={matriculasData} columns={columnsMatricula}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </matriculaContext.Provider>

  )
}
