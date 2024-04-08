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
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { getModalidades } from '@/services/modalidadesService.ts'
import { getCarreras } from '@/services/carrerasService.ts'
import { semestreContext } from '@/context/semestresContext.tsx'
import { createSede } from '@/services/sedeService.ts'
import { createSemestre } from '@/services/semestresService.ts'
import { estadoDeudas } from '@/pages/deudas/data/data.tsx'
import { estadoSemestres } from '@/pages/semestres/data/data.tsx'
interface Option {
  value: number;
  label: string;
}
export const AddSemestreDialog = ({ isOpen, setIsOpen }) => {
  const { fetchSemestre } = useContext(semestreContext);
  const methods = useForm()
  const [searchTerm, setSearchTerm] = useState('');
  const [modalidadesOptions, setModalidadesOptions] = useState<Option[]>([]);
  const [carrerasOptions, setCarrerasOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchModalidades = async () => {
      const response = await getModalidades();
      const options = response.content.map(modalidad => ({
        value: modalidad.id,
        label: modalidad.name,
      }));
      setModalidadesOptions(options);
    };

    const fetchCarreras = async () => {
      const response = await getCarreras();
      const options = response.content.map(carrera => ({
        value: carrera.id,
        label: carrera.nombre,
      }));
      setCarrerasOptions(options);
    };

    fetchModalidades();
    fetchCarreras();
  }, []);
  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const semestre = methods.getValues()
      const addSemestre = {
        nombre: semestre.nombre,
        mensualidades: semestre.mensualidades,
        modalidadId: semestre.modalidad,
        carreraId: semestre.carrera,
        num: semestre.num,
        costoMatricula: semestre.costoMatricula,
        costoMensualidad: semestre.costoMensualidad,
        estado: semestre.estado,
      }
      await createSemestre(addSemestre)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La semestre se ha añadido correctamente.'
      })
      fetchSemestre()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la semestre.'
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
        <DialogTitle>Agregar Semestre</DialogTitle>
        <Form {...methods}>
          <FormField name="nombre" render={({ field }) => (
            <>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
              </FormControl>
            </>
          )} />
          <FormField name="mensualidades" render={({ field }) => (
            <>
              <FormLabel>Mensualidad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la mensualidades" />
              </FormControl>
            </>
          )} />
          <FormField name="estado" render={({ field }) => (
            <>
              <FormLabel>Estado</FormLabel>
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
                        ? estadoSemestres.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select estado'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {estadoSemestres.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('estado', option.value);
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

          <FormField name="modalidad" render={({ field }) => (
            <>
              <FormLabel>Modalidad</FormLabel>
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
                        ? modalidadesOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select modalidad'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {modalidadesOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('modalidad', option.value);
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
          <FormField name="carrera" render={({ field }) => (
            <>
              <FormLabel>Carrera</FormLabel>
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
                        ? carrerasOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select carrera'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {carrerasOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('carrera', option.value);
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
          <FormField name="num" render={({ field }) => (
            <>
              <FormLabel>Numero de Semestre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el numero" />
              </FormControl>
            </>
          )} />
          <FormField name="costoMatricula" render={({ field }) => (
            <>
              <FormLabel>Costo Matricula</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el costo" />
              </FormControl>
            </>
          )} />
          <FormField name="costoMensualidad" render={({ field }) => (
            <>
              <FormLabel>Costo Mensualidad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el costo" />
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
