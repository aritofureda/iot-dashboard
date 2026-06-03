import { create } from 'zustand'
import { fetchAlerts, fetchThresholds, saveThreshold, deleteThreshold } from '../api/alertsApi'

const useAlertStore = create((set, get) => ({
  alerts: [],
  thresholds: [],
  loading: false,
  error: null,

  loadAlerts: async (status = 'all') => {
    set({ loading: true, error: null })
    try {
      const data = await fetchAlerts(status)
      set({ alerts: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  loadThresholds: async () => {
    set({ loading: true, error: null })
    try {
      const data = await fetchThresholds()
      set({ thresholds: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  addOrUpdateThreshold: async (threshold) => {
    set({ loading: true, error: null })
    try {
      const data = await saveThreshold(threshold)
      set({ thresholds: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  removeThreshold: async (id) => {
    set({ loading: true, error: null })
    try {
      const data = await deleteThreshold(id)
      set({ thresholds: data, loading: false })
    } catch (e) {
      set({ error: e.message, loading: false })
    }
  },

  activeAlertCount: () => get().alerts.filter(a => a.status === 'active').length,
}))

export default useAlertStore
