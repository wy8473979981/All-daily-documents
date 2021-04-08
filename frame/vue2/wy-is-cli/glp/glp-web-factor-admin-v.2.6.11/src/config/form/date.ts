import { parse, trunc } from '@/utils/date'
import { d } from './options'

export const date = 'yyyy-MM-dd'
export const datetime = `${date} HH:mm:ss`

export function dateDisabledFn (value: string, flag: 'gt' | 'ge' | 'lt' | 'le' = 'gt', format: string = datetime) {
  return (date: Date) => {
    if (!value) return false
    const targetDate = parse(value, format)
    const ret = trunc(date).getTime() - trunc(targetDate).getTime()
    if (flag === 'gt' && ret > 0) return false
    if (flag === 'ge' && ret >= 0) return false
    if (flag === 'lt' && ret < 0) return false
    if (flag === 'le' && ret <= 0) return false
    return true
  }
}
