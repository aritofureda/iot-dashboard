import { clsx } from 'clsx'

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-text-primary">{label}</label>}
      <input
        className={clsx(
          'w-full px-3 py-2 text-sm border border-border rounded-lg bg-white',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'placeholder:text-text-secondary/60',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
