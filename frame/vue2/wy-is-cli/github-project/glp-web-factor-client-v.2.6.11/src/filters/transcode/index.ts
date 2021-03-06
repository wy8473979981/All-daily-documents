import { getDictionary } from '@/config/dictionary'

export default function (value: string, name: string, defaultValue: string) {
  if (value === undefined) return defaultValue || ''
  const ret = getDictionary(name)
  return (ret && ret[value]) || defaultValue || value
}
