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

export const DialogReportPDFPagos = ({ isOpen, setIsOpen }) => {
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
    const pagos = await getPagosByDate(startDate, endDate);

    // Transform the data into a format that can be used by autoTable
    const tableData = pagos.content.map(pago => [
      pago.numRecibo,
      'S/.'+pago.cantidad,
      pago.fechaPago,
      pago.user.name,
      pago.tipoPago.nombre,
      pago.formaPago.name,
      pago.alumno.apellidos + ', ' + pago.alumno.nombres,
    ]);

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Reporte de Ingresos', 70, 10);

    const now = new Date();

    doc.setFontSize(14);
    doc.text(`Rango de fechas: ${startDate} - ${endDate}`, 13.75, 35);
    // doc.text(`Mes: ${now.toLocaleString('es-PE', { month: 'long' })}`, 13.75, 20);
    // doc.text(`Fecha de reporte: ${now.toLocaleDateString('es-PE')}`, 13.75, 20);
    const user = JSON.parse(localStorage.getItem('user'));
    // doc.text(`Usuario: ${user.name}`, 100, 20);
    const reportDetails = [
      ['Fecha de reporte', now.toLocaleDateString('es-PE')],
      ['Usuario', user.name],
      ['Rango de fechas', `${startDate} - ${endDate}`],
    ];

    // Add a table with report details
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


    // Pass the transformed data to autoTable
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [['Num Recibo', 'Cantidad', 'Fecha Pago', 'Usuario', 'Tipo Pago', 'Forma Pago', 'Alumno']],
      body: tableData,
      styles: { lineWidth: 0.1 }, // Establece el ancho de la línea (bordes de las celdas) a 0.5
    });
    // Create an object to store the totals for each payment method
    const totals = {};
    const totalSum = pagos.content.reduce((acc, pago) => acc + pago.cantidad, 0);
    // Iterate over the payments and update the totals
    pagos.content.forEach(pago => {
      if (!totals[pago.formaPago.name]) {
        totals[pago.formaPago.name] = 0;
      }
      totals[pago.formaPago.name] += pago.cantidad;
    });
    const totalsData = Object.entries(totals).map(([formaPago, total]) => [formaPago, 'S/.'+total]);
    totalsData.push(['Total', 'S/.'+totalSum]);
// Add the second table with the totals
    doc.text('Totales', 13.75, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 30,
      head: [['Forma de Pago', 'Total']],
      body: totalsData,
      styles: { lineWidth: 0.1 }, // Establece el ancho de la línea (bordes de las celdas) a 0.5
    });
    doc.text(`Observaciones: ${observations}`, 13.75, doc.lastAutoTable.finalY + 10);

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
