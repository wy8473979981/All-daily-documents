import blockHead from './blockHead'
import close from './close'
import paginator from './paginator'
import ysTabs from './ysTabs'
import ysTabHead from './ysTabHead'
import ysLogo from './ysLogo'
import authBox from './authBox'
// import ysRichEditor from './ysRichEditor'
import ysDialog from './ysDialog'
import ysModalBtnGroup from './ysModalBtnGroup'
import ysIcon from './ysIcon'
import inputAutocomplete from './inputAutocomplete'
import ysTable from './ysTable'
import tableHeaderDrawer from './tableHeaderDrawer'

const config = {
  install: (Vue) => {
    Vue.component('ys-block-head', blockHead)
    Vue.component('ys-close', close)
    Vue.component('ys-paginator', paginator)
    Vue.component('ys-tabs', ysTabs)
    Vue.component('ys-tab-head', ysTabHead)
    Vue.component('ys-logo', ysLogo)
    Vue.component('auth-box', authBox)
    // Vue.component('ys-rich-editor', ysRichEditor)
    Vue.component('ys-dialog', ysDialog)
    Vue.component('ys-modal-btn-group', ysModalBtnGroup)
    Vue.component('ys-icon', ysIcon)
    Vue.component('ys-table', ysTable)
    Vue.component('ys-tableHeaderDrawer', tableHeaderDrawer)
  }
}
export default config
