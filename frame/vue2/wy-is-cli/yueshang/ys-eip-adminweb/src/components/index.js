import ysNLogo from './ys-n-logo/index.vue'
import inputAutocomplete from './inputAutocomplete'
import menuTree from './menuTree'
import searchNode from './searchNode'
import searchUser from './searchUser'
import echart from './ys-n-echart/index.vue'
import ysNTooltip from './ys-n-tooltip/index.vue'
import ysNNavList from './ys-n-navList/index.vue'
import ysNAuthBox from './ys-n-authBox/index.vue'
import ysNSearch from './ys-n-search/index.vue'
import ysNTable from './ys-n-table/index.vue'
import ysNPaginator from './ys-n-paginator/index.vue'
import ysNDialog from './ys-n-dialog/index.vue'
import ysNButton from './ys-n-button/index.vue'
import ysNAutocomplete from './ys-n-autocomplete/index.vue'
import ysNAutoSelect from './ys-n-autoSelect/index.vue'
import ysNSection from './ys-n-section/index.vue'
const config = {
  install: (Vue) => {
    Vue.component('ysNTooltip', ysNTooltip)
    Vue.component('ysNNavList', ysNNavList)
    Vue.component('ysNAuthBox', ysNAuthBox)
    Vue.component('ysNLogo', ysNLogo)
    Vue.component('ysNSearch', ysNSearch)
    Vue.component('ysNTable', ysNTable)
    Vue.component('ysNPaginator', ysNPaginator)
    Vue.component('ysNDialog', ysNDialog)
    Vue.component('ysNButton', ysNButton)
    Vue.component('ysNAutocomplete', ysNAutocomplete)
    Vue.component('ysNAutoSelect', ysNAutoSelect)
    Vue.component('ysNSection', ysNSection)

    Vue.component('input-autocomplete', inputAutocomplete)
    Vue.component('menu-tree', menuTree)
    Vue.component('search-node', searchNode)
    Vue.component('search-user', searchUser)
    Vue.component('ys-echart', echart)
    
  }
}
export default config
