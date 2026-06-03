import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import { formatWatt, formatKwh } from '../../utils/formatEnergy'
import { formatRupiah } from '../../utils/formatCurrency'
import { MapPin } from 'lucide-react'

export default function DeviceCard({ device }) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={() => navigate(`/devices/${device.id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-primary truncate">{device.name}</h3>
        <StatusBadge status={device.status} />
      </div>
      <p className="text-xs text-text-secondary flex items-center gap-1 mb-3">
        <MapPin size={12} /> {device.location}
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-text-secondary">Daya</span>
          <p className="font-medium text-text-primary">{formatWatt(device.watts)}</p>
        </div>
        <div>
          <span className="text-text-secondary">kWh</span>
          <p className="font-medium text-text-primary">{formatKwh(device.kwhToday)}</p>
        </div>
        <div className="col-span-2">
          <span className="text-text-secondary">Biaya</span>
          <p className="font-medium text-text-primary">{formatRupiah(device.costToday)}</p>
        </div>
      </div>
    </Card>
  )
}
