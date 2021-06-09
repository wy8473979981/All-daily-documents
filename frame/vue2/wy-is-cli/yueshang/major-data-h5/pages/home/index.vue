<template>
	<div class="ys-page">
		<!-- 功能列表组件 -->
		<page-oneline :list="list" @change="itemClick"></page-oneline>
		<!-- 水印 -->
		<!-- <wm-watermark :text="watermarkText"></wm-watermark> -->
	</div>
</template>


<script>
	export default {
		data() {
			return {
				watermarkText: null,
				userMenuRightList:null,
				balanceIndexPage:'/pages/balance/index/index',
				arrearsIndexPage:'/pages/arrears/index/index',
				valueIndexPage:'/pages/value/index/index',
				list: [],
			}
		},
		onLoad: function() {
			if(localStorage.getItem('isFirstAcess') === '1'){
				this.getUserId(localStorage.getItem('code'))
				localStorage.setItem('isFirstAcess','0')
			}else{
				this.watermarkText = localStorage.getItem('watermarkText')
				this.userMenuRightList = JSON.parse(localStorage.getItem('userMenuRightList'))
				this.initPageUrl()
			}
			this.$wechat.init()// 初始化微信js 仅此执行一次
		},
		methods: {
			itemClick(item) {
				console.log("home menu click:", item.url)
			},
			// 获取userId
			async getUserId(code) {
			    await this.$http('post', 'getUserId', {loginCode:code,appType:'5'},false,false).then(res => {
			        if (res && res.data) {
			            this.$store.state.userId = res.data.userId
			            localStorage.setItem('userId',res.data.userId)
						this.$store.state.watermarkText = res.data.watermarkText
						localStorage.setItem('watermarkText',res.data.watermarkText)
						localStorage.setItem('userMenuRightList',JSON.stringify(res.data.appUserRightList))
						this.watermarkText = res.data.watermarkText
						this.userMenuRightList = JSON.parse(localStorage.getItem('userMenuRightList'))
						this.initPageUrl()
			        }
			    })
			},
			initPageUrl(){
				let params = '';
				if(this.hasMenuRightCode('A_APP_MAJ_CONT')){
					this.list.push({title: '资金效能考核',src: '',url: this.balanceIndexPage})
				}
				if(this.hasMenuRightCode('A_APP_MAJ_ARRE')){
					this.list.push({title: '欠款回款考核',src: '',url: this.arrearsIndexPage})
				}
				if(this.hasMenuRightCode('A_APP_MAJ_VALUE')){
                    this.list.push({title: '库存去化',src: '',url: this.valueIndexPage})
                }
				if((!this.hasMenuRightCode('A_APP_MAJ_CONT')) && (!this.hasMenuRightCode('A_APP_MAJ_ARRE'))){
					this.list = [{title: '无权限，请申请权限',src: '',url: '',params:''}]
				}
			},
			hasMenuRightCode(menuRightCode){
				if(!this.userMenuRightList || this.userMenuRightList === undefined || this.userMenuRightList.length === 0){
					return false;
				}
				for(let item of this.userMenuRightList){
					if(item.rightCode === menuRightCode){
						return true;
					}
				}
				return false;
			} 
		}
	}
</script>
<style>
	@import "./index.css";
	._home-title {
		font-size: 30rpx;
	}
</style>
