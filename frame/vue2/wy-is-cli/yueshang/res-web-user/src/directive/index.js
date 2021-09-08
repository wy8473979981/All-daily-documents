import checkNumer from './checkNumer'
import checkNumer2 from './checkNumer2'
import checkInput from './checkInput'
import checkInput2 from './checkInput2'
import disDbclick from './disDbclick'
import limitNumber from './limitNumber'

const directive = Vue => {
  Vue.directive('filter-check-number', checkNumer)
  Vue.directive('filter-check-number2', checkNumer2)
  Vue.directive('filter-check-input', checkInput)
  Vue.directive('filter-check-input2', checkInput2)
  Vue.directive('dis-dbclick', disDbclick)
  Vue.directive('limit-number', limitNumber)
}

export default directive
