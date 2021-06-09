import pageTop from "@/components/page-header/page-top.vue"
import pageHeader from "@/components/page-header/page-header.vue"
import pageContent from "@/components/page-content/page-content.vue"
import appTable from "@/components/table/index"
import pageTitle from "@/components/page-title/page-title.vue"
import pageLineTitle from "@/components/page-title/page-line-title.vue"
import checkone from "@/components/checkone/checkone.vue"
import pageOneLine from "@/components/page-oneline/page-oneline.vue"
import pagtTab from "@/components/page-tab/page-tab.vue"

import VanActionSheet from "@/wxcomponents/vant/dist/action-sheet/index.vue"

import wmWatermark from '@/components/wm-watermark/wm-watermark.vue';

import ysNTab from '@/components/ys-n-tab/index.vue';
const config = {
  install: (Vue) => {
    Vue.component('page-top', pageTop)
    Vue.component('page-header', pageHeader)
    Vue.component('page-content', pageContent)
    Vue.component('app-table', appTable)
    Vue.component('page-title', pageTitle)
    Vue.component('page-line-title', pageLineTitle)
    Vue.component('checkone', checkone)
    Vue.component('page-oneline', pageOneLine)
    Vue.component('van-action-sheet', VanActionSheet)
    Vue.component('van-tab', pagtTab)
    Vue.component('wm-watermark', wmWatermark)
    Vue.component('ysNTab', ysNTab)
  }
}
export default config
