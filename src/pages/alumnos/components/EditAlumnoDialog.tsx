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
import { alumnosContext } from '@/context/alumnosContext.tsx'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { getSedes } from '@/services/sedeService.ts'
import { updateAlumno } from '@/services/alumnosService.ts'
import { estadoAlumnos, sexos } from '@/pages/alumnos/data/data.tsx'
import MaskedInput from 'react-text-mask';


interface Option {
  value: number;
  label: string;
}
export const EditAlumnoDialog = ({ isOpen, setIsOpen, alumno, formStructure }) => {
  const { fetchAlumnos } = React.useContext(alumnosContext);

  const methods = useForm({
    defaultValues: {
      codigo: alumno.codigo,
      apellidos: alumno.apellidos,
      nombres: alumno.nombres,
      sexo: alumno.sexo,
      fechaNacimiento: alumno.fechaNacimiento,
      celular: alumno.celular,
      telefono: alumno.telefono,
      dni: alumno.dni,
      direccion: alumno.direccion,
      distrito: alumno.distrito,
      provincia: alumno.provincia,
      departamento: alumno.departamento,
      sede: alumno.sede.id,
      estado: alumno.estado,
    },
  })
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchSedes = async () => {
      const response = await getSedes();
      const options = response.content.map(data => ({
        value: data.id,
        label: data.nombre,
      }));
      setSedeOptions(options);
    };
    fetchSedes();
  }, []);

  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updatedAlumno = {
        id: alumno.id,
        codigo: formValues.codigo,
        apellidos: formValues.apellidos,
        nombres: formValues.nombres,
        sexo: formValues.sexo,
        fechaNacimiento: formValues.fechaNacimiento,
        celular: formValues.celular,
        telefono: formValues.telefono,
        dni: formValues.dni,
        direccion: formValues.direccion,
        distrito: formValues.distrito,
        provincia: formValues.provincia,
        departamento: formValues.departamento,
        sedeId: formValues.sede,
        estado: formValues.estado,
      }
      await updateAlumno(updatedAlumno) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El Alumno se ha actualizado correctamente.',
      })
      fetchAlumnos()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar el Alumno.',
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
        <DialogTitle>Actualizar Alumno</DialogTitle>
        <Form {...methods}>
          <FormField name="codigo" render={({ field }) => (
            <>
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el codigo" />
              </FormControl>
            </>
          )} />
          <FormField name="apellidos" render={({ field }) => (
            <>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa los apellidos" />
              </FormControl>
            </>
          )} />
          <FormField name="nombres" render={({ field }) => (
            <>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa los nombres" />
              </FormControl>
            </>
          )} />
          <FormField name="sexo" render={({ field }) => (
            <>
              <FormLabel>sexo</FormLabel>
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
                        ? sexos.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select usuario'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {sexos.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('sexo', option.value);
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
          <FormField name="fechaNacimiento" render={({ field }) => (
            <>
              <FormLabel>Fecha nacimiento</FormLabel>
              <FormControl>
                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                  guide={false}
                  placeholder="yyyy-mm-dd"
                  {...field}
                  render={(ref, props) => <Input ref={ref} {...props} />}
                />
              </FormControl>
            </>
          )} />
          <FormField name="celular" render={({ field }) => (
            <>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el celular" />
              </FormControl>
            </>
          )} />
          <FormField name="telefono" render={({ field }) => (
            <>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el telefono" />
              </FormControl>
            </>
          )} />
          <FormField name="dni" render={({ field }) => (
            <>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el DNI" />
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
                <Input {...field} placeholder="Ingresa la fecha del último pago" />
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
          <FormField name="sede" render={({ field }) => (
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
                        ? sedeOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select alumno'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {sedeOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('sede', option.value);
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
                        ? estadoAlumnos.find(
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
                        {estadoAlumnos.map((option) => (
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
