

// 禁止快速双双击
export default {
  bind: function(el,binding,vnode) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(() => {
          el.style.cursor = 'pointer'
          el.disabled = false
        }, 1500)
      }
    })
  }
}
