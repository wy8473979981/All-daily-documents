$(function(){

	$(".btn").on("click",function(){
		var tel = $("#tel").val();
		var passWord = $("#password").val();
		
		
		if(tel.trim("") == "" || passWord.trim("") == ""){
			Toast("输入的信息不能为空",2000);
		}else if( /^1(3|5|7|8|9)\d{9}$/.test(tel) == false){
			Toast("手机号格式不正确",2000);
		}else if( /^[\w\.\-]{5,15}$/.test(passWord) == false){
			Toast("密码格式不正确",2000);
		}else{
			toRegister(tel,passWord,"user/json/login.do");
		}

	});


	function toRegister(loginname,password,url){
		var url = dataUrl +url;
		$.ajax({
			url:url,
			data:{"loginname":loginname,"password":password},
			dataType:"json",
			beforeSend:function(){
				$(".loadEct").show();
			},
			success:function(data){
			$(".loadEct").hide();
				if(data.ecode == 200){
					console.log("登陆成功");
					window.location = "index.html"
				}else if(data.ecode == 500){
					Toast("该用户未注册",2000);
				}
			}
		});
	}

});
