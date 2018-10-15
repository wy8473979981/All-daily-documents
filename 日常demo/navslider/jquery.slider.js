!(function($) {
	$.fn.extend({
		slider: function(sibling) {
			sibling.first().after("<li id='bgli'></li>");
			$("#bgli").css("width",sibling.first().width());
			
			$(this).hover(function() {
				var nowleft = $(this).position().left;
				var nowWidth = $(this).width();
				var bjlileft = $("#bgli").position().left;
				debugger
				if(nowleft > bjlileft) {
					$("#bgli").stop().animate({
						left: nowleft + 20,
						width:nowWidth
					}, 500, function() {
						$("#bgli").stop().animate({
							left: nowleft
						}, 200)
					})
				} else {
					$("#bgli").stop().animate({
						left: nowleft - 20,
						width:nowWidth
					}, 500, function() {
						$("#bgli").stop().animate({
							left: nowleft
						}, 200)
					})
				}

			}, function() {
				return false;
			})
		}
	})
})(jQuery);