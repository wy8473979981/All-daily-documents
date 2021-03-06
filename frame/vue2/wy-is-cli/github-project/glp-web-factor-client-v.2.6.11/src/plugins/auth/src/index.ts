import Auth, { AuthOptions } from './Auth'

export default function install (Vue: any, options: AuthOptions) {
  const auth = new Auth(options)
  Vue.prototype.$auth = auth
}
