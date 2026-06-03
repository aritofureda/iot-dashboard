import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card, { CardHeader } from '../../components/ui/Card'

export default function ReportChart({ data }) {
  // Aggregate by date for chart
  const chartData = data.reduce((acc, row) => {
    const existing = acc.find(a => a.date === row.date)
    if (existing) {
      existing.kwh += row.kwh
    } else {
      acc.push({ date: row.date, kwh: row.kwh })
    }
    return acc
  }, [])

  return (
    <Card>
      <CardHeader title="Grafik Konsumsi" subtitle="kWh per hari" />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94A3B8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" unit=" kWh" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
              formatter={(value) => [`${value.toFixed(1)} kWh`, 'Konsumsi']}
            />
            <Bar dataKey="kwh" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
