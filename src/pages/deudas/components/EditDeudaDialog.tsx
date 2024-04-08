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
import { deudaContext } from '@/context/DeudaContext.tsx'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { getTipoDeudas } from '@/services/tipodeudaService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { getAlumnos } from '@/services/alumnosService.ts'
import { updateDeuda } from '@/services/deudasService.ts'
import { estadoDeudas } from '@/pages/deudas/data/data.tsx'


interface Option {
  value: number;
  label: string;
}
export const EditDeudaDialog = ({ isOpen, setIsOpen, deuda, formStructure }) => {
  const { fetchDeudas } = React.useContext(deudaContext);

  const methods = useForm({
    defaultValues: {
      alumno: deuda.alumno.id,
      semestre: deuda.semestre.id,
      tipoDeuda: deuda.tipoDeuda.id,
      montoTotal: deuda.montoTotal,
      saldoPendiente: deuda.saldoPendiente,
      fechaCreacion: deuda.fechaCreacion,
      fechaVencimiento: deuda.fechaVencimiento,
      fechaUltimoPago: deuda.fechaUltimoPago,
      estado: deuda.estado,

      // ...otros campos...
    },
  })
  const [tipoDeudaOptions, setTipoDeudaOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchTipoDeudas = async () => {
      const response = await getTipoDeudas();
      const options = response.content.map(deuda => ({
        value: deuda.id,
        label: deuda.nombre,
      }));
      setTipoDeudaOptions(options);
    };

    fetchTipoDeudas();
  }, []);
  const [alumnoOptions, setAlumnoOptions] = useState<Option[]>([]);
  const [semestreOptions, setSemestreOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await getAlumnos();
      const options = response.content.map(alumno => ({
        value: alumno.id,
        label: `${alumno.apellidos}, ${alumno.nombres} `,
      }));
      setAlumnoOptions(options);
    };

    const fetchSemestres = async () => {
      const response = await getSemestres();
      const options = response.content.map(semestre => ({
        value: semestre.id,
        label: semestre.nombre,
      }));
      setSemestreOptions(options);
    };

    fetchAlumnos();
    fetchSemestres();
  }, []);
  const filteredOptions = tipoDeudaOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    console.log('Editar registro')
    try {
      const formValues = methods.getValues()
      const updatedDeuda = {
        id: deuda.id,
        alumnoId: formValues.alumno,
        semestreId: formValues.semestre,
        montoTotal: formValues.montoTotal,
        saldoPendiente: formValues.saldoPendiente,
        fechaCreacion: formValues.fechaCreacion,
        fechaVencimiento: formValues.fechaVencimiento,
        fechaUltimoPago: formValues.fechaUltimoPago,
        estado: formValues.estado,
        tipoDeudaId: formValues.tipoDeuda,
      }
      await updateDeuda(updatedDeuda) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La deuda se ha actualizado correctamente.',
      })
      fetchDeudas()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar la deuda.',
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
        <DialogTitle>Actualizar Deuda</DialogTitle>
        <Form {...methods}>
          <FormField name="alumno" render={({ field }) => (
            <>
              <FormLabel>Alumno</FormLabel>
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
                        ? alumnoOptions.find(
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
                        {alumnoOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('alumno', option.value);
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
                        ? semestreOptions.find(
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
                        {semestreOptions.map((option) => (
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
          <FormField name="montoTotal" render={({ field }) => (
            <>
              <FormLabel>Monto Total</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el monto total" />
              </FormControl>
            </>
          )} />
          <FormField name="saldoPendiente" render={({ field }) => (
            <>
              <FormLabel>Saldo Pendiente</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el saldo pendiente" />
              </FormControl>
            </>
          )} />
          <FormField name="fechaCreacion" render={({ field }) => (
            <>
              <FormLabel>Fecha de Creación</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la fecha de creación" />
              </FormControl>
            </>
          )} />
          <FormField name="fechaVencimiento" render={({ field }) => (
            <>
              <FormLabel>Fecha de Vencimiento</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la fecha de vencimiento" />
              </FormControl>
            </>
          )} />
          <FormField name="fechaUltimoPago" render={({ field }) => (
            <>
              <FormLabel>Fecha del Último Pago</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la fecha del último pago" />
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
                        ? estadoDeudas.find(
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
                        {estadoDeudas.map((option) => (
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

          <FormField name="tipoDeuda" render={({ field }) => (
            <>
              <FormLabel>Tipo de Deuda</FormLabel>
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
                        ? tipoDeudaOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select tipo de deuda'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {filteredOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('tipoDeuda', option.value);
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
