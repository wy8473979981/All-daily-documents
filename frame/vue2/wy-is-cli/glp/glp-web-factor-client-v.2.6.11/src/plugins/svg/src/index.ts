import SvgIcon from './svg-icon.vue'

const req = (require as any).context('./icons', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
export default function install (Vue: any) {
  Vue.component(SvgIcon.name, SvgIcon)
}
