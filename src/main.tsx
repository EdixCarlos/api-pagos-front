import React from 'react'
import ReactDOM from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
// import router from '@/router'
import '@/index.css'
import App from '@/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
