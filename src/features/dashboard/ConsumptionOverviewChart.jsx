import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card, { CardHeader } from '../../components/ui/Card'

export default function ConsumptionOverviewChart({ data }) {
  return (
    <Card>
      <CardHeader title="Konsumsi 24 Jam Terakhir" subtitle="Total kWh gabungan semua device" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#94A3B8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" unit=" kWh" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
              formatter={(value) => [`${value} kWh`, 'Konsumsi']}
            />
            <Line type="monotone" dataKey="kwh" stroke="#2563EB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
