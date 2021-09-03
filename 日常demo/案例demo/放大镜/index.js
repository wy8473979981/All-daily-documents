$(function(){
	var $smallImg = $(".p01-l .pic-box");
	var $smallCursor = $(".p01-l .pic-box .smallCursor");
	var $bigCursor = $(".part01 .p01-l  .zoomBox");
	var $bigImg = $(".p01-l  .zoomBox img");
	
	var sImgWidth = $smallImg.width(); //小图容器的宽度
	var sImgHeight = $smallImg.height();
	var sCurosrWidth = $smallCursor.width(); //小放大镜的宽度
	var sCurosrHeight = $smallCursor.height();
	
	//比例
	var scale = $bigImg.width() / sImgWidth;
	var $sCursorLeft, $sCursorTop; //表示小放大镜的left和top
	$smallImg.on("mousemove", function(evt) {
		console.log("mousemove")
		var sImgLeft = evt.pageX - $(this).offset().left;//pageX鼠标相对于document的坐标；offset是当前对象相对于文档的坐标
		
		var sImgTop = evt.pageY - $(this).offset().top;
		var arrayPosition = move(sImgLeft, sImgTop) //定义数组接受返回值
		$smallCursor.css({ //改变小放大镜的position
			"display": "block",
			"left": arrayPosition[0],
			"top": arrayPosition[1]
		});
		$bigCursor.css({
			"display": "block"
		});
		$bigImg.css({ //改变大放大镜下图片的position
			"left": -(arrayPosition[0]) * scale,
			"top": -(arrayPosition[1]) * scale
		});
	});
	$smallImg.on("mouseout", function() {
		console.log("mouseout")
		$smallCursor.css({
			"display": "none"
		});
		$bigCursor.css({
			"display": "none"
		});
	});
	/**
	 * 
	 * @param {Object} sImgLeft 鼠标相对父容器的left
	 * @param {Object} sImgTop  鼠标相对于父容器的top
	 * dec:返回  小放大镜的left和top，返回的是个数组；
	 */
	function move(sImgLeft, sImgTop) {
		if (sImgLeft >= (sImgWidth - sCurosrWidth / 2)) {
			//防止放大镜超出父容器右边
			$sCursorLeft = (sImgWidth - sCurosrWidth);
		} else if (sImgLeft <= sCurosrWidth / 2) {
			//防止放大镜超出父容器左边
			$sCursorLeft = 0;
		} else {
			//放大镜的处了以上两种情况，鼠标相对于父容器的坐标给小放大镜，减一半是表示在放大镜中居中
			$sCursorLeft = sImgLeft - sCurosrWidth / 2;
		}
		if (sImgTop >= (sImgHeight - sCurosrHeight / 2)) {
			$sCursorTop = (sImgHeight - sCurosrHeight);
		} else if (sImgTop <= sCurosrHeight / 2) {
			$sCursorTop = 0;
		} else {
			$sCursorTop = sImgTop - sCurosrHeight / 2;
		}
		return [$sCursorLeft, $sCursorTop];
	}
});
