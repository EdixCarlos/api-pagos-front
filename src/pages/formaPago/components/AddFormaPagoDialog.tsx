// AddAlumnoDialog.tsx
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/custom/button.tsx'
import { Form, FormField, FormControl, FormLabel } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { PlusIcon, EnterIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast.ts'
import React, { useContext, useEffect, useState } from 'react'
import { createFormaPago } from '@/services/formaPagoService.ts'
import { formaPagoContext } from '@/context/formaPagoContext.tsx'

export const AddFormaPagoDialog = ({ isOpen, setIsOpen }) => {
  const { fetchFormaPago } = useContext(formaPagoContext);
  const methods = useForm()
  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const formaPago = methods.getValues()
      const addFormaPago = {
        name: formaPago.name,
      }
      await createFormaPago(addFormaPago)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La FormaPago se ha añadido correctamente.'
      })
      fetchFormaPago()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la Forma de pago.'
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
        <DialogTitle>Agregar Forma de Pago</DialogTitle>
        <Form {...methods}>
          <FormField name="name" render={({ field }) => (
            <>
              <FormLabel>Nombre Forma de Pago</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre de la forma de pago" />
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
