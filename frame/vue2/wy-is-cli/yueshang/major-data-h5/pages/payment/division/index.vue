<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<index-content v-for="data in list" :data="data" :users="data.users" @userTab="userTab"  url="/pages/payment/ranking/index"></index-content>
		<!-- 下拉框组件数据 -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas3" :show="show[2]" :actions="actionSheets[2]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<!-- 用户名水印 -->
		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
	import pageTop from "@/components/page-header/page-top.vue"
	import pageHeader from "@/components/page-header/page-header.vue"
	import indexContent from "@/components/page-content/page-content.vue"

	export default {
		data() {
			return {
				title: '全宝龙',
				watermarkText:'',
				tipsList: this.$store.state.paymentPageTipsList,
				list: [],
				reqParam: {
					interfaceType: '1', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '' // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
				},
				result: null,
				equityResult : null,
				appOperUserList:[],
				checkTime:0,
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'},
					{name: '事业部'},
				],
				index: 0, 
				show: [false,false,false],
				close: true,
				vas1: null,
				vas2: null,
				vas3: null,
				actionSheets: {
					0: [
						{name: '全部业态',code: '0',color: '#00a1ff'},
						{name: '住宅',code: '1',color: null,},
						{name: '商办',code: '2',color:null,},
						{name: '车位其他',code: '3',color: ''}
					],
					1: [
						{name: '权益口径',code: false,color: '#00a1ff'},
						{name: '全口径',code: true,color: null}
					],
					2: [
						{name: '事业部',code: false,color: '#00a1ff'},
						{name: '营销组',code: true,color: null}
					]
				}
			};
		},
		components: {
			pageTop,
			pageHeader,
			indexContent
		},
		onLoad: function(options) {
			let params = JSON.parse(options.params)
			this.reqParam.queryType = params.queryType
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText');
			}
			this.initSelectTabList()
			this.initData()
		},
		onShow() {
			if(localStorage.getItem('tabType')){
				setTimeout(() => {
					this.defaultIndex = parseInt(localStorage.getItem('tabType'))
				},100)
			}
		},
		methods: {
			// 初始化数据-首页
			async initData() {
				await this.$http('post', 'appSignAndPaymentByDept', this.reqParam, false, true).then(res => {
					if (res && res.data) {
						this.result = res.data.data;
						this.equityResult = res.data.equityData;
						this.appOperUserList = res.data.appOperUserList;
						
						this.createHtml(this.$store.state.isFullCal?this.result:this.equityResult,
						this.$store.state.isFullCal);
						uni.hideLoading();
					}
				})
			},
			async initMarketingData() {
				await this.$http('post', 'appSignAndPaymentByMarketing', this.reqParam, false, true).then(res => {
					if (res && res.data) {
						this.result = res.data.data;
						this.equityResult = res.data.equityData;
						this.appOperUserList = res.data.appOperUserList;
						
						this.createHtml(this.$store.state.isFullCal?this.result:this.equityResult,
						this.$store.state.isFullCal);
						uni.hideLoading();
					}
				})
			},
			createHtml(data,state) {
				this.list = [];
				// 初始化展示
				Object.keys(data).forEach(key => {
					const item = data[key];
					let signAndPaymentItem;
					signAndPaymentItem = [
						{col1: '',col2: '',col3: ''},
						{col1: '昨日',col1class:'custom-title-cls',col2: '',col3: ''},
						{col1: item.paymentAmount,col2: '',col3: '',col1_unit:'亿元'},
						
						{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
						{col1: '本月指标',col2: '本月实际',col3: '本月完成率'},
						{col1: item.monthPaymentIndexAmount,col2: item.monthPaymentAmount,col3: item.monthPaymentRate
						,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
						
						{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
						{col1: '本年指标',col2: '本年实际',col3: '本年完成率'},
						{col1: item.yearPaymentIndexAmount,col2: item.yearPaymentAmount,col3: item.yearPaymentRate
						,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
						
						{col1: '截至上月',col1class:'custom-title-cls',col2: '',col3: ''},
						{col1: '截至上月指标',col2: '截至上月实际',col3: '偏差率/缺口'},
						{col1: item.lastMonthPaymentIndexAmount,col2: item.lastMonthPaymentAmount,col3:'' 
						,col1_unit : '亿元',col2_unit : '亿元'},
					];
					//红绿灯判断
					signAndPaymentItem[11].col3 = "<span style='font-size:15px;'>" + item.lastMonthPaymentRate + '%</span>'
					 + "<span style='font-size:12px;'>"+ (item.lastMonthPaymentAmount - item.lastMonthPaymentIndexAmount).toFixed(2) + '亿元</span>';
					signAndPaymentItem[11].col3color = item.lastMonthPaymentRate>=0?{color:'green'}:{color:'red'};
					
					let users = []
					this.appOperUserList.forEach(appOperUser => {
						if(item.grpMarketingCode === appOperUser.grpMarketingCode){
							if(appOperUser.deptType === "1"){
								users.push({name:appOperUser.userName,id:appOperUser.userId})
							}
						}
						if(item.grpMarketingCode === appOperUser.divisionCode){
							if(appOperUser.deptType === "0"){
								users.push({name:appOperUser.userName,id:appOperUser.userId})
							}
						}
					})
					let params = {divisionCode:item.grpMarketingCode,grpMarketingCode:item.grpMarketingCode,grpMarketingName:item.grpMarketingName,queryType:this.reqParam.queryType}
					this.list.push({
						title: item.grpMarketingName,
						grpMarketingCode:item.grpMarketingCode,
						grpMarketingName:item.grpMarketingName,
						items: signAndPaymentItem,
						params:params,
						users:users
					})
				});
			},
			//初始化下拉选中项
			initSelectTabList(){
				let index = parseInt(this.reqParam.queryType);
				this.selectTabList[0] = {name: this.actionSheets[0][index].name}
				//修改选中项选中颜色 第一个下拉
				this.actionSheets[0].forEach((item,ind) => {
					if( item.code === index.toString()) {
						item.color = '#00a1ff';
					}else{
						item.color = null;
					}
				})
				//修改选中项选中颜色 第二个下拉
				if(this.$store.state.isFullCal){
					this.selectTabList[1] = {name: '全口径'}
					this.actionSheets[1][1].color = '#00a1ff';
					this.actionSheets[1][0].color = null;
				}else{
					this.selectTabList[1] = {name: '权益口径'}
					this.actionSheets[1][1].color = null;
					this.actionSheets[1][0].color = '#00a1ff';
				}
			},
			//选中下拉选项事件
			onSelect(res) {
				//选中后修改close属性 并关闭弹窗
			    this.close = !this.close;
				this.show = [false,false];
				//修改tab上显示的数据
				this.selectTabList[this.index].name = res.detail.name;
				//修改选中项选中颜色
				this.actionSheets[this.index].forEach((item,ind) => {
					if( item.name === res.detail.name) {
						item.color = '#00a1ff';
					}else{
						item.color = null;
					}
				})
				//下拉判断是什么口径数据变化
				if(this.index === 0){
					//营销业态变化
					this.reqParam.queryType = res.detail.code;
					this.initData();
				}else if(this.index === 1){
					//权益口径变化
					var state = res.detail.code;
					if(state){
					    this.createHtml(this.result,state);
					}else{
					    this.createHtml(this.equityResult,state);
					}
				}else if(this.index  === 2){
					var selectMarket = res.detail.code;
					if(selectMarket){
						this.initMarketingData();
					}else{
						this.initData();
					}
				}
			},
			overlay() {
				this.close = !this.close;
				this.show = [false,false];
			},
			showPop(res) {
				this.index = res.index;
				this.show[res.index] = true;
				//迫使 Vue 实例重新渲染
				this.$forceUpdate();
			},
			userTab(user) {
				this.$wechat.pageGo(user.id);
			},
		}
	}
</script>
<style>
	@import "./index.css"
</style>
