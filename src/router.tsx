import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'

const App = () => {
  const router = createBrowserRouter([
    // Auth routes
    // {
    //   path: '/sign-in',
    //   lazy: async () => ({
    //     Component: (await import('./pages/auth/sign-in')).default,
    //   }),
    // },
    {
      path: '/sign-in',
      lazy: async () => ({
        Component: (await import('./pages/auth/sign-in-2')).default,
      }),
    },
    // {
    //   path: '/sign-up',
    //   lazy: async () => ({
    //     Component: (await import('./pages/auth/sign-up')).default,
    //   }),
    // },
    // {
    //   path: '/forgot-password',
    //   lazy: async () => ({
    //     Component: (await import('./pages/auth/forgot-password')).default,
    //   }),
    // },

    // Main routes

    {
      path: '/',
      lazy: async () => {
        const AppShell = await import('./components/app-shell')
        return { Component: AppShell.default }
      },
      // ...loadRoutes(),
      errorElement: <GeneralError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('./pages/dashboard')).default,
          }),
        },
        // {
        //   path: 'tasks',
        //   lazy: async () => ({
        //     Component: (await import('./pages/tasks')).default,
        //   }),
        // },
        {
          path: 'alumnos',
          lazy: async () => ({
            Component: (await import('@/pages/alumnos/index')).default,
          }),
        },
        {
          path: 'carreras',
          lazy: async () => ({
            Component: (await import('@/pages/carreras/index')).default,
          }),
        },
        {
          path: 'forma-pago',
          lazy: async () => ({
            Component: (await import('@/pages/formaPago/index')).default,
          }),
        },
        {
          path: 'deudas',
          lazy: async () => ({
            Component: (await import('@/pages/deudas/index')).default,
          }),
        },
        {
          path: 'horarios',
          lazy: async () => ({
            Component: (await import('@/pages/horarios/index')).default,
          }),
        },
        {
          path: 'modalidades',
          lazy: async () => ({
            Component: (await import('@/pages/modalidades/index')).default,
          }),
        },
        {
          path: 'pagos',
          lazy: async () => ({
            Component: (await import('@/pages/pago/index')).default,
          }),
        },
        {
          path: 'sedes',
          lazy: async () => ({
            Component: (await import('@/pages/sede/index')).default,
          }),
        },
        {
          path: 'semestres',
          lazy: async () => ({
            Component: (await import('@/pages/semestres/index')).default,
          }),
        },
        {
          path: 'tipo-deuda',
          lazy: async () => ({
            Component: (await import('@/pages/tipoDeudas/index')).default,
          }),
        },
        {
          path: 'tipo-pago',
          lazy: async () => ({
            Component: (await import('@/pages/tipoPagos/index')).default,
          }),
        },
        {
          path: 'matriculas',
          lazy: async () => ({
            Component: (await import('@/pages/matricula/index')).default,
          }),
        },
        {
          path: 'users',
          lazy: async () => ({
            Component: (await import('@/pages/usuarios/index')).default,
          }),
        },
        {
          path: 'analysis',
          lazy: async () => ({
            Component: (await import('@/components/coming-soon')).default,
          }),
        },
        {
          path: 'extra-components',
          lazy: async () => ({
            Component: (await import('@/pages/extra-components')).default,
          }),
        },
        {
          path: 'settings',
          lazy: async () => ({
            Component: (await import('./pages/settings')).default,
          }),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('./pages/settings/profile')).default,
              }),
            },
            {
              path: 'account',
              lazy: async () => ({
                Component: (await import('./pages/settings/account')).default,
              }),
            },
            {
              path: 'appearance',
              lazy: async () => ({
                Component: (await import('./pages/settings/appearance')).default,
              }),
            },
            {
              path: 'notifications',
              lazy: async () => ({
                Component: (await import('./pages/settings/notifications'))
                  .default,
              }),
            },
            {
              path: 'display',
              lazy: async () => ({
                Component: (await import('./pages/settings/display')).default,
              }),
            },
            // {
            //   path: 'error-example',
            //   lazy: async () => ({
            //     Component: (await import('./pages/settings/error-example'))
            //       .default,
            //   }),
            //   errorElement: <GeneralError className='h-[50svh]' minimal />,
            // },
          ],
        },
      ],
    },

    // Error routes
    { path: '/500', Component: GeneralError },
    { path: '/404', Component: NotFoundError },
    { path: '/503', Component: MaintenanceError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;



// export default router
