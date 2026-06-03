import { Inbox } from 'lucide-react'

export default function EmptyState({ icon: Icon = Inbox, title = 'Tidak ada data', description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
      <Icon size={48} strokeWidth={1} className="mb-4" />
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}
