$(function() {
	/*	//	交易
		$(".q").click(function(e) {
			e.stopPropagation();
			$(this).addClass("active").siblings().removeClass("active");
			$(".bottom").show();

		});
		$(".bottom li").click(function() {
			$(".q p").text($(this).text());
			$(".bottom").hide();
		});

		//	客户管理
		$(".kh").click(function(e) {
			e.stopPropagation();
			$(".b1").show();
		});
		$(".b1 li").click(function() {
			$(".kh p").text($(this).text());
			$(".b1").hide();
		});

		//	系统设置
		$(".xt").click(function() {
			$(".b2").show();

		});
		$(".b2 li").click(function() {
			$(".xt p").text($(this).text());
			$(".b2").hide();
		});*/

	$('.father li').click(function() {
		$(this).addClass("active").siblings().removeClass("active"); //removeClass就是删除当前其他类；只有当前对象有addClass("selected")；siblings()意思就是当前对象的同级元素，removeClass就是删除； 
		$(".box > ul").eq($('.father li').index(this)).show().siblings().hide();
	});

	/*document.addEventListener("click", function(e) {
		var ele = e.target.className;
		console.log(ele);
		if (ele != "bottom") $(".bottom").hide();

	})
	document.addEventListener("click", function(e) {
		var ele = e.target.className;
		console.log(ele);
		if (ele != "b1") $(".b1").hide();
	})*/
	[{
		"id": 29,
		"status": 0,
		"status_name": "新增",
		"external_documents_no": "",
		"outawb_no": "",
		"asn_number": "POWR201607110001",
		"asn_date": "2016-06-28 00:00:00",
		"asn_type": 1,
		"order_type": 0,
		"expected_arrival_date": "2016-06-30 00:00:00",
		"source_document_number": 45,
		"create_user": "896d62c6d6ff4b73b3b322b6762eec7d",
		"create_time": "2016-07-11 19:20:15",
		"sj_finish_date": null,
		"previous_status": 0,
		"pay_flag": 0,
		"dc_supplier_id": 1,
		"reserved01": null,
		"reserved02": null,
		"reserved03": null,
		"reserved04": null,
		"reserved05": null,
		"wms_setting_warehouse_id": 2,
		"oms_procurement_order_head_id": null,
		"is_deleted": 0,
		"warehousename": "方承仓库",
		"sysname": "superadmin"
	}]
});