import http from '../common/http.js'
// 初始化微信
const ysWechat = {
	isInit: false,
	platform: 'ios',
	// 企业微信授权、打开聊天页面
	pageGo : function(id) {
		//alert("id==="+id)
		if(!this.isInit) {
			this.init()
		}
		// alert("this.platform=="+this.platform)
		if(this.platform.toLowerCase() == 'ios') {
			wx.openEnterpriseChat({
			        // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
			    userIds: id,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
			    externalUserIds: '', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
			    groupName: "",  // 会话名称。单聊时该参数传入空字符串""即可。
			    chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
			    success: function(res) {
			        // 回调
					//alert(JSON.stringify(res))
			    },
			    fail: function(res) {
					alert(JSON.stringify(res))
			        if(res.errMsg.indexOf('function not exist') > -1){
			            _this.$toast('版本过低请升级')
			        }
			    }
			});
		}else{
			jWeixin.openEnterpriseChat({
			        // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
			    userIds: id,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
			    externalUserIds: '', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
			    groupName: "",  // 会话名称。单聊时该参数传入空字符串""即可。
			    chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
			    success: function(res) {
			        // 回调
					//alert(JSON.stringify(res))
			    },
			    fail: function(res) {
					//alert(JSON.stringify(res))
			        if(res.errMsg.indexOf('function not exist') > -1){
			            _this.$toast('版本过低请升级')
			        }
			    }
			});
		}
	},
	init: function() {
		const _this = this
		uni.getSystemInfo({
			success: function (res) {
				_this.platform = res.platform
			}
		});
		http('post', 'getWechat', {url:window.location.href},false,true).then(res => {
			if (res && res.data) {
				try {
					// wx.config({
					// 	beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
					// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					// 	appId: 'wx4f202d72f0e6c198', // 必填，企业微信的corpID
					// 	timestamp: timer, // 必填，生成签名的时间戳
					// 	nonceStr: 'bl-dc-yysj', // 必填，生成签名的随机串
					// 	signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
					// 	jsApiList: ['openEnterpriseChat'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
					// });
					if (res.data) {
						res.data.debug = false
					}
					
					// alert(JSON.stringify(res.data))
					if(_this.platform.toLowerCase() == 'ios') {
						wx.config(res.data)
						wx.ready(function(res){
							_this.isInit = true
							//alert("连接成功！ios")
						    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
						});
						wx.error(function(res){
							_this.isInit = false
							//alert("连接失败！！ios")
						    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						});
					}else{
						jWeixin.config(res.data)
						jWeixin.ready(function(){
							_this.isInit = true
							//alert("连接成功！android")
						    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
						});
						jWeixin.error(function(res){
							_this.isInit = false
							//alert("连接失败！！android")
						    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						});
					}
					
				}catch(e){
					//alert("error=3")
				}
			}
		}).catch( err => {
			//alert("获取签名接口失败!")
		})
	}
}
export default ysWechat