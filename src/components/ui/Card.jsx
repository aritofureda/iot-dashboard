import { clsx } from 'clsx'

export default function Card({ children, className, padding = true, ...props }) {
  return (
    <div
      className={clsx(
        'bg-card-bg border border-border rounded-lg',
        padding && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
