import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import EmptyState from '../../components/feedback/EmptyState'
import { devices } from '../../api/mockData'
import { Plus, Pencil, Trash2, Shield } from 'lucide-react'

const typeLabels = {
  max_watt: 'Max Watt',
  max_kwh_day: 'Max kWh/Hari',
  offline_timeout: 'Offline Timeout (menit)',
}

export default function ThresholdConfig({ thresholds, onSave, onDelete }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ deviceId: '', type: 'max_watt', value: '', enabled: true })

  const openAdd = () => {
    setEditing(null)
    setForm({ deviceId: devices[0]?.id || '', type: 'max_watt', value: '', enabled: true })
    setModalOpen(true)
  }

  const openEdit = (threshold) => {
    setEditing(threshold)
    setForm({ deviceId: threshold.deviceId, type: threshold.type, value: String(threshold.value), enabled: threshold.enabled })
    setModalOpen(true)
  }

  const handleSave = () => {
    onSave({
      ...(editing || {}),
      deviceId: form.deviceId,
      type: form.type,
      value: parseFloat(form.value),
      enabled: form.enabled,
    })
    setModalOpen(false)
  }

  const deviceName = (id) => devices.find(d => d.id === id)?.name || id

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={openAdd}><Plus size={16} /> Tambah Threshold</Button>
      </div>

      {thresholds.length === 0 ? (
        <EmptyState icon={Shield} title="Belum ada threshold" description="Tambahkan threshold untuk monitoring otomatis" />
      ) : (
        <div className="space-y-3">
          {thresholds.map(t => (
            <Card key={t.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm font-medium text-text-primary">{deviceName(t.deviceId)}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="info">{typeLabels[t.type]}</Badge>
                      <span className="text-sm text-text-secondary">Nilai: {t.value}</span>
                      <Badge variant={t.enabled ? 'online' : 'offline'}>{t.enabled ? 'Aktif' : 'Nonaktif'}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(t)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(t.id)}><Trash2 size={14} className="text-danger" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Threshold' : 'Tambah Threshold'}>
        <div className="space-y-4">
          <Select
            label="Device"
            value={form.deviceId}
            onChange={e => setForm(f => ({ ...f, deviceId: e.target.value }))}
            options={devices.map(d => ({ value: d.id, label: d.name }))}
          />
          <Select
            label="Tipe"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            options={[
              { value: 'max_watt', label: 'Max Watt' },
              { value: 'max_kwh_day', label: 'Max kWh/Hari' },
              { value: 'offline_timeout', label: 'Offline Timeout (menit)' },
            ]}
          />
          <Input
            label="Nilai"
            type="number"
            value={form.value}
            onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={e => setForm(f => ({ ...f, enabled: e.target.checked }))}
              className="rounded border-border"
            />
            Aktif
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
