import Vue from 'vue'
import API from './api.js'
// 本地 nginx 地址
//let baseUrl = 'http://localhost:9002/'
//demo环境地址
let baseUrl = 'http://demo.powerlong.com/'
//生产环境地址
// let baseUrl = 'https://pd.powerlong.com/'

function request(type,path,params = {},noLoading,raw,urlParam){
	const token = uni.getStorageSync('token')
	const method = type.toUpperCase();
	if (token){
		// params['Gkhn-Mall-Token'] = token
	}
	// 请求头切换
	let header = "application/x-www-form-urlencoded;charset=UTF-8"
	if (raw){
		header = "application/json;charset=UTF-8"
		params = JSON.stringify(params)
	}
	return new Promise(function(resolve,reject){
		if(!noLoading){
			setTimeout(function(){
				uni.showLoading({
					title:'加载中'
				})
			},800)
			uni.onNetworkStatusChange(function (res) {
				if (!res.isConnected){
					try{
						uni.hideToast()
					}catch(e){}
				}
			});
		}
		let requestYrl = baseUrl + API[path]
		if (urlParam){
			requestYrl = baseUrl + API[path] + urlParam
		}
		uni.request({
			url: requestYrl, //接口地址
			data: params, //请求参数
			header:{
				"Content-Type": header
			},
			method: method,//请求方式
			timeout: 60000,
			success(res) {
				const _data = res.data;
				if(_data.code == 0){
					try{
						setTimeout(function () {
						    resolve(_data)
						}, 855);
					}catch(e){}
				}else{
					console.log('请求失败：',_data)
					if (_data && _data.msg) {
						uni.showToast({
							icon: 'none',
							title: _data.msg
						})
					}
					reject(false)
				}
				if(!noLoading) {
					setTimeout(function () {
					    uni.hideLoading();
					}, 50);
				}
				setTimeout(function () {
				    try {
						uni.hideLoading();
					}catch(e){}
				}, 850);
			},
			fail(err) {
				try{
					setTimeout(function () {
					    uni.hideLoading();
					}, 850);
				}catch(e){}
				setTimeout(function () {
					if(noLoading){
						uni.showToast({
							icon: 'none',
							title: '网络异常,请求失败'
						})
					}
				}, 870);
				reject(false)
			},
			complete(){
				
			}
		})
	})
}

export default request;