import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.less'

import ElementPlus from 'element-plus';//为vue3项目特别更新的版本
import 'element-plus/dist/index.css';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
