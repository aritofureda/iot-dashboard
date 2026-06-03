import { useDevices } from '../../hooks/useDevices'
import useAlertStore from '../../store/alertStore'
import SummaryCards from './SummaryCards'
import ConsumptionOverviewChart from './ConsumptionOverviewChart'
import DeviceStatusTable from './DeviceStatusTable'
import LoadingSpinner from '../../components/feedback/LoadingSpinner'
import ErrorMessage from '../../components/feedback/ErrorMessage'

export default function DashboardPage() {
  const { devices, hourlyData, loading, error, refresh } = useDevices()
  const alertCount = useAlertStore(s => s.alerts.filter(a => a.status === 'active').length)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refresh} />

  const onlineCount = devices.filter(d => d.status === 'online').length
  const totalKwh = devices.reduce((sum, d) => sum + d.kwhToday, 0)
  const totalCost = devices.reduce((sum, d) => sum + d.costToday, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Dashboard</h2>
      <SummaryCards
        onlineCount={onlineCount}
        totalDevices={devices.length}
        totalKwh={totalKwh}
        totalCost={totalCost}
        alertCount={alertCount}
      />
      <ConsumptionOverviewChart data={hourlyData} />
      <DeviceStatusTable devices={devices} />
    </div>
  )
}
