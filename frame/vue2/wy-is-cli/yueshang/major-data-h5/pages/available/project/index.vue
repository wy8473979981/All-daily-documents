<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-line-title :param="persionInfo" fontColor="#007aff" @userTab="userTab"></page-line-title>
		<view v-if="list" v-for="(data,index) in list">
			<page-title :title="data.title" :subtitle="data.subtitle"></page-title>
			<app-table :key="'tab'+index" :changeNum.sync="changeNum" :fixednum="2" :totalRow.sync="totalRow" :values.sync="data.rowList" :columns.sync="projectColumns"></app-table>
		</view>
		
		<!-- vant-ui-action-sheet -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		
		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
	import wechat from "@/utils/wechat.js"

	export default {
		data() {
			return {
				title: '',
				watermarkText:'',
				persionInfo: null,
				isFullCal: this.$store.state.isFullCal,
				tipsList: this.$store.state.availablePageTipsList,
				reqParam: {
					interfaceType: '3', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '', // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
					grpMarketingCode: '',
					projectCode:''
				},
				list:[
					{
						title:'',
						periodName:'',
						rowList:[]
					}
				],
				totalRow: null,
				projectColumns: [{
						label: "序号",
						width: "90rpx",
					},
					{
						label: "汇总业态",
						key: "scopeCategoryName",
						align: "left",
						width: "150rpx",
					},
					{
						label: "全部业态",
						key: "formatsName",
						align: "left",
						width: "260rpx",
					},
					{
						label: "面积类型",
						key: "saleType",
						align: "left",
						width: "260rpx",
					},
					{
						label: "面积(m²)",
						key: "salableArea",
						width: "320rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "参考单价(万元)",
						key: "salablePrice",
						width: "220rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "可售货值(万元)",
						key: "salableAmount",
						width: "235rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "已取证可售货值(万元)",
						key: "envidencedSalableAmount",
						width: "280rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "未取证可售货值(万元)",
						key: "unEnvidencedSalableAmount",
						width: "280rpx",
						sortable: false,
						align: "right",
					}
				],
				changeNum: 1,
				result:null,
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'}
				],
				show: [false,false],
				close: true,
				index: null,
				vas1: null,
				vas2: null,
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
					]
				}
			};
		},
		components: {
		},
		onLoad: function(options) {
			this.title = options.projectName
			this.reqParam.grpMarketingCode = options.grpMarketingCode
			this.reqParam.projectCode = options.projectCode
			this.reqParam.queryType = options.queryType
			
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText');
			}
			
			this.initSelectTabList()
			this.initData()
			this.initContactUser()
		},
		onShow() {
			this.initData()
		},
		methods: {
			// 初始化数据-首页
			async initData() {
				await this.$http('post', 'appGoodsAvailable', this.reqParam, true, true).then(res => {
					if (res && res.data && res.data.marketingUnSoldGroupByPeriodMap) {
						this.result = res.data.marketingUnSoldGroupByPeriodMap;
						this.createHtml(this.result,this.$store.state.isFullCal);
					}else{
						this.list = [{
							title:'',
							periodName:'',
							rowList:[]
						}];
						setTimeout(() => {
							this.changeNum ++
						},200)
					}
				})
			},
			async initContactUser() {
				let newReqParam = {groupMarketing:this.reqParam.grpMarketingCode,interfaceType:this.reqParam.interfaceType,projectCode:this.reqParam.projectCode};
				await this.$http('post','findContactUser',newReqParam,false,true).then(res => {
					if(res && res.data && res.data.availableContactUser){
						let params = res.data.availableContactUser
						this.persionInfo = {title: '数据录入人：',id:params.dailyUserId,userName: params.dailyUserName,dateTime: params.dailyDate}
					}
				})

			},
			createHtml(data,state) {
				this.list = [];
				if(data){
					Object.keys(data).forEach(key => {
						const item = data[key];
						let rowItem = {title:key ==='noPlPeriod'?'非自操盘分期':key,subtitle:key ==='noPlPeriod'?'非同步明源':'同步明源',periodName:key,rowList:[]}
						if(item.length>0 && item[0].projectType == 1){
							rowItem.subtitle = '土储项目';
						}
						item.forEach(rowData=>{
							let newRow = {};
							newRow.formatsName = rowData.formatsName;
							newRow.scopeCategoryName = rowData.scopeCategoryName;
							newRow.saleType = rowData.saleType;

							newRow.salableArea = rowData.salableTotalArea.toFixed(2);
							newRow.envidencedSalableAmount = state?rowData.envidencedSalableTotalAmount.toFixed(2):rowData.envidencedSalableTotalRightAmount.toFixed(2);
							newRow.unEnvidencedSalableAmount = state?rowData.unenvidenceSalableTotalAmount.toFixed(2):rowData.unenvidenceSalableTotalRightAmount.toFixed(2);
							newRow.salableAmount = state?rowData.salableTotalAmount.toFixed(2):rowData.salableTotalRightAmount.toFixed(2);

							if(newRow.salableArea === 0){
								newRow.salablePrice = 0;
							}else{
								newRow.salablePrice = (newRow.salableAmount / newRow.salableArea).toFixed(2);
							}
							rowItem.rowList.push(newRow);
						});
						this.list.push(rowItem);
						
						setTimeout(() => {
							this.changeNum ++
						},200)
					});
				}else{
					this.list = [{
						title:'',
						periodName:'',
						rowList:[]
					}];
					setTimeout(() => {
						this.changeNum ++
					},200)
				}
			},
			userTab(user) {
				wechat.pageGo(user.id)
			},
			initSelectTabList(){
				let index = parseInt(this.reqParam.queryType);
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
				}else{
					this.reqParam.queryType = res.detail.code
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
