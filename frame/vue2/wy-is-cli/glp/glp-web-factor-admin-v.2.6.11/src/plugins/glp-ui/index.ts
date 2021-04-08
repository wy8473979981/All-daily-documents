import Vue from 'vue'
import GlpUI from 'glp-ui'
import { ossDownload } from '@/utils/oos'

Vue.use(GlpUI, { download: ossDownload })
