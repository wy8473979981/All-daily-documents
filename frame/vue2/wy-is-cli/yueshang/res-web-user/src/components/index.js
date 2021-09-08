import paginator from './paginator'
import ysLogo from './ysLogo'
import authBox from './authBox.vue'
import inputAutocomplete from './inputAutocomplete'
import menuTree from './menuTree'
import searchUser from './searchUser'
import searchOrg from './searchOrg'
import trafficCostDetail from './trafficCostDetail'
import selectBank from './selectBank'
import selectShop from './selectShop'
import tTextarea from './t-textarea'
import richEditor from './richEditor'
import dCol from './dCol'
import dlCol from './dlCol'
import dRadioGroup from './dRadioGroup'
import dRadioGroupBoolean from './dRadioGroupBoolean'
import dRadioGroupString from './dRadioGroupString'
import oneFile from './oneFile'
import manyFiles from './manyFiles'
import selectScene from '@/components/selectScene'
import searchCostType from './searchCostType'
import selectAssmModel from '@/components/selectAssmModel'
import DragContract from './DragContract/index.vue'

const config = {
  install: (Vue) => {
    Vue.component('ys-paginator', paginator)
    Vue.component('ys-logo', ysLogo)
    Vue.component('auth-box', authBox)
    Vue.component('input-autocomplete', inputAutocomplete)
    Vue.component('menu-tree', menuTree)
    Vue.component('search-user', searchUser)
    Vue.component('search-org', searchOrg)
    Vue.component('trafficCostDetail', trafficCostDetail)
    Vue.component('select-bank', selectBank)
    Vue.component('select-shop', selectShop)
    Vue.component('t-textarea', tTextarea)
    Vue.component('rich-editor', richEditor)
    Vue.component('d-col', dCol)
    Vue.component('dl-col', dlCol)
    Vue.component('d-radio-group', dRadioGroup)
    Vue.component('d-radio-group-boolean', dRadioGroupBoolean)
    Vue.component('d-radio-group-string', dRadioGroupString)
    Vue.component('one-file', oneFile)
    Vue.component('many-files', manyFiles)
    Vue.component('select-scene', selectScene)
    Vue.component('search-costType', searchCostType)
    Vue.component('select-assmModel', selectAssmModel)
    Vue.component('DragContract', DragContract)
  }
}
export default config
