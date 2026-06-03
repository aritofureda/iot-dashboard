import { useState } from 'react'
import useSettingsStore from '../../store/settingsStore'
import Card, { CardHeader } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'

export default function SettingsPage() {
  const settings = useSettingsStore()
  const updateSettings = useSettingsStore(s => s.updateSettings)

  const [form, setForm] = useState({
    topbarName: settings.topbarName,
    sidebarName: settings.sidebarName,
    tariffPerKwh: settings.tariffPerKwh,
    refreshInterval: settings.refreshInterval,
    timezone: settings.timezone,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    updateSettings({
      ...form,
      tariffPerKwh: parseFloat(form.tariffPerKwh),
      refreshInterval: parseInt(form.refreshInterval),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
      <Card className="max-w-xl">
        <CardHeader title="Pengaturan Umum" subtitle="Konfigurasi dashboard" />
        <div className="space-y-4">
          <Input
            label="Nama Topbar"
            value={form.topbarName}
            onChange={e => handleChange('topbarName', e.target.value)}
          />
          <Input
            label="Nama Sidebar"
            value={form.sidebarName}
            onChange={e => handleChange('sidebarName', e.target.value)}
          />
          <Input
            label="Tarif per kWh (Rp)"
            type="number"
            step="0.01"
            value={form.tariffPerKwh}
            onChange={e => handleChange('tariffPerKwh', e.target.value)}
          />
          <Select
            label="Refresh Interval"
            value={form.refreshInterval}
            onChange={e => handleChange('refreshInterval', e.target.value)}
            options={[
              { value: 5, label: '5 detik' },
              { value: 10, label: '10 detik' },
              { value: 30, label: '30 detik' },
              { value: 60, label: '60 detik' },
            ]}
          />
          <Select
            label="Timezone"
            value={form.timezone}
            onChange={e => handleChange('timezone', e.target.value)}
            options={[
              { value: 'Asia/Jakarta', label: 'WIB (Asia/Jakarta)' },
              { value: 'Asia/Makassar', label: 'WITA (Asia/Makassar)' },
              { value: 'Asia/Jayapura', label: 'WIT (Asia/Jayapura)' },
            ]}
          />
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave}>Simpan</Button>
            {saved && <span className="text-sm text-success font-medium">Tersimpan!</span>}
          </div>
        </div>
      </Card>
    </div>
  )
}
