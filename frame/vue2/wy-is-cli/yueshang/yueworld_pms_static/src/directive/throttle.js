/*
 * @Author: fhj
 * @LastEditors: fhj
 * 节流
 */
export const throttle = {
  inserted(el, options) {
    let isClick = true // 是否可以点击
    let defaultOptions = { time: 1000 } // 默认参数 time=>节流时间
    const defaultDisable = el.disabled// 默认是否禁用
    defaultOptions = { ...defaultOptions, ...options.value }
    // 点击后禁用按钮。倒计时解开
    el.addEventListener('click', event => {
      if (defaultDisable) { // 默认禁用不触发
        return false
      }
      if (isClick) { // 可点击状态
        isClick = false
        el.disabled = true
        setTimeout(() => {
          isClick = true
          el.disabled = false
        }, defaultOptions.time)
      }
    })
  }
}

