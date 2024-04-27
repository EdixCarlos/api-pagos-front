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
import { PlusIcon, EnterIcon, CaretSortIcon, CheckIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast.ts'
import React, { useContext, useEffect, useState } from 'react'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { getUsuarios } from '@/services/usuariosService.ts'
import { getFormasPago } from '@/services/formaPagoService.ts'
import { getSedes } from '@/services/sedeService.ts'
import { egresoContext } from '@/context/egresoContext.tsx'
import { createEgreso } from '@/services/egresoService.ts'
interface Option {
  value: number;
  label: string;
}
export const AddEgresoDialog = ({ isOpen, setIsOpen }) => {
  const { fetchEgreso } = useContext(egresoContext);
  const methods = useForm()
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const [formaPagoOptions, setFormaPagoOptions] = useState<Option[]>([]);
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    methods.setValue('user', user.id);
  }, [methods]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUsuarios();
      const options = response.map(user => ({
        value: user.id,
        label: user.name,
      }));
      setUserOptions(options);
    };
    const fetchFormaPago = async () => {
      const response = await getFormasPago();
      const options = response.content.map(formaPago => ({
        value: formaPago.id,
        label: formaPago.name,
      }));
      setFormaPagoOptions(options);
    };
    const fetchSedes = async () => {
      const response = await getSedes();
      console.log(response.content)
      const options = response.content.map(sedes => ({
        value: sedes.id,
        label: sedes.nombre,
        icon: QuestionMarkCircledIcon,
      }));
      setSedeOptions(options);
    };
    fetchFormaPago();
    fetchUser();
    fetchSedes();
  }, []);

  const toast = useToast()
  const closeDialog = () => setIsOpen(false)
  const handleAdd = async () => {
    try {
      const egreso = methods.getValues()
      const addEgreso = {
        numRecibo: egreso.numRecibo,
        cantidad: egreso.cantidad,
        concepto: egreso.concepto,
        fechaPago: egreso.fechaPago,
        userId: egreso.user,
        formaPagoId: egreso.formaPago,
        sedeId: egreso.sede,
      }
      await createEgreso(addEgreso)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El egreso se ha añadido correctamente.'
      })
      fetchEgreso()
      closeDialog()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir el egreso.'
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
        <DialogTitle>Agregar Egreso</DialogTitle>
        <Form {...methods}>
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
