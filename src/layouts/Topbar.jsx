import { Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAlertStore from '../store/alertStore'
import useSettingsStore from '../store/settingsStore'

export default function Topbar() {
  const navigate = useNavigate()
  const alertCount = useAlertStore(s => s.alerts.filter(a => a.status === 'active').length)
  const dashboardName = useSettingsStore(s => s.topbarName)

  return (
    <header className="h-14 bg-card-bg border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{dashboardName}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Alert bell */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"
        >
          <Bell size={20} />
          {alertCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              {alertCount}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary">
          <User size={18} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  )
}
