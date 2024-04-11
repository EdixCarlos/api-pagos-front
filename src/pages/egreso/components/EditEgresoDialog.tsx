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
import { CaretSortIcon, CheckIcon, EnterIcon, PlusIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast.ts'
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { getUsuarios } from '@/services/usuariosService.ts'
import { getFormasPago } from '@/services/formaPagoService.ts'
import { egresoContext } from '@/context/egresoContext.tsx'
import { getSedes } from '@/services/sedeService.ts'
import { updateEgreso } from '@/services/egresoService.ts'


interface Option {
  value: number;
  label: string;
}
export const EditEgresoDialog = ({ isOpen, setIsOpen, pago }) => {
  const { fetchEgreso } = React.useContext(egresoContext);
  const methods = useForm({

    defaultValues: {
      numRecibo: pago.numRecibo,
      cantidad: pago.cantidad,
      concepto: pago.concepto,
      fechaPago: pago.fechaPago,
      user: pago.user.id,
      formaPago: pago.formaPago.id,
      sede: pago.sede.id,
    },
  })
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const [formaPagoOptions, setFormaPagoOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);

  const fetchSedes = async () => {
    const response = await getSedes();
    const options = response.content.map(sedes => ({
      value: sedes.id,
      label: sedes.nombre,
      icon: QuestionMarkCircledIcon,
    }));
    setSedeOptions(options);
  };
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
    fetchSedes();
    fetchFormaPago();
    fetchUser();
  }, []);
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    try {
      const formValues = methods.getValues()
      const updatedEgreso = {
        id: pago.id,
        numRecibo: formValues.numRecibo,
        cantidad: formValues.cantidad,
        concepto: formValues.concepto,
        fechaPago: formValues.fechaPago,
        userId: formValues.user,
        formaPagoId: formValues.formaPago,
        sedeId: formValues.sede,
      }
      await updateEgreso(updatedEgreso) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El egreso se ha actualizado correctamente.',
      })
      fetchEgreso()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar el egreso.',
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
        <DialogTitle>Actualizar Egreso</DialogTitle>
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
