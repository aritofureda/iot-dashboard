import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Cpu, AlertTriangle, FileText, Settings, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import useSettingsStore from '../store/settingsStore'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/devices', label: 'Devices', icon: Cpu },
  { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()
  const dashboardName = useSettingsStore(s => s.sidebarName)

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-screen bg-sidebar-bg flex flex-col transition-all duration-200 z-30',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-white/10">
        <Zap size={24} className="text-primary shrink-0" />
        {!collapsed && <span className="text-white font-semibold text-base truncate">{dashboardName}</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-sidebar-text hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-white/10 text-sidebar-text hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  )
}
