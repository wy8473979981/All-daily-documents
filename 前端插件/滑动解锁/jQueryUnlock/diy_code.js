(function (window, $){
	//所有的样式都在这里了；
	var my_code = '<div class="diy_con"><div class="diy_up"><img src="" alt=""><span class="diy_budong"></span><span class="diy_dong"></span></div><div class="diy_down"><p><span class="diy_move"><i></i><i></i><i></i></span></p></div></div>';
	var my_css = '<style class="H_diy_style">';
	my_css += '.diy_con{width: 600px;height: 536px;margin: auto;background: #eee;overflow: hidden;box-shadow: 6px 4px 12px #999;display: none;position:fixed;left:50%;top:50%;}';
	my_css += '.diy_up{position: relative;}';
	my_css += '.diy_up img{}';
	my_css += '.diy_down{height: 100px;width: 400px;position: relative;}';
	my_css += '.diy_down>p{width: 560px;height: 20px;background: #999;margin-top: 40px;border: 1px #eaeaea solid;border-radius: 3px;margin-left: 20px;}';
	my_css += '.diy_down span{width: 60px;height: 60px;background: #fff;border-radius: 7px;border: 1px #bbb solid;display: inline-block;position: absolute;left: 0px;top:-20px;box-shadow: 3px 3px 6px #999;}';
	my_css += '.diy_down span>i{width: 40px;height: 2px;margin-left: 10px;margin-top: 12px;background: #ccc;display: inline-block;}';
	my_css += '.diy_budong{width: 60px;height: 60px;background: #333;display: inline-block;position: absolute;left: 300px;top:20px;display: none;z-index: 500}';
	my_css += '.diy_dong{width: 60px;height: 60px;background: #333;display: inline-block;position: absolute;left: 0px;top:20px;display: none;z-index: 1000}';
    my_css += '</style>';
    var tip;//判断用的
	var a;//计算模块宽度
	var b;//计算模块高度
	var date1;//时间
	var date2;//时间
	var w = 600;//初始值
	var h = 436;//初始值
	var secces_callback = function(){};//成功回调函数
	var error_callback = function(){};//同理
	window.H_testcode = {
		//准备
		ready : function(src,callback1,callback2){
			//不能有两个验证码，会出错的！！！
			if($(".diy_con").length>0){
				return false;
			}
			if(!src)return false;
			//重新定义回调函数
			if(callback1)secces_callback=callback1;
			if(callback2)error_callback=callback2;
			//把该加的东西都加起
			$('head').append(my_css);
			$('body').append(my_code);
			//创建一个img对象，主要为了延迟加载传入的src属性，否则会出一系列问题，比如获取不到图片的宽度与高度、ie报错之类的。
			var img = new Image();
			//在img家在完成之后再获取图片信息，调整整体样式，适应图片。
			img.onload = function(){
				w = img.width;
				h = img.height;
				$(".diy_con").css({"margin-left":"-"+w/2+"px","margin-top":"-"+(h+100)/2+"px"});
				$(".diy_up").children("img").attr("src",src);
				$(".diy_con").css({"height":h+100+'px',"width":w+"px"});
				$(".diy_down").children("p").css("width",w-40+"px");
				H_testcode.make();//至此，整体布局完成，开始创建滑动块。
			}
			img.src = src;//加载图片，放在后边为了避免报错。
		},
		make : function(){
			//随机数，把滑动块定位在随机的位置
			var Range = w-120;
			var Rand = Math.random();   
			a = 60 + Math.round(Rand * Range);
			$(".diy_budong").css({"left":a+"px"});
			Range = h-120;
			Rand = Math.random();
			b = Math.round(Rand * Range);
			$(".diy_budong").css({"top":b+"px"});
			$(".diy_dong").css({"top":b+"px"});
			//滑动块背景图片改变，并且定位，要适应ie
			$(".diy_dong").css({'backgroundImage':'url('+$(".diy_up").children('img').attr('src')+')','backgroundPosition':'-'+a+'px -'+b+'px'});
			//至此，样式搞定了。
			$(".diy_con").fadeIn(200);
			H_testcode.bindmove();//绑定滑动滑块事件
		},
		bindmove : function(){
			//先定义一些参数，以备不时之需
			var iX;
            var iY;
            var oX;
            var oY;
            //可以按顺序来，先mousedown然后mousemove然后mouseup。
	    	$(".diy_move").mousemove(function(e){if(tip){//如果标记鼠标按下的状态，就两个滑块一起滑动
	    		//根据鼠标的位置，确定滑动的距离。
	    		var e = e || window.event;
                oX = e.clientX - iX;
                oY = e.clientY - iY;
                //在光滑的屏幕上摩擦
                $(this).css({"left":oX + "px"});
               	$(".diy_dong").css({"left":oX + "px"});
	    	}});
	    	$(".diy_move").mousedown(function(e) {//鼠标按下会发生的事情
                tip = 1;//标记一下，说明鼠标按下了
                //记一下事件，需要计算时间的
                var myDate = new Date();
                date1 = myDate.getTime();
                //记录一下鼠标位置跟滑块的关系。好像没啥用。反正留着以后用吧。
                iX = e.clientX - this.offsetLeft;
                iY = e.clientY - this.offsetTop;
                //告诉浏览器，我鼠标按着呢，别搞事！！
                this.setCapture && this.setCapture();
                //显示隐藏的滑块，这样才能看得到滑块。
				$(".diy_dong").show();
				$(".diy_budong").fadeIn(200);
                return false;
            });
            $(".diy_move").mouseup(function(e) {//鼠标抬起会发生的事情
                tip = 0;//标记一下，鼠标没按着了！
                //告诉浏览器，我鼠标没按着了，可以搞事了！！
                this.releaseCapture && this.releaseCapture();
                e.cancelBubble = true;
                H_testcode.tested();//检测一下现在滑块的位置啥的，判断
                return false;
            });
            $("body").unbind("mousemove");//防止第二次加载出错！！取消重复的绑定事件
            $("body").mousemove(function(e){if(tip){//滑块滑出他应该在的位置时，我们要处理一下。
	    		var e = e || window.event;
	    		if(!H_testcode.getchecked(e.clientX,e.clientY)){//如何处理详见这个函数！参数是鼠标的位置
	    			tip = 0;
	    			//用户搞事，把所有东西还原，然后叫他重新来过。都跟初始位置一样。
	                this.releaseCapture && this.releaseCapture();
	                e.cancelBubble = true;
	                $(".diy_move").css({"top":"-20px","left":"0px"});
					$(".diy_dong").css({"top":b+"px","left":"0px"}).hide();
					$(".diy_budong").fadeOut(200);
	    			return false;
	    		}
	    	}});
		},
		tested : function(){//检测位置对不对。
			//记录一下终止事件先
			var myDate = new Date();
	    	date2 = myDate.getTime();
	    	var newdate = date2-date1;
	    	//记录一下滑块跟缺口的位置
	    	var ck1 = $(".diy_budong").offset().left;
	    	var ck2 = $(".diy_dong").offset().left;
	    	var ck3 = ck1-ck2;
	    	//比较一下，误差默认5像素
	    	if(ck3>-5&&ck3<5){
	    		secces_callback(parseFloat(newdate/1000).toFixed(1),Math.abs(ck3));//成功的回调函数，执行一下
	    		H_testcode.recode();//把一切都干掉，然后就可以再点验证码了！
	    		return false;
	    	}
	    	else{
	    		error_callback(parseFloat(newdate/1000).toFixed(1),Math.abs(ck3));//失败的回调函数，执行一下
	    	}
	    	//应该放在else里边的东西。还原一切位置。
	    	$(".diy_move").css({"top":"-20px","left":"0px"});
			$(".diy_dong").css({"top":b+"px","left":"0px"}).hide();
			$(".diy_budong").fadeOut(200);
			date1 = 0;
			date2 = 0;
		},
		getchecked : function(a,b){//判断是不是用户在搞事！，如果滑块的位置跟鼠标的位置有差距，那就就用户搞事了！！
			if(a<$(".diy_move").offset().left||a>($(".diy_move").offset().left+60))
				return 0;
			if(b<$(".diy_move").offset().top||b>($(".diy_move").offset().top+60))
				return 0;
			return 1;
		},
		recode : function(){//把一切都干掉。然后就完了
			$(".diy_con").fadeOut(200);
			$(".diy_con").remove();
			$(".H_diy_style").remove();
			return false;
		}
	};
})(window, jQuery);