export default {
  update(el) {
    const input = el.querySelector('input')
    input.onblur = function(ev) {
      const val = ev.target.value
      ev.target.value = val.trim()
    }
  }
}
