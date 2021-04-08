import number from '../number'

export default function (value: number, precise = 2) {
  if (isNaN(value)) return value
  return number(value * 100, '', precise, ' %')
}
