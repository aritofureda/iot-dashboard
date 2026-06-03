import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { clsx } from 'clsx'

const periods = [
  { key: 'daily', label: 'Harian' },
  { key: 'weekly', label: 'Mingguan' },
  { key: 'monthly', label: 'Bulanan' },
]

export default function HistoryChart({ data, period, onPeriodChange }) {
  return (
    <Card>
      <CardHeader
        title="Riwayat Konsumsi"
        action={
          <div className="flex gap-1">
            {periods.map(p => (
              <button
                key={p.key}
                onClick={() => onPeriodChange(p.key)}
                className={clsx(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  period === p.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94A3B8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" unit=" kWh" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
              formatter={(value, name) => {
                if (name === 'kwh') return [`${value} kWh`, 'Konsumsi']
                return [value, name]
              }}
            />
            <Bar dataKey="kwh" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
