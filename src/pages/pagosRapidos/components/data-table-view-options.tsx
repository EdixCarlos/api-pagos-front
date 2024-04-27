import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import { columnIdsAlumnos } from './columnsAlumnos';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedState = localStorage.getItem('visibleColumns');
    return savedState ? JSON.parse(savedState) : columnIdsAlumnos;
  });
  useEffect(() => {
    localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

useEffect(() => {
  table.getAllColumns().forEach((column) => {
    const shouldBeVisible = visibleColumns.includes(column.id);
    if (shouldBeVisible !== column.getIsVisible()) {
      column.toggleVisibility(shouldBeVisible);
    }
  });
}, [table, visibleColumns]);
  const handleCheckedChange = (columnId: string, value: boolean) => {
    if (value) {
      setVisibleColumns((prev) => [...prev, columnId]);
    } else {
      setVisibleColumns((prev) => prev.filter((id) => id !== columnId));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          Ver
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Columnas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.getAllColumns().map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className='capitalize'
              checked={visibleColumns.includes(column.id)}
              onCheckedChange={(value) => handleCheckedChange(column.id, value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
