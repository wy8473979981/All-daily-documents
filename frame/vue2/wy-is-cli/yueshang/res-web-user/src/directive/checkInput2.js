// 过滤输入值为数字
export default {
  bind: function (el, binding, vnode) {
    el.handler = function (e) {
      let val = e.target.value
      // 清除"数字"以外的字符
      val = val.replace(/[^\d]/g, '')
      val = val.replace(/,/g, '')
      e.target.value = val
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', val)
      } else {
        vnode.elm.dispatchEvent(new CustomEvent('input', val))
      }
    }
    el.addEventListener('input', el.handler)
  },
  unbind: function (el) {
    el.removeEventListener('input', el.handler)
  }
}
