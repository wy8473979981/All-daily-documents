import YsNTable from './YsNTable'
import YsNForm from './YsNForm'
import YsNChart from './YsNChart'
import YsNList from './YsNList'
import YsNSearch from './YsNSearch'

const config = {
  install: (Vue) => {
    Vue.component('ys-n-table', YsNTable)
    Vue.component('ys-n-form', YsNForm)
    Vue.component('ys-n-chart', YsNChart)
    Vue.component('ys-n-list', YsNList)
    Vue.component('ys-n-search', YsNSearch)
  }
}

export default config