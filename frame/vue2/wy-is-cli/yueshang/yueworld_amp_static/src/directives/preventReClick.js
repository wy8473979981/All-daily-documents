const prCLick = {
	install (Vue) {
		Vue.directive('preventReClick', {
			inserted: function (el, binding) {
				el.addEventListener('click', () => {
					// console.log("el.disabled---1==",el.disabled)
					if(!el.disabled) {
						el.disabled = true
						setTimeout(() => {
							el.disabled = false
						},binding.value || 700)
					}else{

					}
				})
			}
		})
	}
}
export default prCLick
