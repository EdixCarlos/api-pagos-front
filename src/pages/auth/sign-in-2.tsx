import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import authService from '@/services/authService.ts'


export default function SignIn2() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const isExpired = await authService.isTokenExpired()
      if (!isExpired) {
        navigate('/')
      }
    }

    checkToken()
  }, [navigate])

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 1563 1528"
            >
              <g fill="#FFF">
                <path
                  d="M674 68.1c-18.5 1.5-43.1 7.9-59.8 15.5-42.4 19.3-74.7 59.3-84.4 104.7-2.9 13.6-3.1 39.7-.4 53.2 13.2 66.2 66.2 115.1 133.9 123.5 14.1 1.8 41.3.8 55.1-1.9 57.2-11.5 103.8-51.9 119.4-103.6 5.2-17 5.7-20.7 5.7-42 0-15.7-.4-21.8-1.9-28.4-7.2-33-24.8-62.1-50.9-84-26-21.8-55.6-34.1-89.8-37.1-12.5-1.1-13.1-1.1-26.9.1" />
                <path
                  d="M108 303.9c0 1 6.6 7.1 11.5 10.6 8.5 6.2 43.8 35.6 60 50.1 29.7 26.4 79 77.9 110.5 115.4 52.4 62.5 93.1 123.4 127.5 191.5 25.5 50.4 44.3 96.3 63.9 156.5 28.1 85.8 57 208 75.1 317 11.5 69.5 17.3 112.5 24 179 5.7 56.1 12.2 107.7 13.1 104.5.2-.6 7.1-25.8 15.3-56 29-106.3 58.1-196.2 90.6-280 27.2-69.9 46.9-115 69.4-159 79.9-156.2 178.9-265.1 355.1-391 100.4-71.7 185.8-117.3 281.1-150 18.9-6.5 65.2-20.8 85.9-26.5 9.6-2.7 17-4.9 16.4-4.9-.6-.1-13.4 1.7-28.5 3.9-15.1 2.3-41.1 6.1-57.9 8.5s-44.4 6.5-61.5 9c-140 20.7-241.3 32.2-347 39.5-303.8 20.8-561.8-6.5-806-85.3-12.6-4.1-32.4-10.9-44-15.2-34.9-12.8-54.5-19.2-54.5-17.6" />
              </g>
            </svg> {"   "}
            <h1 className='text-xl font-medium'>Pagos Admin</h1>
          </div>
          <Card className='p-6'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Iniciar Sesion</h1>
              <p className='text-sm text-muted-foreground'>
                Ingresa tu correo y contraseña <br />
                para acceder a tu cuenta
              </p>
            </div>
            <UserAuthForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              Por hacer clic en Iniciar sesión, aceptas nuestros{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terminos de servicio
              </a>{' '}
              y{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Politicas de Privacidad
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
