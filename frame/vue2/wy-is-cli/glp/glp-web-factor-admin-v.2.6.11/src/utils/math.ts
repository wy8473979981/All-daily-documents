export function add(...number: any[]) {
  let total = 0
  if (number.length === 0) {
    return total
  }
  number.map((item: any, index: number) => {
    if (!isNaN(item)) {
      total = Number(item) * 10000 + total
    }
  })
  return total / 10000
}

export function addArray(number: any[]) {
  let total = 0
  if (number.length === 0) {
    return total
  }
  number.map((item: any, index: number) => {
    if (!isNaN(item)) {
      total = Number(item) * 10000 + total
    }
  })
  return total / 10000
}

export function sub(f: any, l: any) {
  if (isNaN(f) || isNaN(l)) {
    return 0
  }
  return (Number(f) * 10000 - Number(l) * 10000) / 10000
}
