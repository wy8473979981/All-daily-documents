import Vue from 'vue'

import number from './number'
import transcode from './transcode'
import date from './date'
import currency from './currency'
import percent from './percent'

const filters: any = {
  number,
  transcode,
  date,
  currency,
  percent
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export type FilterName = 'number' | 'transcode' | 'date' | 'currency' | 'percent'

export function filter (name: FilterName, value: any, ...args: any[]) {
  const fn = filters[name]
  if (!fn) throw new Error(`not found filter [${name}]`)
  return fn(value, ...args)
}
