import React, { useEffect, useState } from 'react'
import { IconChartArrows, IconChevronsLeft, IconMenu2, IconX,IconPercentage  } from '@tabler/icons-react'
import { Layout, LayoutHeader } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'
import { getLinks } from '@/services/linksService.ts'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar2({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)


  const links = [...sidelinks];

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 shadow md:px-4'>
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 1563 1528"
              className="text-current fill-current"
            >
              <g>
                <path
                  d="M674 68.1c-18.5 1.5-43.1 7.9-59.8 15.5-42.4 19.3-74.7 59.3-84.4 104.7-2.9 13.6-3.1 39.7-.4 53.2 13.2 66.2 66.2 115.1 133.9 123.5 14.1 1.8 41.3.8 55.1-1.9 57.2-11.5 103.8-51.9 119.4-103.6 5.2-17 5.7-20.7 5.7-42 0-15.7-.4-21.8-1.9-28.4-7.2-33-24.8-62.1-50.9-84-26-21.8-55.6-34.1-89.8-37.1-12.5-1.1-13.1-1.1-26.9.1" />
                <path
                  d="M108 303.9c0 1 6.6 7.1 11.5 10.6 8.5 6.2 43.8 35.6 60 50.1 29.7 26.4 79 77.9 110.5 115.4 52.4 62.5 93.1 123.4 127.5 191.5 25.5 50.4 44.3 96.3 63.9 156.5 28.1 85.8 57 208 75.1 317 11.5 69.5 17.3 112.5 24 179 5.7 56.1 12.2 107.7 13.1 104.5.2-.6 7.1-25.8 15.3-56 29-106.3 58.1-196.2 90.6-280 27.2-69.9 46.9-115 69.4-159 79.9-156.2 178.9-265.1 355.1-391 100.4-71.7 185.8-117.3 281.1-150 18.9-6.5 65.2-20.8 85.9-26.5 9.6-2.7 17-4.9 16.4-4.9-.6-.1-13.4 1.7-28.5 3.9-15.1 2.3-41.1 6.1-57.9 8.5s-44.4 6.5-61.5 9c-140 20.7-241.3 32.2-347 39.5-303.8 20.8-561.8-6.5-806-85.3-12.6-4.1-32.4-10.9-44-15.2-34.9-12.8-54.5-19.2-54.5-17.6" />
              </g>
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className="font-medium">Admin Pagos</span>
              <span className="text-xs">Macro Perú</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={links}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
