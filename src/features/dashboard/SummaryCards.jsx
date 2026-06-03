import { Cpu, Zap, DollarSign, AlertTriangle } from 'lucide-react'
import Card from '../../components/ui/Card'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatKwh } from '../../utils/formatEnergy'

const cards = [
  { key: 'online', label: 'Device Online', icon: Cpu, color: 'text-success', getValue: (p) => `${p.onlineCount}/${p.totalDevices}` },
  { key: 'kwh', label: 'Total kWh Hari Ini', icon: Zap, color: 'text-primary', getValue: (p) => formatKwh(p.totalKwh) },
  { key: 'cost', label: 'Estimasi Biaya', icon: DollarSign, color: 'text-warning', getValue: (p) => formatRupiah(p.totalCost) },
  { key: 'alerts', label: 'Alert Aktif', icon: AlertTriangle, color: 'text-danger', getValue: (p) => String(p.alertCount) },
]

export default function SummaryCards(props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <Card key={card.key}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-text-secondary">{card.label}</p>
              <p className="text-xl font-semibold text-text-primary mt-0.5">{card.getValue(props)}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
