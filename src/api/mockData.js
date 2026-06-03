export const devices = [
  { id: 'DEV-001', name: 'Panel Utama Gedung A', location: 'Gedung A - Lt.1', status: 'online', watts: 2450, volts: 220.5, amps: 11.1, kwhToday: 18.4, costToday: 26582, peakWatt: 3200, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-01-15', tariff: 1444.70 },
  { id: 'DEV-002', name: 'Panel Produksi B1', location: 'Gedung B - Lt.1', status: 'online', watts: 5200, volts: 221.0, amps: 23.5, kwhToday: 42.1, costToday: 60821, peakWatt: 6800, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-02-20', tariff: 1444.70 },
  { id: 'DEV-003', name: 'AC Lantai 2', location: 'Gedung A - Lt.2', status: 'alert', watts: 8900, volts: 218.3, amps: 40.8, kwhToday: 65.3, costToday: 94339, peakWatt: 9100, lastSeen: '2026-06-02T10:29:00Z', installDate: '2025-03-10', tariff: 1444.70 },
  { id: 'DEV-004', name: 'Server Room', location: 'Gedung C - Basement', status: 'online', watts: 3100, volts: 220.1, amps: 14.1, kwhToday: 24.8, costToday: 35829, peakWatt: 3500, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-01-20', tariff: 1444.70 },
  { id: 'DEV-005', name: 'Lighting Parking', location: 'Area Parkir', status: 'offline', watts: 0, volts: 0, amps: 0, kwhToday: 5.2, costToday: 7512, peakWatt: 1200, lastSeen: '2026-06-01T18:45:00Z', installDate: '2025-04-05', tariff: 1444.70 },
  { id: 'DEV-006', name: 'Panel Gudang', location: 'Gudang Utama', status: 'online', watts: 1800, volts: 219.8, amps: 8.2, kwhToday: 14.2, costToday: 20515, peakWatt: 2400, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-05-12', tariff: 1444.70 },
  { id: 'DEV-007', name: 'Lift Gedung A', location: 'Gedung A - Shaft', status: 'online', watts: 4500, volts: 380.0, amps: 11.8, kwhToday: 31.5, costToday: 45508, peakWatt: 7500, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-02-01', tariff: 1444.70 },
  { id: 'DEV-008', name: 'Pompa Air', location: 'Gedung B - Basement', status: 'alert', watts: 6700, volts: 219.5, amps: 30.5, kwhToday: 48.9, costToday: 70646, peakWatt: 7000, lastSeen: '2026-06-02T10:28:00Z', installDate: '2025-06-15', tariff: 1444.70 },
  { id: 'DEV-009', name: 'Panel Kantin', location: 'Gedung A - Lt.1', status: 'online', watts: 3800, volts: 220.3, amps: 17.2, kwhToday: 28.6, costToday: 41318, peakWatt: 4200, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-03-22', tariff: 1444.70 },
  { id: 'DEV-010', name: 'Panel Workshop', location: 'Gedung D', status: 'online', watts: 7200, volts: 220.8, amps: 32.6, kwhToday: 52.4, costToday: 75702, peakWatt: 8500, lastSeen: '2026-06-02T10:30:00Z', installDate: '2025-07-01', tariff: 1444.70 },
]

// Generate 24-hour consumption data for overview chart
export function generateHourlyData() {
  const data = []
  const now = new Date()
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now)
    hour.setHours(now.getHours() - i, 0, 0, 0)
    data.push({
      time: hour.toISOString(),
      label: `${hour.getHours().toString().padStart(2, '0')}:00`,
      kwh: parseFloat((Math.random() * 30 + 15).toFixed(1)),
    })
  }
  return data
}

// Generate daily history for a device (30 days)
export function generateDailyHistory(deviceId) {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      kwh: parseFloat((Math.random() * 60 + 20).toFixed(1)),
      avgWatt: parseFloat((Math.random() * 4000 + 1000).toFixed(0)),
      cost: 0,
    })
  }
  data.forEach(d => { d.cost = Math.round(d.kwh * 1444.70) })
  return data
}

// Generate weekly history (12 weeks)
export function generateWeeklyHistory(deviceId) {
  const data = []
  for (let i = 11; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i * 7)
    data.push({
      date: `W${date.toISOString().split('T')[0]}`,
      kwh: parseFloat((Math.random() * 400 + 150).toFixed(1)),
      avgWatt: parseFloat((Math.random() * 4000 + 1000).toFixed(0)),
      cost: 0,
    })
  }
  data.forEach(d => { d.cost = Math.round(d.kwh * 1444.70) })
  return data
}

// Generate monthly history (12 months)
export function generateMonthlyHistory(deviceId) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const data = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    data.push({
      date: `${months[date.getMonth()]} ${date.getFullYear()}`,
      kwh: parseFloat((Math.random() * 1500 + 500).toFixed(1)),
      avgWatt: parseFloat((Math.random() * 4000 + 1000).toFixed(0)),
      cost: 0,
    })
  }
  data.forEach(d => { d.cost = Math.round(d.kwh * 1444.70) })
  return data
}

export const alerts = [
  { id: 'ALR-001', deviceId: 'DEV-003', deviceName: 'AC Lantai 2', type: 'high_watt', message: 'Konsumsi melebihi batas 8000W', value: 8900, threshold: 8000, timestamp: '2026-06-02T09:15:00Z', status: 'active' },
  { id: 'ALR-002', deviceId: 'DEV-008', deviceName: 'Pompa Air', type: 'high_kwh', message: 'Konsumsi harian melebihi 45 kWh', value: 48.9, threshold: 45, timestamp: '2026-06-02T08:30:00Z', status: 'active' },
  { id: 'ALR-003', deviceId: 'DEV-005', deviceName: 'Lighting Parking', type: 'offline', message: 'Device offline lebih dari 15 menit', value: null, threshold: 15, timestamp: '2026-06-01T19:00:00Z', status: 'active' },
  { id: 'ALR-004', deviceId: 'DEV-003', deviceName: 'AC Lantai 2', type: 'high_watt', message: 'Konsumsi melebihi batas 8000W', value: 8200, threshold: 8000, timestamp: '2026-06-01T14:20:00Z', status: 'resolved' },
  { id: 'ALR-005', deviceId: 'DEV-010', deviceName: 'Panel Workshop', type: 'high_kwh', message: 'Konsumsi harian melebihi 50 kWh', value: 55.2, threshold: 50, timestamp: '2026-06-01T16:45:00Z', status: 'resolved' },
  { id: 'ALR-006', deviceId: 'DEV-007', deviceName: 'Lift Gedung A', type: 'high_watt', message: 'Konsumsi melebihi batas 7000W', value: 7500, threshold: 7000, timestamp: '2026-05-31T11:10:00Z', status: 'resolved' },
]

export const thresholds = [
  { id: 'THR-001', deviceId: 'DEV-003', type: 'max_watt', value: 8000, enabled: true },
  { id: 'THR-002', deviceId: 'DEV-008', type: 'max_kwh_day', value: 45, enabled: true },
  { id: 'THR-003', deviceId: 'DEV-005', type: 'offline_timeout', value: 15, enabled: true },
  { id: 'THR-004', deviceId: 'DEV-010', type: 'max_kwh_day', value: 50, enabled: true },
  { id: 'THR-005', deviceId: 'DEV-007', type: 'max_watt', value: 7000, enabled: true },
]

export const settings = {
  topbarName: 'IoT Electricity Monitor',
  sidebarName: 'IoT Monitor',
  tariffPerKwh: 1444.70,
  refreshInterval: 10,
  timezone: 'Asia/Jakarta',
}
