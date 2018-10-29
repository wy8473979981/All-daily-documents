

$(document).ready(function(){
	var num=$('.weichuangyi_span span').length;
	console.log(num);
	var i_mun=0;
	var timer_banner=null;

	$('.weichuangyi_ul li:gt(0)').hide();//页面加载隐藏所有的li 除了第一个
	
//底下小图标点击切换
	$('.weichuangyi_span span').click(function(){
		$(this).addClass('weichuangyi_span_one')
			   .siblings('span').removeClass('weichuangyi_span_one');
		var i_mun1=$('.weichuangyi_span span').index(this);
		//console.log(i_mun1);
		$('.weichuangyi_ul li').eq(i_mun1).fadeIn('slow')
			                   .siblings('li').fadeOut('slow');

		i_mun=i_mun1;
	});
	
//左边箭头点击时切换
	$('.weichuangyi_left').click(function(){
		if(i_mun==0){
			i_mun=num
		}
		//大图切换
		$('.weichuangyi_ul li').eq(i_mun-1).fadeIn('slow')
								   .siblings('li').fadeOut('slow');
		//小图切换
		$('.weichuangyi_span span').eq(i_mun-1).addClass('weichuangyi_span_one')
				   .siblings('span').removeClass('weichuangyi_span_one');

		i_mun--
	});

	//左边按钮移动到其上时更换背景图片
    $('.weichuangyi_left').mouseover(function(){
		
		$('.weichuangyi_left').addClass('weichuangyi_left1');
	});

	//左边按钮移动到其上时还原背景图片
	$('.weichuangyi_left').mouseout(function(){
		
		$('.weichuangyi_left').removeClass('weichuangyi_left1');
	});

//右边箭头点击时切换
	$('.weichuangyi_right').click(function(){
		move_banner()
		
	});

	//右边按钮移动到其上时更换背景图片
	$('.weichuangyi_right').mouseover(function(){
		
		$('.weichuangyi_right').addClass('weichuangyi_right1');
	});

	//右边按钮移动到其上时更换背景图片
	$('.weichuangyi_right').mouseout(function(){
		
		$('.weichuangyi_right').removeClass('weichuangyi_right1');
	});
	
//鼠标移动到幻灯片上时 显示左右切换案例
	$('.weichuangyi').mouseover(function(){
		$('.weichuangyi_left').show();
		$('.weichuangyi_right').show();
	});

//鼠标离开幻灯片上时 隐藏左右切换案例
	$('.weichuangyi').mouseout(function(){
		$('.weichuangyi_left').hide();
		$('.weichuangyi_right').hide();
	});
	
	//自动播放函数
	function bannerMoveks(){
		timer_banner=setInterval(function(){
			move_banner()
		},4000)
	};
	bannerMoveks();//开始自动播放

	//鼠标移动到banner上时停止播放
	$('.weichuangyi').mouseover(function(){
		clearInterval(timer_banner);
	});

	//鼠标离开 banner 开启定时播放
	$('.weichuangyi').mouseout(function(){
		bannerMoveks();
	});


//banner 右边点击执行函数
   function move_banner(){
			if(i_mun==num-1){
				i_mun=-1
			}
			//大图切换
			$('.weichuangyi_ul li').eq(i_mun+1).fadeIn('slow')
									   .siblings('li').fadeOut('slow');
			//小图切换
			$('.weichuangyi_span span').eq(i_mun+1).addClass('weichuangyi_span_one')
					   .siblings('span').removeClass('weichuangyi_span_one');

			i_mun++
		
		}

})















