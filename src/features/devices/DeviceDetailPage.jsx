import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock } from 'lucide-react'
import { useDeviceDetail } from '../../hooks/useDeviceDetail'
import Card, { CardHeader } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/feedback/LoadingSpinner'
import ErrorMessage from '../../components/feedback/ErrorMessage'
import { formatWatt, formatKwh, formatVolt, formatAmpere } from '../../utils/formatEnergy'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatDateTime, formatDateOnly } from '../../utils/formatDate'
import RealTimeGauge from './RealTimeGauge'
import HistoryChart from './HistoryChart'

export default function DeviceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { device, history, period, setPeriod, loading, error, refresh } = useDeviceDetail(id)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refresh} />
  if (!device) return <ErrorMessage message="Device tidak ditemukan" />

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/devices')}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-text-primary">{device.name}</h2>
            <StatusBadge status={device.status} />
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
            <span className="flex items-center gap-1"><MapPin size={14} /> {device.location}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {formatDateTime(device.lastSeen)}</span>
          </div>
        </div>
        <div className="text-xs text-text-secondary">
          <p>ID: {device.id}</p>
          <p>Install: {formatDateOnly(device.installDate)}</p>
          <p>Tarif: {formatRupiah(device.tariff)}/kWh</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-text-secondary">kWh Hari Ini</p>
          <p className="text-2xl font-semibold text-text-primary mt-1">{formatKwh(device.kwhToday)}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-secondary">Biaya Hari Ini</p>
          <p className="text-2xl font-semibold text-text-primary mt-1">{formatRupiah(device.costToday)}</p>
        </Card>
        <Card>
          <p className="text-xs text-text-secondary">Peak Watt</p>
          <p className="text-2xl font-semibold text-text-primary mt-1">{formatWatt(device.peakWatt)}</p>
        </Card>
      </div>

      {/* Real-time Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <RealTimeGauge label="Daya" value={device.watts} max={10000} unit="W" color="#2563EB" />
        <RealTimeGauge label="Tegangan" value={device.volts} max={400} unit="V" color="#16A34A" />
        <RealTimeGauge label="Arus" value={device.amps} max={50} unit="A" color="#D97706" />
      </div>

      {/* History Chart */}
      <HistoryChart data={history} period={period} onPeriodChange={setPeriod} />
    </div>
  )
}
