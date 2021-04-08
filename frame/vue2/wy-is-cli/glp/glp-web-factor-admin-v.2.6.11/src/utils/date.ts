const flags = {
  yyyy: 'FullYear',
  MM: 'Month',
  M: 'Month',
  dd: 'Date',
  d: 'Date',
  HH: 'Hours',
  mm: 'Minutes',
  ss: 'Seconds'
}

const dateRE = new RegExp(Object.keys(flags).map((v, i) => `${i === 0 ? '' : '|'}(${v})`).join(''), 'g')

export function parse (text: string, format = 'yyyy-MM-dd'): Date {
  const d = new Date()
  Object.entries(flags).forEach(([k, v]) => {
    const n = getNum(k)
    if (n !== undefined) (d as any)['set' + v](n)
  })
  return d

  function getNum (str: string) {
    const idx = format.indexOf(str)
    return idx < 0 ? undefined : +(text.substr(idx, str.length < 2 ? 2 : str.length).replace(/\D/g, '')) + (['MM', 'M'].includes(str) ? -1 : 0)
  }
}

export function format (date: Date, format = 'yyyy-MM-dd'): string {
  const fn = (_: string) => (date as any)['get' + (flags as any)[_]]()
  const add = (_: string) => _ === 'MM' ? 1 : 0
  return format.replace(dateRE, (_, c) => ('0' + (fn(_) + add(_))).substr(-_.length))
}

export function between (ref: Date, start?: Date, end?: Date) {
  if (start && ref.getTime() < start.getTime()) return false
  if (end && ref.getTime() > end.getTime()) return false
  return true
}

export function addDays (ref: Date, num: number): Date {
  const day = ref.getDate()
  const ret = new Date(ref.getTime())
  ret.setDate(day + num)
  return ret
}

export function trunc (ref: Date): Date {
  const ret = new Date(ref.getTime())
  ret.setHours(0)
  ret.setMinutes(0)
  ret.setSeconds(0)
  return ret
}
