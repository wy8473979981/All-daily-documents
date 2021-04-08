import Vue from 'vue'

/**
 * @param context - 上下文对象，必传
 * @param url - 要获取页面的操作权限对应的url，不传则取当前页面
 * @return {Array} 返回对应页面的操作权限列表
 * author：lilong
*/
export function getAuth(context: any, url = '') {
  const pathName = url !== '' ? url : context.$route.name
  const auth = Vue.prototype.$auth.principle.authorities
  const item = auth.filter((item: any) => {
    return item.id === pathName
  })[0]
  if (item && item.children) {
    return item.children
  }
  return []
}
