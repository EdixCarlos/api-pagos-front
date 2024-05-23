import {
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconClipboardData ,
  IconLayoutDashboard,
  IconAB2 ,
  IconVersions ,
  IconBuildingEstate ,
  IconCash,
  IconClock2 ,
  IconAddressBook ,
  IconUsers,
  IconSchool, IconPercentage,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}
export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Tasks',
  //   label: '3',
  //   href: '/tasks',
  //   icon: <IconChecklist size={18} />,
  // },
  {
    title: 'Deudas optimizadas',
    label: '',
    href: '/optimizacion',
    icon: <IconPercentage  size={18} />,
  },
  {
    title: 'Alumnos',
    label: '',
    href: '/alumnos',
    icon: <IconSchool  size={18} />,
  },
  {
    title: 'Deudas',
    label: '',
    href: '/deudas',
    icon: <IconPercentage  size={18} />,
  },
  {
    title: 'Carreras',
    label: '',
    href: '/carreras',
    icon: <IconAddressBook  size={18} />,
  },
  {
    title: 'Forma Pago',
    label: '',
    href: '/forma-pago',
    icon: <IconCash  size={18} />,
  },
  {
    title: 'Horarios',
    label: '',
    href: '/horarios',
    icon: <IconClock2  size={18} />,
  },
  {
    title: 'Modalidades',
    label: '',
    href: '/modalidades',
    icon: <IconVersions   size={18} />,
  },
  {
    title: 'Pagos',
    label: '',
    href: '/pagos',
    icon: <IconCash  size={18} />,
  },
  {
    title: 'Egresos',
    label: '',
    href: '/egresos',
    icon: <IconCash  size={18} />,
  },
  {
    title: 'Sedes',
    label: '9',
    href: '/sedes',
    icon: <IconBuildingEstate   size={18} />,
  },
  {
    title: 'Semestres',
    label: '',
    href: '/semestres',
    icon: <IconAB2   size={18} />,
  },
  {
    title: 'Tipo Deuda',
    label: '9',
    href: '/tipo-deuda',
    icon: <IconPercentage  size={18} />,
  },
  {
    title: 'Tipo Pago',
    label: '9',
    href: '/tipo-pago',
    icon: <IconCash  size={18} />,
  },
  {
    title: 'Matriculas',
    label: '9',
    href: '/matriculas',
    icon: <IconClipboardData   size={18} />,
  },
  {
    title: 'Usuarios',
    label: '9',
    href: '/users',
    icon: <IconUsers  size={18} />,
  },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Users',
  //   label: '',
  //   href: '/users',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/settings',
  //   icon: <IconSettings size={18} />,
  // },
]
