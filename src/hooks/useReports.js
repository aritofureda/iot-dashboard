import { useState, useCallback } from 'react'
import { fetchReport } from '../api/reportsApi'

export function useReports() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadReport = useCallback(async (params) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchReport(params)
      setData(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, loadReport }
}
