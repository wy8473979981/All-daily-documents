export default function (value: number, unit = '', precise = 2, suffix = '') {
  if (isNaN(value)) return value
  const text = Number(value).toFixed(precise)
  const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'))
  const f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, (_, c) => _ + ',').split('').reverse().join('') + bit
  return unit + f + suffix
}
