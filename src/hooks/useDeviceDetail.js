import { useState, useEffect, useCallback } from 'react'
import { fetchDeviceById, fetchDeviceHistory } from '../api/devicesApi'
import useSettingsStore from '../store/settingsStore'

export function useDeviceDetail(id) {
  const [device, setDevice] = useState(null)
  const [history, setHistory] = useState([])
  const [period, setPeriod] = useState('daily')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const refreshInterval = useSettingsStore(s => s.refreshInterval)

  const loadDevice = useCallback(async () => {
    try {
      const dev = await fetchDeviceById(id)
      setDevice(dev)
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }, [id])

  const loadHistory = useCallback(async () => {
    try {
      const data = await fetchDeviceHistory(id, period)
      setHistory(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [id, period])

  useEffect(() => {
    setLoading(true)
    loadDevice()
    loadHistory()
    const interval = setInterval(loadDevice, refreshInterval * 1000)
    return () => clearInterval(interval)
  }, [loadDevice, loadHistory, refreshInterval])

  return { device, history, period, setPeriod, loading, error, refresh: loadDevice }
}
