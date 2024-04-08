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
import React, { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { usuariosContext } from '@/context/usuariosContext.tsx'
import { getUsuarios, updateUsuario } from '@/services/usuariosService.ts'
import { getSedes } from '@/services/sedeService.ts'
import { roles, semestres, sexos } from '@/pages/alumnos/data/data.tsx'
import { estadoUsuarios } from '@/pages/usuarios/data/data.tsx'


interface Option {
  value: number;
  label: string;
}
export const EditUsuarioDialog = ({ isOpen, setIsOpen, usuario }) => {
  const { fetchUsuarios } = React.useContext(usuariosContext);

  const methods = useForm({
    defaultValues: {
      username: usuario.username,
      password: usuario.password,
      email: usuario.email,
      sexo: usuario.sexo,
      phone: usuario.phone,
      name: usuario.name,
      dni: usuario.dni,
      direccion: usuario.direccion,
      sede: usuario.sede.id,
      estado: usuario.estado,
      roles: usuario.roles,
      admin: usuario.admin,
    },
  })
  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchSedes = async () => {
      const response = await getSedes();
      const options = response.content.map(sede => ({
        value: sede.id,
        label: sede.nombre,
      }));
      setSedeOptions(options);
    };

    fetchSedes();
  }, []);
  const toast = useToast()

  const closeDialog = () => setIsOpen(false)

  const handleEdit = async () => {
    try {
      const formValues = methods.getValues()
      const updatedDeuda = {
        id: usuario.id,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        sexo: formValues.sexo,
        phone: formValues.phone,
        name: formValues.name,
        dni: formValues.dni,
        direccion: formValues.direccion,
        sedeId: formValues.sede,
        estado: formValues.estado,
        roles: formValues.roles,
        admin: formValues.admin,
      }
      await updateUsuario(updatedDeuda) // Asegúrate de tener una función para actualizar el registro
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El usuario se ha actualizado correctamente.',
      })
      fetchUsuarios()
      closeDialog()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al actualizar el usuario.',
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
        <DialogTitle>Actualizar Usuario</DialogTitle>
        <Form {...methods}>
          <FormField name="username" render={({ field }) => (
            <>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el username" />
              </FormControl>
            </>
          )} />
          <FormField name="email" render={({ field }) => (
            <>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el email" />
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
                        : 'Select tipo de deuda'}
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

          <FormField name="phone" render={({ field }) => (
            <>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el phone" />
              </FormControl>
            </>
          )} />
          <FormField name="name" render={({ field }) => (
            <>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el name" />
              </FormControl>
            </>
          )} />
          <FormField name="dni" render={({ field }) => (
            <>
              <FormLabel>dni</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el dni" />
              </FormControl>
            </>
          )} />
          <FormField name="direccion" render={({ field }) => (
            <>
              <FormLabel>direccion</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la direccion" />
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
                        ? estadoUsuarios.find(
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
                        {estadoUsuarios.map((option) => (
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

          <FormField name="password" render={({ field }) => (
            <>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa la nueva contraseña" />
              </FormControl>
            </>
          )} />
         <FormField name="roles" render={({ field }) => (
          <>
            <FormLabel>Roles</FormLabel>
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
                    {field.value?.length > 0
                      ? field.value.map(role => role.name).join(', ')
                      : 'Select roles'}
                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Command>
                    <CommandInput placeholder='Search...' onValueChange={setSearchTerm} />
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                      {roles.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            const currentRoles = methods.getValues('roles') || [];
                            const newRoles = currentRoles.find(role => role.id === Number(option.value))
                              ? currentRoles.filter(role => role.id !== Number(option.value))
                              : [...currentRoles, { id: Number(option.value), name: option.label }];
                            methods.setValue('roles', newRoles);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value?.find(role => role.id === Number(option.value))
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
          <FormField name="admin" render={({ field }) => (
            <>
              <FormLabel>admin</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingresa el admin" />
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
