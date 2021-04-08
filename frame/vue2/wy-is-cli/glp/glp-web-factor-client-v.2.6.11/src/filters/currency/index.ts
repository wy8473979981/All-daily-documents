import number from '../number'

export default function (value: number, unit = '¥', precise = 2) {
  return number(value, unit, precise)
}
