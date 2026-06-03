import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useDevices } from '../../hooks/useDevices'
import Card from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import LoadingSpinner from '../../components/feedback/LoadingSpinner'
import ErrorMessage from '../../components/feedback/ErrorMessage'
import { formatWatt, formatKwh, formatVolt, formatAmpere } from '../../utils/formatEnergy'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatTimeAgo } from '../../utils/formatDate'

export default function DeviceListPage() {
  const { devices, loading, error, refresh } = useDevices()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const navigate = useNavigate()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refresh} />

  const filtered = devices.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Devices</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-text-secondary/60"
            placeholder="Cari nama atau lokasi..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'Semua Status' },
            { value: 'online', label: 'Online' },
            { value: 'offline', label: 'Offline' },
            { value: 'alert', label: 'Alert' },
          ]}
          className="w-40"
        />
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Nama</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Lokasi</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Watt</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Volt</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Ampere</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">kWh</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Biaya</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(device => (
                <tr
                  key={device.id}
                  className="border-b border-border last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/devices/${device.id}`)}
                >
                  <td className="py-3 px-5 font-medium text-text-primary">{device.name}</td>
                  <td className="py-3 px-5 text-text-secondary">{device.location}</td>
                  <td className="py-3 px-5"><StatusBadge status={device.status} /></td>
                  <td className="py-3 px-5 text-right">{formatWatt(device.watts)}</td>
                  <td className="py-3 px-5 text-right">{formatVolt(device.volts)}</td>
                  <td className="py-3 px-5 text-right">{formatAmpere(device.amps)}</td>
                  <td className="py-3 px-5 text-right">{formatKwh(device.kwhToday)}</td>
                  <td className="py-3 px-5 text-right">{formatRupiah(device.costToday)}</td>
                  <td className="py-3 px-5 text-right text-text-secondary text-xs">{formatTimeAgo(device.lastSeen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
