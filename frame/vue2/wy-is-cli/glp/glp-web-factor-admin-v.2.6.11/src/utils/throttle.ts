import Vue from 'vue'
const vm = new Vue({})
const wMap = new WeakMap()
export function tGet(url: string, el: any) {
  return new Promise(function(resolve, reject) {
    if (wMap.get(el)) {
      return
    }
    wMap.set(el, true)
    vm.$http.get<any>(url).then(res => {
      resolve(res)
    }).catch((res) => {
      reject(res)
    }).finally(() => {
      wMap.set(el, false)
    })
  })
}
export function tPost(url: string, params: any, el: any) {
  return new Promise(function(resolve, reject) {
    if (wMap.get(el)) {
      return
    }
    wMap.set(el, true)
    vm.$http.post<any>(url, params).then(res => {
      resolve(res)
    }).catch((res) => {
      reject(res)
    }).finally(() => {
      wMap.set(el, false)
    })
  })
}
