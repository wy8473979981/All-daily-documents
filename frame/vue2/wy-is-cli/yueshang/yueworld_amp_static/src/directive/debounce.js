/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:防抖
 */
export const debounce = {
  inserted(el, options) {
    let defaultOptions = { time: 1000 } // 默认参数 time=>防抖时间
    const defaultDisable = el.disabled// 默认是否禁用
    defaultOptions = { ...defaultOptions, ...options.value }
    let timer
    // 点击后禁用按钮。倒计时解开
    el.addEventListener('click', event => {
      if (defaultDisable) { // 默认禁用
        return false
      }

      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        options.value.fn()
      }, defaultOptions.time)
    })
  }
}
