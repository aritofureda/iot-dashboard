import { AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-danger">
      <AlertTriangle size={48} strokeWidth={1} className="mb-4" />
      <h3 className="text-base font-semibold mb-1">Terjadi Kesalahan</h3>
      <p className="text-sm text-text-secondary mb-4">{message}</p>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Coba Lagi</Button>}
    </div>
  )
}
