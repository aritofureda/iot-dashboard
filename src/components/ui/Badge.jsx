import { clsx } from 'clsx'

const variants = {
  online: 'bg-green-100 text-success',
  offline: 'bg-gray-100 text-text-secondary',
  alert: 'bg-red-100 text-danger',
  warning: 'bg-yellow-100 text-warning',
  info: 'bg-blue-100 text-primary',
  active: 'bg-red-100 text-danger',
  resolved: 'bg-gray-100 text-text-secondary',
}

export default function Badge({ children, variant = 'info', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const labels = { online: 'Online', offline: 'Offline', alert: 'Alert' }
  return <Badge variant={status}>{labels[status] || status}</Badge>
}
