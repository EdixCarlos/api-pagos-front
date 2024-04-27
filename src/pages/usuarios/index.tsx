import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'

import { useEffect, useState } from 'react'
import { getUsuarios } from '@/services/usuariosService.ts'
import { usuariosContext } from '@/context/usuariosContext.tsx'
import { columnsUsuarios } from '@/pages/usuarios/components/columnsUsuarios.tsx'
import { FastFormAlumnos } from '@/components/fastFormAlumnos.tsx'
import { FastFormPagos } from '@/components/fastFormPagos.tsx'
export default function Tasks() {
const [usuariosData, setUsuariosData] = useState([]); // Initialize with an empty array
  const fetchUsuarios = async () => {
    try {
      const usuarios = await getUsuarios();
      console.log('usuarios:', usuarios)
      setUsuariosData(usuarios);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };
  useEffect(() => {
    fetchUsuarios();
  }, []);
  return (
    <usuariosContext.Provider value={{ fetchUsuarios }}>

    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <FastFormAlumnos />
        <FastFormPagos />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Usuarios</h2>
            {/*<p className='text-muted-foreground'>*/}
            {/*  Here&apos;s a list of your tasks for this month!*/}
            {/*</p>*/}
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={usuariosData} columns={columnsUsuarios}
                      />
        </div>
      </LayoutBody>
    </Layout>
    </usuariosContext.Provider>

  )
}
