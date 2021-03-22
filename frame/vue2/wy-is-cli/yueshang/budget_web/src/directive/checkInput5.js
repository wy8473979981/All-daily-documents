// 过滤输入值为数字（正负整数）
export default {
  bind: function (el, binding, vnode) {
    el.handler = function (e) {
      let val = e.target.value
      const first = val.charAt(0)
      console.log('val1=' + val + '--first=' + first)
      // 清除"数字"和"."以外的字符
      val = val.replace(/[^\d]/g, '')
      if (first === '-') {
        console.log('val2=' + val + '--first=' + first)
        val = '-' + val
      }
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
