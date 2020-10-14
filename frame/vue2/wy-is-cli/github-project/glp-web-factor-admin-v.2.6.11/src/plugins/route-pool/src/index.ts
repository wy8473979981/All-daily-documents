import RoutePool, { RoutePoolOptions } from './RoutePool'

export default function install (Vue: any, options: RoutePoolOptions) {
  const rp = new RoutePool({ propsData: { options } })
  Vue.prototype.$rp = rp
}
