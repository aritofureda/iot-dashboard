import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/feedback/EmptyState'
import { formatDateTime } from '../../utils/formatDate'
import { AlertTriangle, Zap, WifiOff } from 'lucide-react'

const typeIcons = {
  high_watt: Zap,
  high_kwh: Zap,
  offline: WifiOff,
}

const typeLabels = {
  high_watt: 'Daya Tinggi',
  high_kwh: 'kWh Tinggi',
  offline: 'Device Offline',
}

export default function AlertList({ alerts, emptyMessage }) {
  if (alerts.length === 0) {
    return <EmptyState icon={AlertTriangle} title={emptyMessage} />
  }

  return (
    <div className="space-y-3">
      {alerts.map(alert => {
        const Icon = typeIcons[alert.type] || AlertTriangle
        return (
          <Card key={alert.id}>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-red-50 text-danger shrink-0">
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-text-primary text-sm">{alert.deviceName}</span>
                  <Badge variant={alert.status}>{alert.status === 'active' ? 'Aktif' : 'Resolved'}</Badge>
                </div>
                <p className="text-sm text-text-secondary">{alert.message}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-text-secondary">
                  <span>{typeLabels[alert.type]}</span>
                  {alert.value !== null && <span>Nilai: {alert.value}</span>}
                  <span>Threshold: {alert.threshold}</span>
                  <span>{formatDateTime(alert.timestamp)}</span>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
