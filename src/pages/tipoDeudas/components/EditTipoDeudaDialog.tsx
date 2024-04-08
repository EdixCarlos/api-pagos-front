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
import { updateCarrera } from '@/services/deudasService.ts'
import { deudaContext } from '@/context/DeudaContext.tsx'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { getTipoDeudas, updateTipoDeuda } from '@/services/tipodeudaService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { getAlumnos } from '@/services/alumnosService.ts'
import { tipoDeudaContext } from '@/context/tipoDeudasContext.tsx'


interface Option {
  value: number;
  label: string;
}
export const EditTipoDeudaDialog = ({ isOpen, setIsOpen, tipoDeuda}) => {
  const { fetchTipoDeuda } = React.useContext(tipoDeudaContext);

  const methods = useForm({
    defaultValues: {
      nombre: tipoDeuda.nombre,
    },
  })

  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updatedTipoDeuda = {
        id: tipoDeuda.id,
        nombre: formValues.nombre,
      }
      await updateTipoDeuda(updatedTipoDeuda) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El tipo deuda se ha actualizado correctamente.',
      })
      fetchTipoDeuda()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar el tipo deuda.',
      })
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="h-8 px-2 lg:px-3">
          <PlusIcon className="mr-2 h-4 w-4" />
          Enviar
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-screen">
        <DialogTitle>Actualizar Deuda</DialogTitle>
        <Form {...methods}>
          <FormField name="nombre" render={({ field }) => (
            <>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
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
