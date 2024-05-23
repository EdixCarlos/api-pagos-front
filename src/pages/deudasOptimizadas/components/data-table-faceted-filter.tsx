import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/custom/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  onChange?: (value: string) => void
  setAlumnoFilter: (value: string | undefined) => void
  setSedeIdFilter: (value: number | undefined) => void

  setSemestreIdFilter: (value: number | undefined) => void
  setVencidoFilter: (value: boolean | undefined) => void
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  onChange,
  setAlumnoFilter,
  setSedeIdFilter,
  setSemestreIdFilter,
  setVencidoFilter
  }: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const [selectedValues, setSelectedValues] = useState(new Set<string>());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (selectedValues.has(option.value)) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      setSelectedValues(new Set(selectedValues));
                      const filterValues = Array.from(selectedValues)
                      onChange && onChange(filterValues.join(","));
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined)
                      setAlumnoFilter(undefined);
                      setSedeIdFilter(undefined);
                      setSemestreIdFilter(undefined);
                      setVencidoFilter(undefined);
                    }}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
