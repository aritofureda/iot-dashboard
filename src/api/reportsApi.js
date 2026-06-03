import { devices, generateDailyHistory } from './mockData'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export async function fetchReport({ deviceId, startDate, endDate }) {
  await delay(500)
  const targetDevices = deviceId === 'all' ? devices : devices.filter(d => d.id === deviceId)
  const results = []
  for (const dev of targetDevices) {
    const history = generateDailyHistory(dev.id)
    const filtered = history.filter(h => {
      if (startDate && h.date < startDate) return false
      if (endDate && h.date > endDate) return false
      return true
    })
    filtered.forEach(h => {
      results.push({ ...h, deviceId: dev.id, deviceName: dev.name })
    })
  }
  return results
}
