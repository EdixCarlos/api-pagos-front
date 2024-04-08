// EditAlumnoDialog.tsx
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/custom/button.tsx'
import { Form, FormField, FormControl, FormLabel, FormDescription, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { CaretSortIcon, CheckIcon, EnterIcon, PlusIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast.ts'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { getTipoDeudas } from '@/services/tipodeudaService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { getAlumnos } from '@/services/alumnosService.ts'
import { updateFormaPago } from '@/services/formaPagoService.ts'
import { formaPagoContext } from '@/context/formaPagoContext.tsx'


interface Option {
  value: number;
  label: string;
}
export const EditFormaPagoDialog = ({ isOpen, setIsOpen, formaPago }) => {
  const { fetchFormaPago } = React.useContext(formaPagoContext);

  const methods = useForm({
    defaultValues: {
      name: formaPago.name,

    },
  })
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {s
      const formValues = methods.getValues()
      const updatedFormaPago = {
        id: formaPago.id,
        name: formValues.name,
      }
      await updateFormaPago(updatedFormaPago) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La forma de pago se ha actualizado correctamente.',
      })
      fetchFormaPago()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar la forma de pago.',
      })
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="overflow-auto max-h-screen">
        <DialogTitle>Actualizar Forma de pago</DialogTitle>
        <Form {...methods}>
          <FormField name="name" render={({ field }) => (
            <>
              <FormLabel>nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre de la forma de pago" />
              </FormControl>
            </>
          )} />
        </Form>
        <DialogFooter>
          <Button onClick={() => handleEdit()} variant="outline"
                  size="sm"
                  className="h-8 px-2 lg:px-3">
            <EnterIcon className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
        </DialogFooter>
        <DialogClose onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
