import { useEffect } from 'react'
import useAlertStore from '../store/alertStore'

export function useAlerts() {
  const { alerts, thresholds, loading, error, loadAlerts, loadThresholds, addOrUpdateThreshold, removeThreshold, activeAlertCount } = useAlertStore()

  useEffect(() => {
    loadAlerts()
    loadThresholds()
  }, [loadAlerts, loadThresholds])

  return { alerts, thresholds, loading, error, loadAlerts, loadThresholds, addOrUpdateThreshold, removeThreshold, activeAlertCount }
}
