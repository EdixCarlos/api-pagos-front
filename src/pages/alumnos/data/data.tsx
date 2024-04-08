import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'
import { IconCoins } from '@tabler/icons-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

export const estadoAlumnos = [
  {
    value: 'ACTIVO',
    label: 'ACTIVO',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'INACTIVO',
    label: 'INACTIVO',
    icon: CircleIcon,
  },
]

export const sexos = [
  {
    value: 'MASCULINO',
    label: 'MASCULINO',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'FEMENINO',
    label: 'FEMENINO',
    icon: CircleIcon,
  },
  {
    value: 'OTRO',
    label: 'OTRO',
    icon: CircleIcon,
  },
]

export const roles = [
  {
    value: '1',
    label: 'ADMIN',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: '2',
    label: 'EMPLOYEE',
    icon: CircleIcon,
  },
  {
    value: '3',
    label: 'USER',
    icon: CircleIcon,
  },
]

export const semestres = [
  {
    value: '2024-1',
    label: '2024-1',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'DatoPrueba',
    label: 'DatoPrueba',
    icon: CircleIcon,
  },
  {
    value: 'virtual',
    label: 'virtual',
    icon: CircleIcon,
  },
]
export const grid = [
  {
    value: 'cancelado',
    label: 'Cancelado',
    icon: IconCoins,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]
