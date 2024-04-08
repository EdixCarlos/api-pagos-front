// AddAlumnoDialog.tsx
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
import { PlusIcon, EnterIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast.ts'
import { createDeuda } from '@/services/deudasService.ts'
import React, { useContext, useEffect, useState } from 'react'
import { deudaContext } from '@/context/DeudaContext.tsx'
import { createTipoDeuda, getTipoDeudas } from '@/services/tipodeudaService.ts'
import { getAlumnos } from '@/services/alumnosService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { tipoDeudaContext } from '@/context/tipoDeudasContext.tsx'
interface Option {
  value: number;
  label: string;
}
export const AddTipoDeudaDialog = ({ isOpen, setIsOpen }) => {
  const { fetchTipoDeuda } = useContext(tipoDeudaContext);
  const methods = useForm()

  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const tipoDeuda = methods.getValues()
      const addTipoDeuda = {
        nombre: tipoDeuda.nombre,
      }
      await createTipoDeuda(addTipoDeuda)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El tipo deuda se ha añadido correctamente.'
      })
      fetchTipoDeuda()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la deuda.'
      })
    }
    methods.reset()
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsOpen(true)}
          className='h-8 px-2 lg:px-3'>
          <PlusIcon className='mr-2 h-4 w-4' />
          Añadir
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-screen">
        <DialogTitle>Agregar Deuda</DialogTitle>
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
          <Button onClick={() => handleAdd()} variant="outline"
                  size="sm"
                  className="h-8 px-2 lg:px-3">
            <EnterIcon className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </DialogFooter>
        <DialogClose onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
