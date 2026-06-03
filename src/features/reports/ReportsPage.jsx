import { useState } from 'react'
import { useReports } from '../../hooks/useReports'
import { devices } from '../../api/mockData'
import Card, { CardHeader } from '../../components/ui/Card'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/feedback/LoadingSpinner'
import EmptyState from '../../components/feedback/EmptyState'
import ReportTable from './ReportTable'
import ReportChart from './ReportChart'
import ExportButtons from './ExportButtons'
import { FileText, Search } from 'lucide-react'

export default function ReportsPage() {
  const { data, loading, loadReport } = useReports()
  const [deviceId, setDeviceId] = useState('all')
  const [startDate, setStartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    return d.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])

  const handleGenerate = () => {
    loadReport({ deviceId, startDate, endDate })
  }

  const deviceOptions = [
    { value: 'all', label: 'Semua Device' },
    ...devices.map(d => ({ value: d.id, label: d.name }))
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Reports</h2>

      {/* Filters */}
      <Card>
        <CardHeader title="Filter Laporan" />
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <Select
              label="Device"
              value={deviceId}
              onChange={e => setDeviceId(e.target.value)}
              options={deviceOptions}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Tanggal Akhir</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <Button onClick={handleGenerate}>
            <Search size={16} /> Generate
          </Button>
        </div>
      </Card>

      {/* Results */}
      {loading && <LoadingSpinner />}

      {!loading && data.length === 0 && (
        <EmptyState icon={FileText} title="Belum ada data" description="Pilih filter dan klik Generate untuk melihat laporan" />
      )}

      {!loading && data.length > 0 && (
        <>
          <div className="flex justify-end">
            <ExportButtons data={data} />
          </div>
          <ReportChart data={data} />
          <ReportTable data={data} />
        </>
      )}
    </div>
  )
}
