$.ajax({
	type: "POST",
	url: "${base}/private/oms/order/confirm/array",
	dataType: "json",
	data: {
		ids: ids.toString()
	},
	async: true,
	success: function(data) {
		debugger
	}
});



var postData = {
	prolineId: prolineId,
	procode: procode,
	proname: proname
};
$.ajax({
	url: "${base}/private/promanage/purorder/lineSelectPro",
	type: "post",
	dataType: "json",
	data: postData,
	success: function(data) {
		if (data.length > 0) {
			gridObj2.options.settings.localData = data;
			gridObj2.refreshPage();
		} else {
			Toast.warning('没有数据');
		}
	}
})