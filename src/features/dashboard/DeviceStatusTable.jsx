import { useNavigate } from 'react-router-dom'
import Card, { CardHeader } from '../../components/ui/Card'
import { StatusBadge } from '../../components/ui/Badge'
import { formatWatt, formatKwh } from '../../utils/formatEnergy'
import { formatRupiah } from '../../utils/formatCurrency'

export default function DeviceStatusTable({ devices }) {
  const navigate = useNavigate()

  return (
    <Card padding={false}>
      <div className="p-5 pb-0">
        <CardHeader title="Status Semua Device" subtitle={`${devices.length} device terdaftar`} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Nama</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Lokasi</th>
              <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Status</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Daya</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">kWh Hari Ini</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Biaya</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <tr
                key={device.id}
                className="border-b border-border last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/devices/${device.id}`)}
              >
                <td className="py-3 px-5 font-medium text-text-primary">{device.name}</td>
                <td className="py-3 px-5 text-text-secondary">{device.location}</td>
                <td className="py-3 px-5"><StatusBadge status={device.status} /></td>
                <td className="py-3 px-5 text-right text-text-primary">{formatWatt(device.watts)}</td>
                <td className="py-3 px-5 text-right text-text-primary">{formatKwh(device.kwhToday)}</td>
                <td className="py-3 px-5 text-right text-text-primary">{formatRupiah(device.costToday)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
