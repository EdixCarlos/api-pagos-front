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


interface Option {
  value: number;
  label: string;
}
export const EditCarreraDialog = ({ isOpen, setIsOpen, carrera }) => {
  const { fetchCarreras } = React.useContext(carreraContext);

  const methods = useForm({
    defaultValues: {
      nombre: carrera.nombre,
      numSemestres: carrera.numSemestres,
      sedeId: carrera.sede.id,
    },
  })
  const [searchTerm, setSearchTerm] = useState('');

  const [sedesOptions, setSedesOptions] = useState<Option[]>([]);



  useEffect(() => {

    const fetchSedes = async () => {
      const response = await getSedes();
      const options = response.content.map(sede => ({
        value: sede.id,
        label: sede.nombre,
      }));
      setSedesOptions(options);
    };
    fetchSedes();
  }, []);
  const filteredOptions = sedesOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updatedCarrera = {
        id: carrera.id,
        nombre: formValues.nombre,
        numSemestres: formValues.numSemestres,
        sedeId: formValues.sedeId,
      }
      await updateCarrera(updatedCarrera) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La carrera se ha actualizado correctamente.',
      })
      fetchCarreras()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar la carrera.',
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
        <DialogTitle>Actualizar Carreras</DialogTitle>
        <Form {...methods}>
          <FormField name="nombre" render={({ field }) => (
            <>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el nombre" />
              </FormControl>
            </>
          )} />
          <FormField name="numSemestres" render={({ field }) => (
            <>
              <FormLabel>Numero de semestres</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la cantidad de semestres" />
              </FormControl>
            </>
          )} />
          <FormField name="sedeId" render={({ field }) => (
            <>
              <FormLabel>Sede</FormLabel>
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
                        ? filteredOptions.find(
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
                        {filteredOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('sedeId', option.value);
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
