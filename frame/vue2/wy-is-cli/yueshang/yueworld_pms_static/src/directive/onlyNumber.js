/*
 * @Author: fhj
 * @LastEditors: xza
 * @desc: max:最大值 min:最小值, decimal小数点 默认2位 use:是否开启
 */
export const onlyNumber = {
  inserted(el, binding, vNode) {
    const node = vNode
    const defaultValue = { max: 9999999999.99, min: 0, decimal: 2, use: true }
    binding.value = { ...defaultValue, ...binding.value }
    if (!binding.value.use) return
    let content, setValue
    setValue = val => {
      console.log(node.context)
      if (binding.value.model.length === 1) {
        node.context[binding.value.model[0]] = val
      } else if (binding.value.model.length === 2) {
        node.context[binding.value.model[0]][binding.value.model[1]] = val
      } else if (binding.value.model.length === 3) {
        node.context[binding.value.model[0]][binding.value.model[1]][binding.value.model[2]] = val
      } else if (binding.value.model.length === 4) {
        console.log(node.context[binding.value.model[0]][binding.value.model[1]][binding.value.model[2]])
        node.context[binding.value.model[0]][binding.value.model[1]][binding.value.model[2]][binding.value.model[3]] = val
      } else if (binding.value.model.length === 5) {
        console.log(node.context[binding.value.model[0]][binding.value.model[1]][binding.value.model[2]])
        node.context[binding.value.model[0]][binding.value.model[1]][binding.value.model[2]][binding.value.model[3]][binding.value.model[4]] = val
      }

      if (binding.value.model.length === 0) {
        binding.value.modelData = val
      }
    }
    // 按键按下=>只允许输入 数字/小数点
    el.addEventListener('keypress', event => {
      const e = event || window.event
      const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
      content = e.target.value
      // 定义方法,阻止输入 (1非指定键， 2.已存在小数点， 3.输入小数点，且位数为0，4。输入值大于最大值)
      if ((!/\d|\./.test(inputKey) && !e.ctrlKey && inputKey !== '-') || (content.indexOf('.') > 0 && inputKey === '.') || (inputKey === '.' && binding.value.decimal === 0) || e.target.value > binding.value.max) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
      }
    })
    // 按键弹起=>并限制最大最小
    el.addEventListener('keyup', event => {
      const e = event || window.event
      content = (!content && 0.0) || parseFloat(e.target.value)
      const argMax = parseFloat(binding.value.max)
      if (content > argMax) {
        setValue(argMax)
        content = argMax
      }
    })
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', event => {
      const e = event || window.event
      const argMin = parseFloat(binding.value.min)
      if (e.target.value === '') { return }
      if (!isNaN(Number(e.target.value)) && Number(e.target.value) !== 0) {
        content = (!content && 0.0) || parseFloat(e.target.value || 0)
        setValue(content.toFixed(parseFloat(binding.value.decimal)))
      } else if (!isNaN(parseFloat(e.target.value))) {
        setValue(parseFloat(e.target.value))
      } else {
        setValue('')
      }
      if (content < argMin) {
        setValue(argMin)
        content = argMin
      }
    })
  }
}
