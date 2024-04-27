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
import { Form, FormField, FormControl, FormLabel } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react'
import { es } from 'date-fns/locale'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Toast } from '@/components/ui/toast.tsx'
import { useToast } from '@/components/ui/use-toast.ts'
import { getPagosByDate } from '@/services/pagoService.ts'
import { MixerHorizontalIcon, DownloadIcon } from '@radix-ui/react-icons'
import { getEgresosByDate } from '@/services/egresoService.ts'

export const DialogReportPDFEgresos = ({ isOpen, setIsOpen }) => {
  const methods = useForm()
  const [dateRange, setDateRange] = useState<Date[]>([])
  const [observations, setObservations] = useState("")
  const { toasts } = useToast()

  const closeDialog = () => setIsOpen(false)
  const generatePDF = async () => {
    // Check if date range is selected
    if (dateRange.length === 0) {
      console.error("Rango de fechas no seleccionado");
      return;
    }
    console.log('dateRange', dateRange)
    // Call getPagosByDate with the selected date range
    const startDate = dateRange.from.toISOString().split('T')[0];
    const endDate = dateRange.to.toISOString().split('T')[0];
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    const egresos = await getEgresosByDate(startDate, endDate);

    // Transform the data into a format that can be used by autoTable
    const tableData = egresos.content.map(egreso => [
      egreso.numRecibo,
      'S/.' + egreso.cantidad,
      egreso.fechaPago,
      egreso.user.name,
      egreso.formaPago.name,
      egreso.sede.nombre,
      egreso.tipoEgreso ? egreso.tipoEgreso.nombre : 'N/A', // handle null tipoEgreso
    ]);

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Reporte de Egresos', 70, 10);

    const now = new Date();

    doc.setFontSize(14);
    doc.text(`Rango de fechas: ${startDate} - ${endDate}`, 13.75, 35);
    const user = JSON.parse(localStorage.getItem('user'));
    const reportDetails = [
      ['Fecha de reporte', now.toLocaleDateString('es-PE')],
      ['Usuario', user.name],
      ['Rango de fechas', `${startDate} - ${endDate}`],
    ];
    const groupedEgresos = egresos.content.reduce((groups, egreso) => {
      const key = egreso.tipoEgreso ? egreso.tipoEgreso.nombre : 'N/A';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(egreso);
      return groups;
    }, {});
    autoTable(doc, {
      startY: 20,
      body: reportDetails,
      styles: { lineWidth: 0.1 }, // Set line width (cell borders) to 0.1
      didParseCell: function(data) {
        if (data.column.index === 0 && data.cell.section === 'body') {
          data.cell.styles.fillColor = [46, 128, 186]; // Cambia a un tono de azul más oscuro para mejor visibilidad del texto blanco
          data.cell.styles.textColor = [255, 255, 255]; // Establece el color del texto a blanco
          data.cell.styles.fontStyle = 'bold'; // Establece el estilo de fuente a negrita
        }
      },
      columnStyles: {
        0: { cellWidth: 50 }, // Set the cell width of the first column to 50
      },
    });
    let totalSum = 0;

    for (const [tipoEgreso, egresos] of Object.entries(groupedEgresos)) {
      const tableData = egresos.map(egreso => [
        egreso.numRecibo,
        'S/.' + egreso.cantidad,
        egreso.fechaPago,
        egreso.user.name,
        egreso.formaPago.name,
        egreso.sede.nombre,
      ]);
      const subtotal = egresos.reduce((sum, egreso) => sum + egreso.cantidad, 0);
      totalSum += subtotal;

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        body: [[`Tipo de Egreso:`, `${tipoEgreso}`]],
        styles: { lineWidth: 0.1 },didParseCell: function(data) {
          if (data.column.index === 0 && data.cell.section === 'body') {
            data.cell.styles.fillColor = [46, 128, 186];
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = 'bold';
          }
        },columnStyles: {
          0: { cellWidth: 50 }, // Set the cell width of the first column to 50
        },
      });
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 0,
        head: [['Num Recibo', 'Cantidad', 'Fecha Pago', 'Usuario', 'Forma Pago', 'Sede']],
        body: tableData,
        styles: { lineWidth: 0.1 },
      });
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 0,
        body: [[`Subtotal de ${tipoEgreso}:`, `S/.${subtotal}`]],
        styles: { lineWidth: 0.1 },didParseCell: function(data) {
          if (data.column.index === 0 && data.cell.section === 'body') {
            data.cell.styles.fillColor = [46, 128, 186];
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = 'bold';
          }
        },columnStyles: {
          0: { cellWidth: 50 }, // Set the cell width of the first column to 50
        },
      });
    }
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: [['Total:', `S/.${totalSum}`]],
      styles: { lineWidth: 0.1 },
      didParseCell: function(data) {
        if (data.column.index === 0 && data.cell.section === 'body') {
          data.cell.styles.fillColor = [46, 128, 186];
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fontStyle = 'bold';
        }
      },columnStyles: {
        0: { cellWidth: 50 }, // Set the cell width of the first column to 50
      },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 0,
      body: [['Observaciones:', observations]],
      styles: { lineWidth: 0.1 },
      didParseCell: function(data) {
        if (data.column.index === 0 && data.cell.section === 'body') {
          data.cell.styles.fillColor = [46, 128, 186];
          data.cell.styles.textColor = [255, 255, 255];
          data.cell.styles.fontStyle = 'bold';
        }
      },columnStyles: {
        0: { cellWidth: 50 }, // Set the cell width of the first column to 50
      },
    });
    // Save the PDF
    doc.save('reporte-ingresos.pdf');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          <DownloadIcon className='mr-2 h-4 w-4' />
          Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-screen">
        <DialogTitle>Generar Reporte PDF</DialogTitle>
        <Form {...methods}>
          <FormField name="dateRange" render={({ field }) => (
            <>
              <FormLabel>Rango de Fechas</FormLabel>
              <FormControl className="flex justify-center">
                <div > {/* Ajusta el tamaño máximo según tus necesidades */}
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    locale={es}
                  />
                </div>
              </FormControl>
            </>
          )} />
          <FormField name="observations" render={({ field }) => (
            <>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Agrega tus observaciones aquí"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                />
              </FormControl>
            </>
          )} />
        </Form>
        <Button variant='outline' onClick={generatePDF}>
          Generar Reporte
        </Button>
        <DialogFooter>
        </DialogFooter>
        <DialogClose onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
