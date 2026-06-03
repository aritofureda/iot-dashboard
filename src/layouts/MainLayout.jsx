import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import useAlertStore from '../store/alertStore'
import { clsx } from 'clsx'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const loadAlerts = useAlertStore(s => s.loadAlerts)

  // Load alerts on mount for badge count
  useEffect(() => {
    loadAlerts()
  }, [loadAlerts])

  // Auto-collapse on tablet
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1280)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-content-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={clsx('transition-all duration-200', collapsed ? 'ml-16' : 'ml-60')}>
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
