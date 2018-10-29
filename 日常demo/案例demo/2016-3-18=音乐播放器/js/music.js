$(function() {
	var click = false;


	$.getJSON("pbl.json", function(data) {
		var musicNum = data.length;
		console.log(musicNum);
		for (var i = 0; i < musicNum; i++) {
			var $li = $("<li data-href='" + data[i].src + "'><span>" + (i + 1) + "</span><span>" + data[i].musicName + "</span></li>");
			$(".musicUl").append($li);
			
			$(".musicUl li").on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				var $src = $(this).attr("data-href"); //获取li的音乐地址
				$("#music").attr({
					"src": $src
				}); //改变audio的音乐地址
				$("div i").eq(1).removeClass("fa fa-play").addClass("fa fa-pause");
			});
		}

	});



	$("div i").eq(1).on("click", function() {
		if (click == false) {
			$("div i").eq(1).removeClass("fa fa-play").addClass("fa fa-pause");
			click = true;

		} else {
			$("div i").eq(1).removeClass("fa fa-pause").addClass("fa fa-play");
			click = false;

		}
	})


});