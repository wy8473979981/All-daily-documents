import Vue from 'vue'
import inputNumber from './input-number/input-number'
import trimInput from './trimInput/trimInput'
import inputFocus from './input-focus/input-focus'
Vue.directive('inputNumber', inputNumber)
Vue.directive('trimInput', trimInput)
Vue.directive('inputFocus', inputFocus)
