import { date, datetime } from '@/config/form'
import { format } from '@/utils/date'

export default function (value: number, mode: 'D' | 'T' | string = 'D') {
  if (!value) return value
  if (isNaN(value) || value === null) return value
  const f = mode === 'D' ? date : (mode === 'T' ? datetime : mode)
  return format(new Date(+value), f)
}
