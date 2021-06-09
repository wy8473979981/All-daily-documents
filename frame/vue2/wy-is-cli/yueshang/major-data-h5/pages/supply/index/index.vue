<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-content :data="list[0]" title="动态供货" :users="users1" @userTab="userTab"  url="/pages/supply/division/index" show></page-content>
		
		<!-- vant-ui-action-sheet -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas3" :show="show[2]" :actions="actionSheets[2]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		
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
				list: [{title: '全宝龙',subtitle: '本月项目',type : '1',total: '',items: [],proTitle:'无指标项目列表'}], // 首页数据
				supplyQueryParam: {
					queryType: '0' ,// '' 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
					divisionOrGroupMarketing:'0'//'0' 事业部 '1' 营销组
				},
				result: null,
				supplyResult: null, // 供货汇总结果
				tipsList: this.$store.state.supplyPageTipsList,
				users1: [],
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'},
					{name: '全项目清单',hiddenImage:'1'}
				],
				show: [false,false,false],
				close: true,
				index: null,
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
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			this.initData()
		},
		onShow() {
			this.initData()
		},
		methods: {
			// 初始化数据
			async initData() {
				// 初始化供货汇总
				this.$http('post', 'supplySummary', this.supplyQueryParam,false,true).then(res => {
					if (res && res.data) {
						this.supplyResult = res.data;
						this.createSupplyHtml(this.supplyResult,this.$store.state.isFullCal);
					}
				})
            },
			// 创建供货属性
			createSupplyHtml(data, state) {
				// 整体货值项目总数赋值
				this.list[0].total = data.projectNumber + '个';
				//月度无数据项目列表
				let noEntryProjectNameListMonth = [];
				for (let i = 0; i < data.noEntryProjectNameListMonth.length; i++) {
					let item = data.noEntryProjectNameListMonth[i];
					noEntryProjectNameListMonth[i] = {name: item}
				}
				//年度无数据项目列表
				let noEntryProjectNameListYear = [];
				for (let i = 0; i < data.noEntryProjectNameListYear.length; i++) {
					let item = data.noEntryProjectNameListYear[i];
					noEntryProjectNameListYear[i] = {name: item}
				}
				let supplyItem = [
					{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '指标面积',col2: '实际面积',col3: ''},
					{col1: data.planSupplyAreaMonth,col2: data.supplyAreaMonth,col3: '',
					col1_unit:'万㎡',col2_unit:'万㎡',col2_toast:noEntryProjectNameListMonth.length > 0 ? noEntryProjectNameListMonth:null},
					
					{col1:  '',col2: '',col3: ''},
					{col1: '指标金额',col2: '实际金额',col3: ''},
					{col1: state?data.planSaleAmountMonth:data.equityPlanSaleAmountMonth,col2: state?data.saleAmountMonth:data.equitySaleAmountMonth,col3: '',
					col1_unit:'亿元',col2_unit:'亿元'},
					
					{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '指标面积',col2: '实际面积',col3: ''},
					{col1: data.planSupplyAreaYear,col2: data.supplyAreaYear,col3: '',
					col1_unit:'万㎡',col2_unit:'万㎡',col2_toast:noEntryProjectNameListYear.length > 0 ? noEntryProjectNameListYear:null},
					
					{col1: '',col2: '',col3: ''},
					{col1: '指标金额',col2: '实际金额',col3: '本年完成率'},
					{col1: state?data.planSaleAmountYear:data.equityPlanSaleAmountYear,
					col2: state?data.saleAmountYear:data.equitySaleAmountYear,
					col3: state?data.completionYear:data.equityCompletionYear,
					col1_unit:'亿元',col2_unit:'亿元',col3_unit:'%'},

					{col1: '截至上月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '指标面积',col2: '实际面积',col3: ''},
					{col1: data.deadlineLastMonthPlanSupply,col2: data.deadlineLastMonthSupply,col3: '',
					col1_unit:'万㎡',col2_unit:'万㎡'},
					
					{col1: '',col2: '',col3: ''},
					{col1: '指标金额',col2: '实际金额',col3: '偏差率'},
					{col1: '',col2: '',col3: ''},
				];
				
				let deadlineLastMonthPlanCompletion = state?data.deadlineLastMonthPlanCompletion:data.deadlineLastMonthEquityPlanCompletion;
				let deadlineLastMonthIndex = state?data.deadlineLastMonthIndex:data.deadlineLastMonthEquityIndex;
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1, 2, 3, 4, 5,6].forEach((son, sindex) => {
						supplyItem[17].col1 = state?data.deadlineLastMonthPlanSupplyAmount:data.deadlineLastMonthEquityPlanSupplyAmount // 本年计划供货货值
						supplyItem[17].col2 = state?data.deadlineLastMonthSupplyAmount:data.deadlineLastMonthEquitySupplyAmount // 本年供货货值
						supplyItem[17].col1_unit = '亿元'
						supplyItem[17].col2_unit = '亿元'
						supplyItem[17].col3_unit = '%'
						supplyItem[17].col3_toast= (deadlineLastMonthIndex < 0 ? '缺口：':'超额:') + deadlineLastMonthIndex + '亿元'
						//红绿灯处理 
						supplyItem[17].col3 = state?data.deadlineLastMonthPlanCompletion:data.deadlineLastMonthEquityPlanCompletion
						supplyItem[17].col3color = deadlineLastMonthPlanCompletion === '-' ? null : deadlineLastMonthPlanCompletion >= 0 ? {color:'green'}:{color:'red'}
					})
				});
				this.users1 = [];
				if (data.operatorList && data.operatorList.length > 0) {
					for (let i = 0; i < data.operatorList.length; i++) {
						let operator = data.operatorList[i];
						this.users1[i] = {name: operator.userName, id: operator.userId};
					}
				}
				// 赋值
				this.list[0].items = supplyItem;
				this.list[0].params = {queryType:this.supplyQueryParam.queryType};
			},
			userTab(user) {
				this.$wechat.pageGo(user.id)
			},
			onSelect(res) {
				// 默认情况下点击选项时不会自动收起
			    // 可以通过 close-on-click-action 属性开启自动收起
			    this.close = !this.close
				this.show = [false,false]
				this.selectTabList[this.index].name = res.detail.name
				this.actionSheets[this.index].forEach((item,ind) => {
					if( item.name === res.detail.name) {
						item.color = '#00a1ff'
					}else{
						item.color = null
					}
				})
				if(this.index === 1){//口径变化
					this.$store.state.isFullCal = res.detail.code
					this.createSupplyHtml(this.supplyResult,res.detail.code)
				}else{
					this.supplyQueryParam.queryType = res.detail.code
					this.initData()
				}
			},
			overlay() {
				this.close = !this.close
				this.show = [false,false]
			},
			showPop(res) {
				this.index = res.index
				this.show[res.index] = true
				if(this.index === 2){
					uni.navigateTo({
						url: '/pages/supply/list/project'
					})
				}
				this.$forceUpdate()
			}
		}
	}
</script>
<style>
	@import "./index.css"
</style>
