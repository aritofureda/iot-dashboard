import { create } from 'zustand'
import { settings as defaultSettings } from '../api/mockData'

const useSettingsStore = create((set) => ({
  ...defaultSettings,

  updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
}))

export default useSettingsStore
