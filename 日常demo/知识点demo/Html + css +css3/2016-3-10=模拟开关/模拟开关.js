$(function() {

	var $circleSwitch = $(".box .boxOne .top .btn .circle");
	var $btn = $(".box .boxOne .top .btn");
	var $text = $(".box .boxOne .bottom .text");
	var i = 0;
	$circleSwitch.on("click", function() {
		i++;
		if (i % 2 == 0) {
			$(this).animate({
				left: "0"
			}, 500, function() {
				$btn.css({
					"background": "#CCCCCC"
				});
			});
			$text.prop({"disabled":"true"});
			$text.css({"background":"#FFC0CB"});
			
		} else {
			$(this).animate({
				left: "40"
			}, 500, function() {
				$btn.css({
					"background": "#00FF00"
				});
			});
			$text.prop('disabled','');
			$text.css({"background":"#00FF00"});
		}
	});
	
	/*$text.on("focus",function(){
		$(this).css({"border":"none"})
	});*/



























});