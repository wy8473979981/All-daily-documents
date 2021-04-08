import { filter, FilterName } from '@/filters'
import { capitalize } from '@/utils/lang'

export const formatter = (filterName: FilterName, ...args: any[]) => {
  return (value: string, model: string, form: Record<string | number, any>) => {
    return filter(filterName, value, ...args)
  }
}

// form 表单映射api
export interface MappingOptions {
  dateType?: 'E' | 'F';
}

const defaultMappingOptions: MappingOptions = {
  dateType: 'E'
}

export function mapping (form: Record<string, any> = {}, options: MappingOptions = {}) {
  const config: MappingOptions = Object.assign({}, defaultMappingOptions, options)
  const ret: Record<string, any> = {}
  Object.entries(form).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    const isDate = (k.endsWith('Time') || k.endsWith('Date')) && Array.isArray(v)
    if (isDate) {
      if (v[0]) ret[resolveDateName(k)] = v[0]
      if (v[1]) ret[resolveDateName(k, false)] = v[1] ? (v[1] || '').replace('00:00:00', '23:59:59') : v[1]
    } else {
      ret[k] = v
    }
  })
  return ret

  function resolveDateName (name: string, isBegin = true): string {
    const type = config.dateType || 'E'
    const b = 'begin'
    const e = 'end'
    if (type === 'E') return `${name}${isBegin ? capitalize(b) : capitalize(e)}`
    else if (type === 'F') return `${isBegin ? b : e}${capitalize(name)}`
    else return name
  }
}
