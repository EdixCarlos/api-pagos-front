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
import { sedeContext } from '@/context/sedeContext.tsx'
import { createSede } from '@/services/sedeService.ts'
interface Option {
  value: number;
  label: string;
}
export const AddSedeDialog = ({ isOpen, setIsOpen }) => {
  const { fetchSede } = useContext(sedeContext);
  const methods = useForm()


  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const sede = methods.getValues()
      const addSede = {
        nombre: sede.nombre,
        direccion: sede.direccion,
        distrito: sede.distrito,
        provincia: sede.provincia,
        departamento: sede.departamento,
      }
      await createSede(addSede)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La sede se ha añadido correctamente.'
      })
      fetchSede()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la sede.'
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
        <DialogTitle>Agregar Sede</DialogTitle>
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
