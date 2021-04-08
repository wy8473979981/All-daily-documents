/*
	#author		lut000
    #date 		2019/11/07
    #purpose    注册全局组件
*/

import Vue from 'vue'

// 卡片组件
import Card from '@/components/Card'
// 详情页按钮组件
import Btns from '@/components/Btns'

Vue.component('Card',Card);
Vue.component('Btns',Btns);