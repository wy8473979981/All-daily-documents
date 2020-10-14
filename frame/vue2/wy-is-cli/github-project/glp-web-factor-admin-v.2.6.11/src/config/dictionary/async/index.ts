import options from './options'
import { AsyncDict, AsyncDictionaryParams } from './type'
import { getFromCache, putInCache } from './cache'

export function loadAsyncDictionary (name: string, params: AsyncDictionaryParams = {}, reload = false) {
  if (!reload && getFromCache(name)) {
    return Promise.resolve(getFromCache(name))
  }
  const fn = options[name]
  if (!fn) throw new Error(`not found async dictionary name [${name}]`)
  return fn(params).then(data => {
    putInCache(name, data)
    return data
  })
}
