import Card from '../../components/ui/Card'

export default function RealTimeGauge({ label, value, max, unit, color }) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-text-secondary">{label}</span>
        <span className="text-lg font-semibold text-text-primary">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-text-secondary">
        <span>0</span>
        <span>{max} {unit}</span>
      </div>
    </Card>
  )
}
