import checkNumer from './checkNumer'
import checkInput from './checkInput'
import checkInput2 from './checkInput2'
import checkInput3 from './checkInput3'
import checkInputOneHundred from './checkInputOneHundred'

const directive = Vue => {
  Vue.directive('filter-check-number', checkNumer)
  Vue.directive('filter-check-input', checkInput)
  Vue.directive('filter-check-input2', checkInput2)
  Vue.directive('filter-check-input3', checkInput3)
  Vue.directive('filter-check-input4', checkInputOneHundred)
}

export default directive
