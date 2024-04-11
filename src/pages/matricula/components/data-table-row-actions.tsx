import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast.ts'
import { matriculaContext } from '@/context/matriculaContext.tsx'
import { matriculaSchema } from '@/domain/matriculaSchema.ts'
import { deleteMatricula } from '@/services/matriculasService.ts'
import { EditMatriculaDialog } from '@/pages/matricula/components/EditMatriculaDialog.tsx'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from 'jspdf-autotable'
interface IData {
  id: number;
  // otras propiedades...
}
type DataType = {
  coin: string;
  game_group: string;
  game_name: string;
  game_version: string;
  machine: string;
  vlt: string;
  id?: string;
};
interface DataTableRowActionsProps<TData extends IData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends IData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { fetchMatricula } = React.useContext(matriculaContext);

  const toast = useToast()

  const matricula = matriculaSchema.parse(row.original)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteMatricula(row.original.id);
      toast.toast({
        variant: 'success',
        title: 'Éxito',
        description: 'La matricula se ha eliminado correctamente.',
      })
    } catch (error) {
      toast.toast({
        variant: 'error',
        title: 'Error',
        description: 'Hubo un error al eliminar la matricula.',
      })
      console.error('Error deleting matricula:', error);
    }
    fetchMatricula()
  };
  const imgData = 'data:image/png;base64,'
  const handlerExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Reporte", 14, 22);

    doc.setFontSize(16);
    doc.text("Descripcion", 14, 30);

    doc.addImage(imgData, "JPEG", 15, 40, 18, 18);

    const data = [
      ['Dato1', 'Dato2', 'Dato3'],
    ];
    const headers = [['Columna1', 'Columna2', 'Columna3']];

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 60,
    });

    doc.autoPrint();
    doc.save("document.pdf");
  };

  const handlerDetalles = () => {
    console.log('Detalles');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Editar
          <DropdownMenuShortcut>Shift+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlerExportPDF}>
          Imprimir PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlerDetalles}>
          Detalless
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isEditDialogOpen && (
        <EditMatriculaDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          matricula={matricula}
        />
      )}
    </DropdownMenu>
  )
}
