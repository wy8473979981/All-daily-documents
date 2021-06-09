export function toast(content){
	uni.showToast({
		title: content,
		icon: 'none',
		duration: 1600
	})
}

export function loading(title = ''){
	uni.showLoading({
		mask: true,
		title: title
	});
}