import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { alumnosContext } from '@/context/alumnosContext.tsx'
import MaskedInput from 'react-text-mask';

import React, { useContext, useEffect, useState } from 'react'
import { createAlumno, getAlumnos } from '@/services/alumnosService.ts'
import { columnsAlumnos } from '@/pages/alumnos/components/columnsAlumnos.tsx'
import { FastFormAlumnos } from '@/components/fastFormAlumnos.tsx'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { Search } from '@/components/search.tsx'
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Popover, PopoverContent } from '@/components/ui/popover.tsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/custom/button.tsx'
import { cn } from '@/lib/utils.ts'
import { estadoAlumnos, sexos } from '@/pages/alumnos/data/data.tsx'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { estadoMatriculas } from '@/pages/matricula/data/data.tsx'
import { matriculaContext } from '@/context/matriculaContext.tsx'
import { useForm } from 'react-hook-form'
import { getUsuarios } from '@/services/usuariosService.ts'
import { getSemestres } from '@/services/semestresService.ts'
import { useToast } from '@/components/ui/use-toast.ts'
import { createMatricula } from '@/services/matriculasService.ts'
import { Label } from '@/components/ui/label.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { getSedes } from '@/services/sedeService.ts'
import { FastFormPagos } from '@/components/fastFormPagos.tsx'
interface Option {
  value: number;
  label: string;
}
export default function AlumnosYMatriculas() {
const [alumnosData, setAlumnosData] = useState([]); // Initialize with an empty array

  // const fetchAlumnos = async () => {
  //   try {
  //     const alumnos = await getAlumnos();
  //     setAlumnosData(alumnos.content);
  //   } catch (error) {
  //     console.error('Error fetching alumnos:', error);
  //   }
  // };
  useEffect(() => {


    fetchAlumnos();
  }, []);

  const { fetchMatricula } = useContext(matriculaContext);
  const methods = useForm()
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUsuarios();
      const options = response.map(user => ({
        value: user.id,
        label: user.name,
      }));
      setUserOptions(options);
    };

    fetchUser();
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
  const toast = useToast()
  const handleAdd = async () => {
    try {
      const matricula = methods.getValues()
      const addDeuda = {
        alumnoId: matricula.alumno,
        semestreId: matricula.semestre,
        fechaInscripcion: matricula.fechaInscripcion,
        userId: matricula.user,
        estado: matricula.estado,
      }
      await createMatricula(addDeuda)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La deuda se ha añadido correctamente.'
      })
      fetchMatricula()
      methods.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir la deuda.'
      })
    }
    methods.reset()
  }
  const { fetchAlumnos } = useContext(alumnosContext);
  const [searchTerm, setSearchTerm] = useState('');
  const methodsAlumnos = useForm()

  const [sedeOptions, setSedeOptions] = useState<Option[]>([]);
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

  const handleAddAlumnos = async () => {
    try {
      const alumno = methodsAlumnos.getValues()
      const addAlumno = {
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
        sedeId: alumno.sede,
        estado: alumno.estado,
      }
      await createAlumno(addAlumno)
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'El alumno se ha añadido correctamente.'
      })
      fetchAlumnos()
      methodsAlumnos.reset()
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al añadir el alumno.'
      })
    }
    methodsAlumnos.reset()
  }
  const [fechaNacimiento, setFechaNacimiento] = useState("yyyy-mm-dd");

  const handleInputChange = (e) => {
    const value = e.target.value;
    let placeholder = "yyyy-mm-dd";

    if (value.length === 4) {
      placeholder = value + "-mm-dd";
    } else if (value.length === 7) {
      placeholder = value + "-dd";
    } else if (value.length > 7) {
      placeholder = value;
    }

    setFechaNacimiento(placeholder);
  };
  return (
    <alumnosContext.Provider value={{ fetchAlumnos }}>

      <Layout>
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          <FastFormAlumnos />
          <FastFormPagos />
          <div className='ml-auto flex items-center space-x-4'>
            {/*<Search />*/}
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className='flex  h-full' fixedHeight>
          <div className=' flex items-center justify-between space-y-2'>
            <div>
              {/*<h2 className='text-2xl font-bold tracking-tight'>Alumnos</h2>*/}
              {/*<p className='text-muted-foreground'>*/}
              {/*  Here&apos;s a list of your tasks for this month!*/}
              {/*</p>*/}
            </div>
          </div>
          <div className="flex-1 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[200px] sm:min-h-[400px] md:min-h-[600px] lg:min-h-[800px] xl:min-h-[900px] h-full w-full rounded-lg border"
            >
              <ResizablePanel defaultSize={50}>
                <div className="flex mb-[-9] mt-1 items-center justify-center "><span className="font-semibold mb-4">Alumnos</span>
                </div>
                <ScrollArea className="h-[420px] w-[auto] rounded-md border p-4 overflow-auto">
                    <div className="flex mt-4 items-center justify-center p-6">

                      <div className="flex flex-row space-x-4 w-full">
                        <Form {...methodsAlumnos}>
                          <div className="flex flex-col space-y-4 w-1/2">

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
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          'w-auto justify-between',

                                          !field.value && 'text-muted-foreground',
                                        )}
                                      >
                                        {field.value
                                          ? sexos.find(
                                            (option) => option.value === field.value,
                                          )?.label
                                          : 'Select usuario'}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Command>
                                        <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                        <CommandEmpty>No options found.</CommandEmpty>
                                        <CommandGroup>
                                          {sexos.map((option) => (
                                            <CommandItem
                                              value={option.label}
                                              key={option.value}
                                              onSelect={() => {
                                                methods.setValue('sexo', option.value)
                                              }}
                                            >
                                              <CheckIcon
                                                className={cn(
                                                  'mr-2 h-4 w-4',
                                                  option.value === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
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
                          </div>
                          <div className="flex flex-col space-y-4 w-1/2">
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
                            <FormField name="departamento" rules={{ required: true }} render={({ field }) => (
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
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          'w-auto justify-between',
                                          !field.value && 'text-muted-foreground',
                                        )}
                                      >
                                        {field.value
                                          ? sedeOptions.find(
                                            (option) => option.value === field.value,
                                          )?.label
                                          : 'Select alumno'}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Command>
                                        <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                        <CommandEmpty>No options found.</CommandEmpty>
                                        <CommandGroup>
                                          {sedeOptions.map((option) => (
                                            <CommandItem
                                              value={option.label}
                                              key={option.value}
                                              onSelect={() => {
                                                methods.setValue('sede', option.value)
                                              }}
                                            >
                                              <CheckIcon
                                                className={cn(
                                                  'mr-2 h-4 w-4',
                                                  option.value === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
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
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          'w-auto justify-between',

                                          !field.value && 'text-muted-foreground',
                                        )}
                                      >
                                        {field.value
                                          ? estadoAlumnos.find(
                                            (option) => option.value === field.value,
                                          )?.label
                                          : 'Select estado'}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Command>
                                        <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                        <CommandEmpty>No options found.</CommandEmpty>
                                        <CommandGroup>
                                          {estadoAlumnos.map((option) => (
                                            <CommandItem
                                              value={option.label}
                                              key={option.value}
                                              onSelect={() => {
                                                methods.setValue('estado', option.value)
                                              }}
                                            >
                                              <CheckIcon
                                                className={cn(
                                                  'mr-2 h-4 w-4',
                                                  option.value === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
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
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div className="flex mt-4 items-center justify-center ">

                      <Button onClick={() => handleAddAlumnos()} variant="outline"
                              size="sm"
                              className="h-8 px-2 lg:px-3 mb-6">
                        Añadir
                      </Button>
                    </div>
                </ScrollArea>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex mb-2 mt-2 items-center justify-center ">
                  <span className="font-semibold">Matriculacion</span>
                </div>
                <ScrollArea className="h-[450px] w-[auto] rounded-md border p-4 overflow-auto">
                <div className="flex mt-4 items-center justify-center p-6">

                  <div className="flex flex-row space-x-4 w-full">
                    <Form {...methods}>
                      <div className="flex flex-col space-y-4 w-1/2">
                        <FormField name="alumno" render={({ field }) => (
                          <>
                            <FormLabel>Alumno</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-auto justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? alumnoOptions.find(
                                        (option) => option.value === field.value,
                                      )?.label
                                      : 'Select alumno'}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Command>
                                    <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                    <CommandEmpty>No options found.</CommandEmpty>
                                    <CommandGroup>
                                      {alumnoOptions.map((option) => (
                                        <CommandItem
                                          value={option.label}
                                          key={option.value}
                                          onSelect={() => {
                                            methods.setValue('alumno', option.value)
                                          }}
                                        >
                                          <CheckIcon
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              option.value === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
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
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-auto justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? semestreOptions.find(
                                        (option) => option.value === field.value,
                                      )?.label
                                      : 'Select semestre'}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                >
                                  <Command>
                                    <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                    <CommandEmpty>No options found.</CommandEmpty>
                                    <CommandGroup>
                                      {semestreOptions.map((option) => (
                                        <CommandItem
                                          value={option.label}
                                          key={option.value}
                                          onSelect={() => {
                                            methods.setValue('semestre', option.value)
                                          }}
                                        >
                                          <CheckIcon
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              option.value === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
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
                        <FormField name="fechaInscripcion" render={({ field }) => (
                          <>
                            <FormLabel>Fecha de inscripcion</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ingresa la fecha de inscripcion" />
                            </FormControl>
                          </>
                        )} />
                      </div>
                      <div className="flex flex-col space-y-4 w-1/2">
                        <FormField name="user" render={({ field }) => (
                          <>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-auto justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? userOptions.find(
                                        (option) => option.value === field.value,
                                      )?.label
                                      : 'Seleciona el usuario'}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Command>
                                    <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                    <CommandEmpty>No options found.</CommandEmpty>
                                    <CommandGroup>
                                      {userOptions.map((option) => (
                                        <CommandItem
                                          value={option.label}
                                          key={option.value}
                                          onSelect={() => {
                                            methods.setValue('user', option.value)
                                          }}
                                        >
                                          <CheckIcon
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              option.value === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
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
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-auto justify-between',

                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? estadoMatriculas.find(
                                        (option) => option.value === field.value,
                                      )?.label
                                      : 'Select estado'}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Command>
                                    <CommandInput placeholder="Search..." onValueChange={setSearchTerm} />
                                    <CommandEmpty>No options found.</CommandEmpty>
                                    <CommandGroup>
                                      {estadoMatriculas.map((option) => (
                                        <CommandItem
                                          value={option.label}
                                          key={option.value}
                                          onSelect={() => {
                                            methods.setValue('estado', option.value)
                                          }}
                                        >
                                          <CheckIcon
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              option.value === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
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
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="flex mt-4 items-center justify-center ">
                  <Button onClick={() => handleAdd()} variant="outline"
                          size="sm"
                          className="h-8 px-2 lg:px-3">
                    Añadir
                  </Button>
                </div>
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </LayoutBody>
      </Layout>
    </alumnosContext.Provider>
  )
}
