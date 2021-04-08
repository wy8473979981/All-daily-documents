import Vue from 'vue'
import { AsyncDict } from './type'

let cache: Record<string, AsyncDict[]> = {}
let cacheOwner = ''

// TODO 需要在适当的时机清除缓存， 1. 不是同一个登录用户的时候
function clearCache () {
  cache = {}
}

export function putInCache (key: string, value: AsyncDict[]) {
  const username = Vue.prototype.$auth.username
  if (username !== cacheOwner) clearCache()
  cacheOwner = username
  cache[key] = value
}

export function getFromCache (key: string): AsyncDict[] {
  const username = Vue.prototype.$auth.username
  if (username !== cacheOwner) clearCache()
  return cache[key]
}
