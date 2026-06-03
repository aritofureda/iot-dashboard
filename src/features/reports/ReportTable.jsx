import Card, { CardHeader } from '../../components/ui/Card'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatKwh } from '../../utils/formatEnergy'

export default function ReportTable({ data }) {
  // Aggregate by date
  const aggregated = data.reduce((acc, row) => {
    const existing = acc.find(a => a.date === row.date)
    if (existing) {
      existing.kwh += row.kwh
      existing.avgWatt = Math.round((existing.avgWatt + row.avgWatt) / 2)
      existing.cost += row.cost
    } else {
      acc.push({ ...row })
    }
    return acc
  }, [])

  const totalKwh = aggregated.reduce((s, r) => s + r.kwh, 0)
  const totalCost = aggregated.reduce((s, r) => s + r.cost, 0)

  return (
    <Card padding={false}>
      <div className="p-5 pb-0">
        <CardHeader title="Detail Laporan" subtitle={`${aggregated.length} hari`} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Tanggal</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">kWh</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Avg Watt</th>
              <th className="text-right py-3 px-5 text-xs font-semibold text-text-secondary uppercase">Biaya</th>
            </tr>
          </thead>
          <tbody>
            {aggregated.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 px-5 text-text-primary">{row.date}</td>
                <td className="py-3 px-5 text-right text-text-primary">{formatKwh(row.kwh)}</td>
                <td className="py-3 px-5 text-right text-text-primary">{row.avgWatt} W</td>
                <td className="py-3 px-5 text-right text-text-primary">{formatRupiah(row.cost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-gray-50">
              <td className="py-3 px-5 font-semibold text-text-primary">Total</td>
              <td className="py-3 px-5 text-right font-semibold text-text-primary">{formatKwh(totalKwh)}</td>
              <td className="py-3 px-5 text-right text-text-secondary">-</td>
              <td className="py-3 px-5 text-right font-semibold text-text-primary">{formatRupiah(totalCost)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  )
}
