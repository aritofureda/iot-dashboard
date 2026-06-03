import { useState } from 'react'
import { useAlerts } from '../../hooks/useAlerts'
import LoadingSpinner from '../../components/feedback/LoadingSpinner'
import ErrorMessage from '../../components/feedback/ErrorMessage'
import AlertList from './AlertList'
import ThresholdConfig from './ThresholdConfig'
import { clsx } from 'clsx'

const tabs = [
  { key: 'active', label: 'Alert Aktif' },
  { key: 'history', label: 'Riwayat' },
  { key: 'thresholds', label: 'Konfigurasi Threshold' },
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const { alerts, thresholds, loading, error, addOrUpdateThreshold, removeThreshold } = useAlerts()

  if (loading && alerts.length === 0) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  const activeAlerts = alerts.filter(a => a.status === 'active')
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved')

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Alerts</h2>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.label}
            {tab.key === 'active' && activeAlerts.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-danger rounded-full">
                {activeAlerts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'active' && <AlertList alerts={activeAlerts} emptyMessage="Tidak ada alert aktif" />}
      {activeTab === 'history' && <AlertList alerts={resolvedAlerts} emptyMessage="Tidak ada riwayat alert" />}
      {activeTab === 'thresholds' && (
        <ThresholdConfig
          thresholds={thresholds}
          onSave={addOrUpdateThreshold}
          onDelete={removeThreshold}
        />
      )}
    </div>
  )
}
