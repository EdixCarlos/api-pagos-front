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
import { sedeContext } from '@/context/sedeContext.tsx'
import { updateSede } from '@/services/sedeService.ts'



export const EditSedeDialog = ({ isOpen, setIsOpen, sede }) => {
  const { fetchSede } = React.useContext(sedeContext);

  const methods = useForm({
    defaultValues: {
      id: sede.id,
      nombre: sede.nombre,
      direccion: sede.direccion,
      distrito: sede.distrito,
      provincia: sede.provincia,
      departamento: sede.departamento,

      // ...otros campos...
    },
  })
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updateSedes = {
        id: formValues.id,
        nombre: formValues.nombre,
        direccion: formValues.direccion,
        distrito: formValues.distrito,
        provincia: formValues.provincia,
        departamento: formValues.departamento,
      }
      await updateSede(updateSedes) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La sede se ha actualizado correctamente.',
      })
      fetchSede()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar la sede.',
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
        <DialogTitle>Actualizar Sede</DialogTitle>
        <Form {...methods}>
          <FormField name="nombre" render={({ field }) => (
            <>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
              </FormControl>
            </>
          )} />
          <FormField name="direccion" render={({ field }) => (
            <>
              <FormLabel>Direccion</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la direccion" />
              </FormControl>
            </>
          )} />
          <FormField name="distrito" render={({ field }) => (
            <>
              <FormLabel>Distrito</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el distrito" />
              </FormControl>
            </>
          )} />
          <FormField name="provincia" render={({ field }) => (
            <>
              <FormLabel>Provincia</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la provincia" />
              </FormControl>
            </>
          )} />
          <FormField name="departamento" render={({ field }) => (
            <>
              <FormLabel>Departamento</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el departamento" />
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
