import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { labels } from '../data/data'
import { taskSchema } from '../data/schema'
import { deudaSchema } from '@/pages/tasks/data/deudaSchema.ts'
import React, { useState } from 'react'
import { EditRecordDialog } from '@/components/custom/EditRecordDialog.tsx'
import { deleteDeuda } from '@/services/deudasService.ts'
import { useToast } from '@/components/ui/use-toast.ts'
import { deudaContext } from '@/context/DeudaContext.tsx'
interface IData {
  id: number;
  // otras propiedades...
}
interface DataTableRowActionsProps<TData extends IData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends IData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { fetchDeudas } = React.useContext(deudaContext);

  const toast = useToast()

  const deuda = deudaSchema.parse(row.original)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteDeuda(row.original.id);
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La deuda se ha eliminado correctamente.',
      })
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al eliminar la deuda.',
      })
      console.error('Error deleting deuda:', error);
    }
    fetchDeudas()
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Editar
          <DropdownMenuShortcut>Shift+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        {/*<DropdownMenuItem>Make a copy</DropdownMenuItem>*/}
        {/*<DropdownMenuItem>Favorite</DropdownMenuItem>*/}
        {/*<DropdownMenuSeparator />*/}
        {/*<DropdownMenuSub>*/}
        {/*  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>*/}
        {/*  <DropdownMenuSubContent>*/}
        {/*    <DropdownMenuRadioGroup value={deuda.alumno.nombres}>*/}
        {/*      {labels.map((label) => (*/}
        {/*        <DropdownMenuRadioItem key={label.value} value={label.value}>*/}
        {/*          {label.label}*/}
        {/*        </DropdownMenuRadioItem>*/}
        {/*      ))}*/}
        {/*    </DropdownMenuRadioGroup>*/}
        {/*  </DropdownMenuSubContent>*/}
        {/*</DropdownMenuSub>*/}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isEditDialogOpen && (
        <EditRecordDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          deuda={deuda}
        />
      )}
    </DropdownMenu>
  )
}
