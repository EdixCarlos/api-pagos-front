import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


import React, { useState } from 'react'

import { useToast } from '@/components/ui/use-toast.ts'
import { formaPagoContext } from '@//context/formaPagoContext.tsx'
import { EditFormaPagoDialog } from '@/pages/formaPago/components/EditFormaPagoDialog.tsx'
import { deleteFormaPago } from '@/services/formaPagoService.ts'
import { formaPagoSchema } from '@/domain/formaPagoSchema.ts'
interface IData {
  id: number;
}
interface DataTableRowActionsProps<TData extends IData> {
  row: Row<TData>;
}

export function DataTableRowActionsFormaPago<TData extends IData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { fetchFormaPago } = React.useContext(formaPagoContext);

  const toast = useToast()

  const formaPago = formaPagoSchema.parse(row.original)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteFormaPago(row.original.id);
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La forma de pago se ha eliminado correctamente.',
      })
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al eliminar la forma de pago.',
      })
      console.error('Error deleting forma de pago:', error);
    }
    fetchFormaPago()
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

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isEditDialogOpen && (
        <EditFormaPagoDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          formaPago={formaPago}
        />
      )}
    </DropdownMenu>
  )
}
