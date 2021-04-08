import options from './options'
import store from '@/store'

export { loadAsyncDictionary } from './async'

export function getDictionary (name: string): Record<string | number, string> {
  return store.getters['dictionary/options'][name] || options[name] || {}
}
