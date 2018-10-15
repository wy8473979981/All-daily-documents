/* 手风琴的插件*/ 
;$(function() {
	$.fn.extend({
		huFuShouHide: function() {
			
			var $hufuLiList = $(this).find(".hufu-li-list");
			
			
			$hufuLiList.hover(function() {
				$(this).find("span").css({
					"display": "none"
				});
				$(this).find("div").css({
					"display": "block"
				});
				$hufuLiList.find("div").not($(this).find("div")).css({
					"display": "none"
				});
				$hufuLiList.find("span").not($(this).find("span")).css({
					"display": "block"
				});
			}, function() {
				$(this).find("div").css({
					"display": "block"
				});
			});
		}
	});
});