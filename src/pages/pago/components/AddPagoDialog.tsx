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
import { getAlumnos } from '@/services/alumnosService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { pagoContext } from '@/context/pagoContext.tsx'
import { createPago } from '@/services/pagoService.ts'
import { getUsuarios } from '@/services/usuariosService.ts'
import { getTipoPagos } from '@/services/tipoPagoService.ts'
import { getFormasPago } from '@/services/formaPagoService.ts'
import { getDeudas } from '@/services/deudasService.ts'
interface Option {
  value: number;
  label: string;
}
export const AddPagoDialog = ({ isOpen, setIsOpen }) => {
  const { fetchPago } = useContext(pagoContext);
  const methods = useForm()
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const [tipoPagoOptions, setTipoPagoOptions] = useState<Option[]>([]);
  const [formaPagoOptions, setFormaPagoOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deudaOptions, setDeudaOptions] = useState<Option[]>([]);
  const [alumnoOptions, setAlumnoOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchDeuda = async () => {
      const response = await getDeudas();
      const options = response.content
      .filter(deuda => deuda.saldoPendiente !== 0)
      .map(deuda => ({
        value: deuda.id,
        label: deuda.alumno.apellidos + ', ' + deuda.alumno.nombres + ' S/.' + deuda.saldoPendiente + ' Venc: ' + deuda.fechaVencimiento,
      }));
      setDeudaOptions(options);
      console.log(options)
    };
    const fetchUser = async () => {
      const response = await getUsuarios();
      const options = response.map(user => ({
        value: user.id,
        label: user.name,
      }));
      setUserOptions(options);
    };
    const fetchTipoPago = async () => {
      const response = await getTipoPagos();
      const options = response.content.map(tipoPago => ({
        value: tipoPago.id,
        label: tipoPago.nombre,
      }));
      setTipoPagoOptions(options);
    };
    const fetchFormaPago = async () => {
      const response = await getFormasPago();
      const options = response.content.map(formaPago => ({
        value: formaPago.id,
        label: formaPago.name,
      }));
      setFormaPagoOptions(options);
    };

    const fetchAlumnos = async () => {
      const response = await getAlumnos();
      const options = response.content.map(alumno => ({
        value: alumno.id,
        label: `${alumno.apellidos}, ${alumno.nombres} `,
      }));
      setAlumnoOptions(options);
    };

    fetchAlumnos();
    fetchFormaPago();
    fetchUser();
    fetchTipoPago();
    fetchDeuda();
  }, []);

  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const pago = methods.getValues()
      const addPago = {
        numRecibo: pago.numRecibo,
        cantidad: pago.cantidad,
        concepto: pago.concepto,
        fechaPago: pago.fechaPago,
        userId: pago.user,
        tipoPagoId: pago.tipoPago,
        formaPagoId: pago.formaPago,
        alumnoId: pago.alumno,
        deudaId: pago.deuda,
      }
      await createPago(addPago)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El pago se ha añadido correctamente.'
      })
      fetchPago()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir el pago.'
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
        <DialogTitle>Agregar pago</DialogTitle>
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
          <FormField name="numRecibo" render={({ field }) => (
            <>
              <FormLabel>Numero recibo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el numero del recibo" />
              </FormControl>
            </>
          )} />
          <FormField name="cantidad" render={({ field }) => (
            <>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la cantidad del pago" />
              </FormControl>
            </>
          )} />
          <FormField name="concepto" render={({ field }) => (
            <>
              <FormLabel>Concepto</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el concepto" />
              </FormControl>
            </>
          )} />
          <FormField name="fechaPago" render={({ field }) => (
            <>
              <FormLabel>Fecha de pago</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la fecha de pago" />
              </FormControl>
            </>
          )} />
          <FormField name="user" render={({ field }) => (
            <>
              <FormLabel>Usuario</FormLabel>
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
                        ? userOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Seleciona el usuario'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {userOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('user', option.value);
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
          <FormField name="tipoPago" render={({ field }) => (
            <>
              <FormLabel>Tipo de Pago</FormLabel>
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
                        ? tipoPagoOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select tipo de pago'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {tipoPagoOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('tipoPago', option.value);
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
          <FormField name="formaPago" render={({ field }) => (
            <>
              <FormLabel>Forma de Pago</FormLabel>
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
                        ? formaPagoOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Selecciona la forma de pago'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {formaPagoOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('formaPago', option.value);
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
          <FormField name="deuda" render={({ field }) => (
            <>
              <FormLabel>Deuda</FormLabel>
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
                        ? deudaOptions.find(
                          (option) => option.value === field.value
                        )?.label
                        : 'Select deuda'}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Command>
                      <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {deudaOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              methods.setValue('deuda', option.value);
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
