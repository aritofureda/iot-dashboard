import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export function formatDateTime(dateStr) {
  return format(parseISO(dateStr), 'dd MMM yyyy HH:mm', { locale: id })
}

export function formatDateOnly(dateStr) {
  return format(parseISO(dateStr), 'dd MMM yyyy', { locale: id })
}

export function formatTimeAgo(dateStr) {
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true, locale: id })
}
