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
import { updateCarrera } from '@/services/carrerasService.ts'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { carreraContext } from '@/context/carrerasContext.tsx'
import { getSedes } from '@/services/sedeService.ts'
import { createSemestreInCarrera } from '@/services/semestresService.ts'


interface Option {
  value: number;
  label: string;
}
export const CrearCicloDialog = ({ isOpen, setIsOpen, carrera }) => {
  const { fetchCarreras } = React.useContext(carreraContext);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() devuelve un valor de 0-11, por lo que añadimos 1 para obtener un valor de 1-12
  const periodo = currentMonth <= 6 ? `${currentYear}-1` : `${currentYear}-2`;
  const methods = useForm({
    defaultValues: {
      periodo: periodo,
      horario: "8-11-LMV",
      ciclo: 1,
    },
  })

  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleCreateSemestre = async () => {
    try {
      const formValues = methods.getValues()
      const newCiclo = {
        carreraId: carrera.id,
        periodo: formValues.periodo,
        horario: formValues.horario,
        ciclo: formValues.ciclo,
      }
      await createSemestreInCarrera(newCiclo)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El ciclo se ha creado correctamente.',
      })
      fetchCarreras()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al crear el ciclo.',
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
        <DialogTitle>Crear Semestre desde Carrera</DialogTitle>
        <Form {...methods}>
          <FormField name="periodo" render={({ field }) => (
            <>
              <FormLabel>Periodo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el Periodo" />
              </FormControl>
              <FormDescription>
                Formato: 2022-1 o 2022-2
              </FormDescription>
            </>
          )} />
          <FormField name="horario" render={({ field }) => (
            <>
              <FormLabel>Horario</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el horario" />
              </FormControl>
              <FormDescription>
                Formato: 8-11-LMV sin espacios y con guiones. Los dos primeros son números y luego pueden ir letras mayúsculas hasta 7 letras.
              </FormDescription>
            </>
          )} />
          <FormField name="ciclo" render={({ field }) => (
            <>
              <FormLabel>Ciclo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el ciclo" />
              </FormControl>
              <FormDescription>
                Formato: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
              </FormDescription>
            </>
          )} />
        </Form>
        <DialogFooter>
          <Button onClick={() => handleCreateSemestre()} variant="outline"
                  size="sm"
                  className="h-8 px-2 lg:px-3">
            <EnterIcon className="mr-2 h-4 w-4" />
            Crear
          </Button>
        </DialogFooter>
        <DialogClose onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
