/* 这是lunbody的轮播图的插件*/ 
;$(function() {
	$.fn.extend({
		opacityFn: function(duration) {
			/*导航图片轮播*/
			var i_mun = 0;
			var $i=0;
			var timer_banner = null;
			var num = $(this).find('.weichuangyi_span span').length; //span的个数
			var $Span = $(this).find('.weichuangyi_span span'); //span节点
			var $liList = $(this).find(".weichuangyi_main .weichuangyi_ul li"); //li节点
			var $rightLunboUl = $(this).find(".rightLunbo ul");
			var $lunbody = $(this).parents().find(".lunbody");//父级
			var $lunUlOne = $(this).find(".lunUl-one"); 
			
			var bgColor = ["#DCEFFD", "#EEEFF3", "#FFEAE5", "#320331", "#DDF6FB"];
			$(this).find('.weichuangyi_main .weichuangyi_ul li:gt(0)').hide(); //页面加载隐藏所有的li 除了第一个
			$(this).find('.rightLunbo ul:gt(0)').hide();
			//底下小图标点击切换
			$Span.hover(function() {
				$(this).addClass('weichuangyi_span_one').siblings().removeClass('weichuangyi_span_one');

				//当前点击的span的下标
				var i_mun1 = $(this).index();
				//背景色
				$lunbody.css("background", bgColor[i_mun1]);

				$liList.eq(i_mun1).stop().fadeIn('slow').siblings().fadeOut('slow');

				$rightLunboUl.eq(i_mun1).stop().fadeIn('slow').siblings().fadeOut('slow');

				// i_mun = i_mun1;
				// console.log(i_mun);
			});

			//如果是点击的话改用点击事件
			/*$Span.click(function() {
				$(this).addClass('weichuangyi_span_one')
					.siblings().removeClass('weichuangyi_span_one');

				//当前点击的span的下标
				var i_mun1 = $(this).index();
				//	$(".nav1").css("background", bgColor[i_mun1]);

				$liList.eq(i_mun1).fadeIn('slow')
					.siblings().fadeOut('slow');

				// i_mun = i_mun1;
				// console.log(i_mun);
			});*/

			//自动播放函数

			function bannerMoveks() {
				timer_banner = setInterval(function() {
					move_banner()
				}, duration)
			};
			bannerMoveks(); //开始自动播放

			//鼠标移动到banner上时停止播放
			$(this).mouseover(function() {
				clearInterval(timer_banner);
			});

			//鼠标离开 banner 开启定时播放
			$(this).mouseout(function() {
				bannerMoveks();
			});

			function move_banner() {
				/*当计时器为4时*/
				if (i_mun == num - 1) {
					i_mun = -1;
				}
				//大图切换
				
				$liList.eq(i_mun + 1).fadeIn('slow')
					.siblings().fadeOut('slow');
				//小图切换
				$Span.eq(i_mun + 1).addClass('weichuangyi_span_one').siblings().removeClass('weichuangyi_span_one');
				$rightLunboUl.eq(i_mun + 1).stop().fadeIn('slow').siblings().fadeOut('slow');
				$lunbody.css({"background": bgColor[i_mun + 1]});
				i_mun++
			}

			/*----------------toShow的轮播图开始上下轮播--------------------------*/
			setInterval(function() {
				$i++;
				$lunUlOne.animate({
					"top": "-=33"
				}, 1000, function() {
					if ($i == 2) {
						$lunUlOne.css({
							"top": "0"
						});
						$i = 0;
					}
				});
			}, 2000);
			/*----------------toShow的轮播图结束--------------------------*/

		}
	});
});