import checkNumer from './checkNumer'
import checkInput from './checkInput'
import checkInput2 from './checkInput2'
import checkInput3 from './checkInput3'
import checkInput4 from './checkInput4'
import checkInput5 from './checkInput5'
import checkInput6 from './checkInput6'

const directive = Vue => {
  Vue.directive('filter-check-number', checkNumer)
  Vue.directive('filter-check-input', checkInput)
  Vue.directive('filter-check-input2', checkInput2)
  Vue.directive('filter-check-input3', checkInput3)
  Vue.directive('filter-check-input4', checkInput4)
  Vue.directive('filter-check-input5', checkInput5)
  Vue.directive('filter-check-input6', checkInput6)
}

export default directive
