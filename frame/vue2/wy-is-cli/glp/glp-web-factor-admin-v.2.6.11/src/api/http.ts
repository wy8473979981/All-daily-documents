import Vue from 'vue'
import Http from '@/plugins/http/src/Http'

export function http (): Http {
  return Vue.prototype.$http
}
