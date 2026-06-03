import { alerts, thresholds } from './mockData'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

let localThresholds = [...thresholds]

export async function fetchAlerts(status = 'all') {
  await delay()
  if (status === 'all') return [...alerts]
  return alerts.filter(a => a.status === status)
}

export async function fetchThresholds() {
  await delay()
  return [...localThresholds]
}

export async function saveThreshold(threshold) {
  await delay()
  const idx = localThresholds.findIndex(t => t.id === threshold.id)
  if (idx >= 0) {
    localThresholds[idx] = { ...threshold }
  } else {
    localThresholds.push({ ...threshold, id: `THR-${String(localThresholds.length + 1).padStart(3, '0')}` })
  }
  return [...localThresholds]
}

export async function deleteThreshold(id) {
  await delay()
  localThresholds = localThresholds.filter(t => t.id !== id)
  return [...localThresholds]
}
