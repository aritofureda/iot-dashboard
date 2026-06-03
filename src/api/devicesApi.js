import { devices, generateHourlyData, generateDailyHistory, generateWeeklyHistory, generateMonthlyHistory } from './mockData'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export async function fetchDevices() {
  await delay()
  return [...devices]
}

export async function fetchDeviceById(id) {
  await delay()
  const device = devices.find(d => d.id === id)
  if (!device) throw new Error('Device not found')
  return { ...device }
}

export async function fetchDeviceHistory(id, period = 'daily') {
  await delay(500)
  if (period === 'weekly') return generateWeeklyHistory(id)
  if (period === 'monthly') return generateMonthlyHistory(id)
  return generateDailyHistory(id)
}

export async function fetchHourlyOverview() {
  await delay()
  return generateHourlyData()
}
