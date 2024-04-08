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
import { getSemestres } from '@/services/semestresService.ts'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { horariosContext } from '@/context/horariosContext.tsx'
import { createHorario } from '@/services/horariosService.ts'
interface Option {
  value: number;
  label: string;
}
export const AddHorarioDialog = ({ isOpen, setIsOpen }) => {
  const { fetchHorarios } = useContext(horariosContext);
  const [semestresOptions, setSemestresOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alumnoOptions, setAlumnoOptions] = useState<Option[]>([]);
  const methods = useForm()

  useEffect(() => {
    const fetchSemestres = async () => {
      const response = await getSemestres();
      const options = response.content.map(semestres => ({
        value: semestres.id,
        label: semestres.nombre,
      }));
      setSemestresOptions(options);
    };


    fetchSemestres();
  }, []);
  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const horario = methods.getValues()
      const addHorario = {
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        semestreId: horario.semestre,
      }
      await createHorario(addHorario)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El Horario se ha añadido correctamente.'
      })
      fetchHorarios()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir el horario.'
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
        <DialogTitle>Agregar Horario</DialogTitle>
        <Form {...methods}>
          <FormField name="dia" render={({ field }) => (
            <>
              <FormLabel>Dia</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el dia" />
              </FormControl>
            </>
          )} />
          <FormField name="horaInicio" render={({ field }) => (
            <>
              <FormLabel>Hora Inicio</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la hora de inicio" />
              </FormControl>
            </>
          )} />
          <FormField name="horaFin" render={({ field }) => (
            <>
              <FormLabel>Hora Fin</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la hora de fin" />
              </FormControl>
            </>
          )} />
          <FormField name="semestre" render={({ field }) => (
            <>
              <FormLabel>Semestre</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-auto justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? semestresOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select semestre'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                  >
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {semestresOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('semestre', option.value);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                option.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
