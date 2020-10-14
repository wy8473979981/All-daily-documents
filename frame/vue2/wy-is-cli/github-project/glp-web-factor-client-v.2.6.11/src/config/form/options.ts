import { getDictionary, loadAsyncDictionary } from '@/config/dictionary'

export interface AsyncParams {
  store?: any;
}

// 同步字典
export const d = getDictionary

// 异步响应式字典
export const a = (name: string, params: AsyncParams = {}, reload = true) => {
  return ({ form }: any) => loadAsyncDictionary(name, { form, store: params.store }, reload)
}

// 异步字典
export const p = (name: string, reload = true) => {
  return loadAsyncDictionary(name, {}, reload)
}

// select 远程
// TODO 时序问题
export const remote = (name: string) => {
  return {
    options: a(name), // 默认查询， 根据实际情况决定是否需要
    filterable: true,
    remote: true,
    remoteMethod: (q: string, cb: Function) => {
      loadAsyncDictionary(name, { q }, true).then(data => cb(data))
    }
  }
}
