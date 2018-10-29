$(function() {
	var audioFace = document.getElementById("audioFace"); //audio标签
	var $musicList = $("#music-list li");
	var $leftImg = $('#left');//旋转图片
	var timer = null;
	var $time = $('#time');
	var time = null;//总时长
	var $audioTime = $("#audioTime"); //音频时长
	var $leftImg = $("#left"); //左边图片
	var $play = $("#play"); //播放按钮
	var $prev = $("#prev"); //上一首
	var $next = $('#next'); //下一首
	var $sound = document.getElementById("sound"); //声音
	var status = 0; //播放状态
	var soundSta = 0; //声音状态
	
	//获取localStorage存储的值，
	/*var aginPath = localStorage.getItem('path');
	$("#audioFace").attr("src", aginPath);
	audioFace.play();*/

	
	
	//点击歌曲列表播放
	$musicList.on("click", function() {
		status++;
		var $index = $(this).index();
		if (status % 2 == 0) {
			//暂停播放
			audioFace.pause();
			$leftImg.find('img').removeClass('ui-playing');//
			$play.find("i").removeClass("fa fa-pause").addClass("fa fa-play");
			
		} else {
			//播放
			var $path = $(this).attr("path");
			$("#audioFace").attr("src", $path);
			/*if(!(localStorage.getItem('path')) ){
				localStorage.setItem('path',$path);//存储路径
			}else{
				localStorage.setItem('path',$path);//更新存储路径
			}*/
			$(this).find('active').addClass("active").siblings().removeClass("active");
			audioFace.play();
			$leftImg.find('img').addClass('ui-playing');//图片旋转
			$play.find("i").removeClass("fa fa-play").addClass("fa fa-pause");
		}

		//上一首
		$prev.on('click', function() {
			$index--;
			var oLength = $musicList.size();
			if ($index < 0) {
				$index = 0;
				var $path = $musicList.eq($index).attr("path");
				$("#audioFace").attr("src", $path);
				audioFace.play();
			} else {
				var $path = $musicList.eq($index).attr("path");
				$("#audioFace").attr("src", $path);
				audioFace.play();
			}

		});

		//下一首
		$next.on('click', function() {
			$index++;
			var oLength = $musicList.size();
			if ($index >= oLength-1) {
				$index = oLength-1;
				var $path = $musicList.eq($index).attr("path");
				$("#audioFace").attr("src", $path);
				audioFace.play();
			} else {
				var $path = $musicList.eq($index).attr("path");
				$("#audioFace").attr("src", $path);
				audioFace.play();
			}
		});
		//点击开始播放
		$play.on('click', function() {
			if ($play.find("i").is('.fa-play')) {
				//播放
				audioFace.play();
				$leftImg.find('img').addClass('ui-playing');//图片旋转
				$play.find("i").removeClass("fa-play").addClass("fa-pause");
			} else {
				//暂停播放
				audioFace.pause();
				$leftImg.find('img').removeClass('ui-playing');//
				$play.find("i").removeClass("fa-pause").addClass("fa-play");
			}
		});
		//获取音频的时长
		timer = setInterval(function() {
			time = audioFace.duration;
			$time.text(parseInt(time / 60) + ':' + parseInt(time % 60));
		}, 1000);

		//进度条
		function playTime() {
			var currentTime = Math.ceil(audioFace.currentTime); //当前播放时间
			$audioTime.val(currentTime);
		
			/*if(!(localStorage.getItem('currentTime')) ){
				localStorage.setItem('currentTime',currentTime);//存储路径
			}else{
				localStorage.setItem('currentTime',currentTime);//更新存储路径
			}*/
			
		}
		audioFace.addEventListener("timeupdate", playTime, true);
		$audioTime.on("mousedown", function() {
			audioFace.removeEventListener("timeupdate", playTime, true);
			$(this).on("mouseup", function() {
				var val = $(this).val();
				audioFace.currentTime = val;
				console.log(val);
				audioFace.addEventListener("timeupdate", playTime, true);
				$audioTime.attr('max',time);
			});
		});

	});
	//声音
	$sound.onclick = function() {
		soundSta++;
		if (soundSta % 2 == 0) {
			console.log(soundSta);
			$(this).find('i').removeClass('fa-volume-off').addClass('fa-volume-up');
			audioFace.muted = false;
		} else {
			console.log(soundSta);
			$(this).find('i').removeClass('fa-volume-up').addClass('fa-volume-off');
			audioFace.muted = true;
		}
	};
	
	
	
	
});