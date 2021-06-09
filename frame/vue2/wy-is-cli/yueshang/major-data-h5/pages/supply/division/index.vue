<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<index-content v-for="data in list" :data="data" :users="data.users" @userTab="userTab" url="/pages/supply/ranking/index"></index-content>
		
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
	import wechat from "@/utils/wechat.js"
	
	export default {
		data() {
			return {
				title: '全宝龙',
				watermarkText:'',
				list: [],
				supplyQueryParam: {
					divisionOrGroupMarketing:'0',//'0' 事业部 '1' 营销组
					queryType: '0', // 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
					annual: null // 年月度  0：月度 1：年度
				},
				result: null,
				tipsList: this.$store.state.supplyPageTipsList,
				operatorList:[], // 操作人集合
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'},
					{name: '事业部'}
				],
				show: [false,false,false],
				close: true,
				index: null,
				vas1: null,
				vas2: null,
				vas3: null,
				actionSheets: {
					0: [
						{name: '全部业态',code: '0',color: null},
						{name: '住宅',code: '1',color: null,},
						{name: '商办',code: '2',color:null,},
						{name: '车位其他',code: '3',color: ''}
					],
					1: [
						{name: '权益口径',code: false,color: null},
						{name: '全口径',code: true,color: null}
					],
					2: [
						{name: '事业部',code: '0', color: '#00a1ff'},
						{name: '营销组',code: '1',color: null}
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
			this.supplyQueryParam.queryType = params.queryType
			
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			
			this.initSelectTabList()
			this.initData()
		},
		onShow() {
			this.initData()
		},
		methods: {
			// 初始化数据-首页
			async initData() {
				await this.$http('post', 'supplyDivisions', this.supplyQueryParam, false, true).then(res => {
					if (res && res.data && res.data) {
						this.result = res.data;
						this.createHtml(this.result,this.$store.state.isFullCal)
					}
				})

			},
			createHtml(data,state) {
				this.list = [];
				// 初始化展示
				Object.keys(data).forEach(key => {
					const item = data[key];
					let noEntryProjectNameListMonth = [];
					if (item.noEntryProjectNameListMonth) {
						for (let i = 0; i < item.noEntryProjectNameListMonth.length; i++) {
							let val = item.noEntryProjectNameListMonth[i];
							noEntryProjectNameListMonth[i] = {name: val}
						}
					}

					let noEntryProjectNameListYear = [];
					if (item.noEntryProjectNameListYear) {
						for (let i = 0; i < item.noEntryProjectNameListYear.length; i++) {
							let val = item.noEntryProjectNameListYear[i];
							noEntryProjectNameListYear[i] = {name: val}
						}
					}
					
					let deadlineLastMonthPlanCompletion = state?item.deadlineLastMonthPlanCompletion:item.deadlineLastMonthEquityPlanCompletion;
					let deadlineLastMonthIndex = state?item.deadlineLastMonthIndex:item.deadlineLastMonthEquityIndex;
					let	supplyItem = [
					{col1: '本月',col1class:'custom-title-cls', col2: '', col3: ''},
					{col1: '指标面积', col2: '实际面积', col3: ''},
					{col1: item.planSupplyAreaMonth,col2: item.supplyAreaMonth,col3: '',
					col1_unit: '万㎡', col2_unit: '万㎡',col2_toast: noEntryProjectNameListMonth.length > 0 ? noEntryProjectNameListMonth:null},
					
					{col1: '', col2: '', col3: ''},
					{col1: '指标金额', col2: '实际金额',col3: ''},
					{col1: state?item.planSaleAmountMonth:item.equityPlanSaleAmountMonth,col2: state?item.saleAmountMonth:item.equitySaleAmountMonth,col3: '',
					 col1_unit: '亿元', col2_unit: '亿元'},

					{col1:  '本年',col1class:'custom-title-cls', col2: '', col3: ''},
					{col1: '指标面积', col2: '实际面积', col3: ''},
					{col1: item.planSupplyAreaYear,col2: item.supplyAreaYear,col3: '',
					col1_unit: '万㎡', col2_unit: '万㎡',col2_toast: noEntryProjectNameListYear.length > 0 ? noEntryProjectNameListYear:null},
					
					{col1: '', col2: '', col3: ''},
					{col1: '指标金额', col2: '实际金额',col3: '本年完成率'},
					{col1: state?item.planSaleAmountYear:item.equityPlanSaleAmountYear,
					col2: state?item.saleAmountYear:item.equitySaleAmountYear,
					col3: state?item.completionYear:item.equityCompletionYear,
					col1_unit: '亿元', col2_unit: '亿元',col3_unit: '%'},

					{col1: '截至上月',col1class:'custom-title-cls', col2: '', col3: ''},
					{col1: '指标面积',col2: '实际面积',col3: ''},
					{col1: item.deadlineLastMonthPlanSupply,col2: item.deadlineLastMonthSupply,col3:'',
					col1_unit:'万㎡',col2_unit:'万㎡'},
					
					{col1: '', col2: '', col3: ''},
					{col1: '指标金额',col2: '实际金额',col3: '偏差率'},
					{col1: state?item.deadlineLastMonthPlanSupplyAmount:item.deadlineLastMonthEquityPlanSupplyAmount
					, col2: state?item.deadlineLastMonthSupplyAmount:item.deadlineLastMonthEquitySupplyAmount
					, col3:deadlineLastMonthPlanCompletion,
					col3_toast:(deadlineLastMonthIndex < 0 ? '缺口：':'超额:') + deadlineLastMonthIndex + '亿元',
					 col3color:deadlineLastMonthPlanCompletion === '-' ? null : deadlineLastMonthPlanCompletion >= 0 ? {color:'green'}:{color:'red'},
					col1_unit:'亿元',col2_unit:'亿元',col3_unit:'%'},
				];

					let users = [];
					if (item.operatorList && item.operatorList.length > 0) {
						for (let i = 0; i < item.operatorList.length; i++) {
							let operator = item.operatorList[i];
							users[i] = {name: operator.userName, id: operator.userId};
						}
					}
					
					let params = {divisionCode:item.divisionCode,
									divisionName:item.divisionName,
									groupMarketing:item.grpMarketingCode,
									groupMarketingName:item.grpMarketingName,
									divisionOrGroupMarketing:this.supplyQueryParam.divisionOrGroupMarketing,
									queryType:this.supplyQueryParam.queryType};
					this.list.push({
						title: key,
						items: supplyItem,
						params:params,
						users:users,
						type: '1',
						proTitle:'无指标项目列表'
					})
				});
			},
			userTab(user) {
				wechat.pageGo(user.id)
			},
			initSelectTabList(){
				let index = parseInt(this.supplyQueryParam.queryType)
				this.selectTabList[0] = {name: this.actionSheets[0][index].name}
				this.actionSheets[0][index].color = '#00a1ff'
				
				if(this.$store.state.isFullCal){
					this.selectTabList[1] = {name: '全口径'}
					this.actionSheets[1][1].color = '#00a1ff'
				}else{
					this.selectTabList[1] = {name: '权益口径'}
					this.actionSheets[1][0].color = '#00a1ff'
				}
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
					this.createHtml(this.result,res.detail.code)
				}else if(this.index === 2){//事业部营销组变化
					this.supplyQueryParam.divisionOrGroupMarketing = res.detail.code
					this.initData()
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
				this.$forceUpdate()
			}
		}
	}
</script>
<style>
	@import "./index.css"
</style>
