import Button from '../../components/ui/Button'
import { FileSpreadsheet, FileDown } from 'lucide-react'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportButtons({ data }) {
  const handleExportExcel = () => {
    const wsData = data.map(row => ({
      Tanggal: row.date,
      Device: row.deviceName || '-',
      'kWh': row.kwh,
      'Avg Watt': row.avgWatt,
      'Biaya (Rp)': row.cost,
    }))
    const ws = XLSX.utils.json_to_sheet(wsData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Laporan')
    XLSX.writeFile(wb, `laporan-listrik-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Laporan Konsumsi Listrik', 14, 20)
    doc.setFontSize(10)
    doc.text(`Tanggal cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 28)

    autoTable(doc, {
      startY: 35,
      head: [['Tanggal', 'Device', 'kWh', 'Avg Watt', 'Biaya (Rp)']],
      body: data.map(row => [
        row.date,
        row.deviceName || '-',
        row.kwh.toFixed(1),
        row.avgWatt,
        row.cost.toLocaleString('id-ID'),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    })

    doc.save(`laporan-listrik-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleExportExcel}>
        <FileSpreadsheet size={16} /> Export Excel
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <FileDown size={16} /> Export PDF
      </Button>
    </div>
  )
}
