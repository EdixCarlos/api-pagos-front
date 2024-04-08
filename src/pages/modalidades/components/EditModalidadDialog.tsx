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
import { modalidadContext } from '@/context/modalidadesContext.tsx'
import { updateModalidad } from '@/services/modalidadesService.ts'


interface Option {
  value: number;
  label: string;
}
export const EditModalidadDialog = ({ isOpen, setIsOpen, modalidad, formStructure }) => {
  const { fetchModalidad } = React.useContext(modalidadContext);

  const methods = useForm({
    defaultValues: {
      name: modalidad.name,
      descripcion: modalidad.descripcion,
    },
  })
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updatedDeuda = {
        id: modalidad.id,
        name: formValues.name,
        descripcion: formValues.descripcion,
      }
      await updateModalidad(updatedDeuda)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La modalidad se ha actualizado correctamente.',
      })
      fetchModalidad()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar la modalidad.',
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
        <DialogTitle>Actualizar Modalidad</DialogTitle>
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
