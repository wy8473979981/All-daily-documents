$(function(){

	$(".btn").on("click",function(){
		var tel = $("#tel").val();
		var passWord = $("#password").val();
		var call = $("#call").val();
		
		if(tel.trim("") == "" || passWord.trim("") == "" || call.trim("") == ""){
			Toast("输入的信息不能为空",2000);
		}else if( /^1(3|5|7|8|9)\d{9}$/.test(tel) == false){
			Toast("手机号格式不正确",2000);
		}else if( /^[\w\.\-]{5,15}$/.test(passWord) == false){
			Toast("密码格式不正确",2000);
		}else if(call.trim("") == ""){
			Toast("昵称不能有空格",2000);
		} else{
			toRegister(tel,passWord,call,"user/json/reg.do");
		}

	});


	function toRegister(loginname,password,nickname,url){
		var url = dataUrl +url;
		$.ajax({
			url:url,
			data:{"loginname":loginname,"password":password,"nickname":nickname},
			dataType:"json",
			beforeSend:function(){
				$(".loadEct").show();
			},
			success:function(data){
			$(".loadEct").hide();
				console.log(data);
				if(data.ecode == 200){
					window.location = "login.html"
				}else if(data.ecode == 500){
					Toast("该用户已注册",2000);
					
				}else{
					Toast("亲，下次再来",2000);
				}
			}
		});
	}

});
