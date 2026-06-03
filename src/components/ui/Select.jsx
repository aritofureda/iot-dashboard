import { clsx } from 'clsx'

export default function Select({ label, options, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-text-primary">{label}</label>}
      <select
        className={clsx(
          'w-full px-3 py-2 text-sm border border-border rounded-lg bg-white',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
