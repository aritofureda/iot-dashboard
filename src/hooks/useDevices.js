import { useState, useEffect, useCallback } from 'react'
import { fetchDevices, fetchHourlyOverview } from '../api/devicesApi'
import useSettingsStore from '../store/settingsStore'

export function useDevices() {
  const [devices, setDevices] = useState([])
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const refreshInterval = useSettingsStore(s => s.refreshInterval)

  const load = useCallback(async () => {
    try {
      const [devs, hourly] = await Promise.all([fetchDevices(), fetchHourlyOverview()])
      setDevices(devs)
      setHourlyData(hourly)
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, refreshInterval * 1000)
    return () => clearInterval(interval)
  }, [load, refreshInterval])

  return { devices, hourlyData, loading, error, refresh: load }
}
