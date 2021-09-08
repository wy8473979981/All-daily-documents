/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 */
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'
import * as optionsList from '@/utils/optionsList'

/**
 * 数字formatter
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 首字母大写
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 根据option返回中文
 * @param {String} string
 */
export function getOptionsLabel(str, label) {
  // debugger
  let newList = label
  if (typeof label === 'string') {
    newList = optionsList[label] || []
  }
  const list = newList.filter(item => { return item.value === str })
  const listNum = newList.filter(item => { return item.label === str })
  if (typeof str === 'number') {
    if (list.length > 0) {
      return list[0].label
    } else {
      return ''
    }
  }
  if (typeof str === 'string') {
    if (listNum.length > 0) {
      return listNum[0].value
    } else {
      return ''
    }
  }
}

