$(function() {
	
	$('nav div:gt(0)').find(".active").hide(); //除了第一个其余隐藏
	$("nav div").on("click", function() {
		$(this).find(".active").show();
		$(this).siblings().find(".active").hide();
	});
	$("footer div").on("click", function() {

		$(this).find("a").addClass("active2");
		$(this).siblings().find("a").removeClass("active2");
	});
	$("header .head a").on("click", function() {

		$(this).addClass("acolor1").siblings().removeClass("acolor2");
	});
	
	var lis = $(".picList .list");
	function loadData(){
		$.ajax({
			url:dataUrl+"tweet/json/query/hotspot.do",
//			data:{"category":1,"page":pageIndex},
			data:{"category":1},
			async:false,
			success:function(d){
//				console.log(d)//字符串
				var result = JSON.parse(d);
				console.log(result)
				if(result.ecode != 200){
					Toast("请求页面失败，请重试");
				}else{
					var data = result.data;
					console.log(data)
					if(typeof data != "undefined" && data != null){
						var itemList = data.tweetlist;
						var len = itemList.length;
						if(typeof itemList != "undefined" && itemList != null && len >0){
							console.log(itemList);
							showItem(itemList,len);
						}
						
					}
				}
			}
			
		});
	}

		function showItem(itemList,len){
			console.log(itemList[0]);
			for(var i = 0;i<len;i++){
				var item = itemList[i];
				var imgPath = 'http://101.200.173.217:8080/FootBall'+item.defaultFilePath+item.thumbnailname;
				var content = item.content;
				var str = '<li>'+
						'<img src="'+imgPath+'"/>'+
						'<p>'+content+'</p>'+
					'</li>';
				if(i==0){
					lis.eq(0).append(str);
				}else{
					var oImg = new Image();
					oImg.src = imgPath;
					//自定义属性
					$(oImg).attr("str",str);
					console.log($(oImg).attr("str",str));
					oImg.onload = function(){
						var idx = checkHeight();
						lis.eq(idx).append($(this).attr("str"));
						
					}
				}
				
			}
		}
		/**
		 * 第一张图片插在第一个ul中
		 * 当进行插入第二张图时，调用此函数，判断第一个ul的高度是否大于第二个ul高度，true返回1，将图片插入第二个ul
		 * false返回0，将图片插在第一个ul
		 */
		function checkHeight(){
			var idx = 0;
			if(lis[0].offsetHeight > lis[1].offsetHeight){
				idx = 1;
			}
			return idx;
		}

});