export default {
  update(el) {
    const input = el.querySelector('input')
    input.onkeyup = function(ev) {
      const val = ev.target.value
        // .replace(/[^\d^\.]+/g, '')
        .replace(/[^\d^.]+/g, '')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      ev.target.value = val
    }
  }
}
