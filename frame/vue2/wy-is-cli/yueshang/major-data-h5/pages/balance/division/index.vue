<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
 		<page-line-title :param="persionInfo" fontColor="#007aff" ></page-line-title>
		<index-content v-for="data in list" :data="data" ></index-content>
		<!-- 下拉框组件数据 -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<!-- <van-action-sheet v-model="vas3" :show="show[2]" :actions="actionSheets[2]" @select="onSelect" @click-overlay="overlay"></van-action-sheet> -->
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
				tipsList: this.$store.state.balancePageTipsList,
				list: [],
				reqParam: {
					queryType: '0', // '0' 过程考核 '1' 月度考核 
					currMonth: ''  //选择月份
				},
				result: null,
				equityResult : null,
				persionInfo:null,
				appOperUserList:[],
				monthList: null,
				checkTime:0,
				selectTabList:[
					{name: '过程监控',hiddenImage:false},
				    {name: '',hiddenImage:true},
				],
				index: 0, 
				show: [false,false,false],
				close: true,
				vas1: null,
				vas2: null,
				vas3: null,
				actionSheets: {
					0: [
						{name: '过程监控',code: '0',color: '#00a1ff'},
						{name: '月度考核',code: '1',color: null},
					],
					1: [
						{name: '月度选择',code: '0',color: '#00a1ff'},
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
			this.reqParam.currMonth = params.currMonth
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
				await this.$http('post', 'appRegulateFunBalanceDept', this.reqParam, false, true).then(res => {
					if (res && res.data) {
						this.result = res.data.data;
						this.monthList = res.data.monthList;
						this.persionInfo = {title:'该数据截止于：',id:null,userName:null,dateTime:res.data.dueDate};
						// this.equityResult = res.data.equityData;
						// this.appOperUserList = res.data.appOperUserList;
						this.createHtml(this.result);
						this.initMonthList();
						// this.createHtml(this.$store.state.isFullCal?this.result:this.equityResult,
						//this.$store.state.isFullCal);
						uni.hideLoading();
					}
				})
			},
			createHtml(data) {
				this.list = [];
				// 初始化展示
				Object.keys(data).forEach(key => {
					const item = data[key];
					let signAndPaymentItem;
					if(this.reqParam.queryType == 0){
						signAndPaymentItem = [
							{col1: '完成率<br/>(F = 1-(-E/D))',col2: '差额<br/>(E=D-C)',col3: ''},
							{col1: '',col2: '',col3: '',col1_unit:'',col2_unit:''},
							
							{col1: '前5月及本月<br>累计回款(全)(A)',col2: '目标监管比例<br/>(B)',col3: '实际监管比例<br/>(C/A)'},
							{col1: item.accuCollection,col2: item.regulateRatio,col3: item.regulateRatioAct,col1_unit:'亿元',col2_unit:'%',col3_unit:'%'},
							
							{col1: '上周监管资金余额<br/>目标(全)(D)',col2: '上周监管资金余额<br/>实际(C)',col3: ''},
							{col1: item.lastRegulateFundBalance,col2: item.regulateFundBalanceAct,col3: '',col1_unit:'亿元',col2_unit:'亿元'},
								
							{col1: '本周监管资金余额<br/>目标(全)(G=A*B)',col2: '本周计划压降及盘活金额',col3: ''},
							{col1: item.regulateFundBalance,col2: item.resurrectionAmt,col3: '',col1_unit:'亿元',col2_unit:'亿元'},
						];
					}else{
						signAndPaymentItem = [
							{col1: '完成率<br/>(F = 1-(-E/D))',col2: '差额<br/>(E=D-C)',col3: '奖罚金额<br/>(E*奖罚系数)'},
							{col1: '',col2: '',col3: '',col1_unit:'',col2_unit:''},
							
							{col1: '前5月及本月<br>累计回款(全)(A)',col2: '目标监管比例<br/>(B)',col3: '实际监管比例<br/>(C/A)'},
							{col1: item.accuCollection,col2: item.regulateRatio,col3: item.regulateRatioAct,col1_unit:'亿元',col2_unit:'%',col3_unit:'%'},
							
							{col1: '本月监管资金余额<br/>目标(全)(D=A*B)',col2: '本月监管资金余额<br/>实际(C)',col3: ''},
							{col1: item.regulateFundBalance,col2: item.regulateFundBalanceAct,col3: '',col1_unit:'亿元',col2_unit:'亿元'},
						];
					}
					//红绿灯判断
					signAndPaymentItem[1].col1 = "<span style='font-size:18px;'>" + item.completionRate + "<span style='font-size:10px'>%</psan></span>"
					signAndPaymentItem[1].col1color = item.completionRate>=100?{color:'green'}:{color:'red'};
					signAndPaymentItem[1].col2 = "<span style='font-size:18px;'>" + item.differenceAmt + "<span style='font-size:10px'>亿元</psan></span>"
					signAndPaymentItem[1].col2color = item.differenceAmt>=0?{color:'green'}:{color:'red'};
					if(this.reqParam.queryType == 1){
						signAndPaymentItem[1].col3 = "<span style='font-size:18px;'>" + item.regulateAward + "<span style='font-size:10px'>万元</psan></span>"
						signAndPaymentItem[1].col3color = item.completionRate>=100?{color:'green'}:{color:'red'};
					}
					this.list.push({
						title: item.businessName,
						grpMarketingCode:item.businessCode,
						grpMarketingName:item.businessName,
						items: signAndPaymentItem,

					})
				});
			},
			test(){
				return 3;
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
				if(index == 1){
					this.selectTabList[1] = {name: this.reqParam.currMonth}
				}
			},
			initMonthList(){
				this.monthList.forEach((item,index) => {
					if(item == this.reqParam.currMonth){
						this.actionSheets[1][index]= {name: item,code: index,color: '#00a1ff'};
					}else{
						this.actionSheets[1][index]= {name: item,code: index,color: null};
					}
				})
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
					this.reqParam.queryType = res.detail.code;
					if(res.detail.code == 0){
						this.reqParam.currMonth = '';
						this.selectTabList=	[{name: '过程监控'},{name:'',hiddenImage:true}];
						this.initData();  //queryType 0   currMonth ''
					}else{
						this.selectTabList[1] = {name: this.actionSheets[1][0].name};				
						this.reqParam.currMonth = this.actionSheets[1][0].name;
						this.list = [];
						this.persionInfo = {title:'该数据截止于：',id:null,userName:null,dateTime:"数据加载中..."};
						this.initData();
					}
				}else if(this.index === 1){
					this.reqParam.currMonth = res.detail.name;
					//如果是月度考核
					if(this.reqParam.queryType == 1){
						this.list = [];
						this.persionInfo = {title:'该数据截止于：',id:null,userName:null,dateTime:"数据加载中..."};
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
