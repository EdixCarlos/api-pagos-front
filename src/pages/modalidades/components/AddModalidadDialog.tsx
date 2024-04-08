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
import React, { useContext, useEffect, useState } from 'react'
import { modalidadContext } from '@/context/modalidadesContext.tsx'
import { createModalidad } from '@/services/modalidadesService.ts'
interface Option {
  value: number;
  label: string;
}
export const AddModalidadDialog = ({ isOpen, setIsOpen }) => {
  const { fetchModalidad } = useContext(modalidadContext);
  const methods = useForm()


  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const modalidad = methods.getValues()
      const addModalidad = {
        name: modalidad.name,
        descripcion: modalidad.descripcion,
      }
      await createModalidad(addModalidad)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La modalidad se ha añadido correctamente.'
      })
      fetchModalidad()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la modalidad.'
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
        <DialogTitle>Agregar Modalidad</DialogTitle>
        <Form {...methods}>
          <FormField name="name" render={({ field }) => (
            <>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
              </FormControl>
            </>
          )} />
          <FormField name="descripcion" render={({ field }) => (
            <>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la descripcion" />
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
