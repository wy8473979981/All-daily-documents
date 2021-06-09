<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-line-title :param="operPersionInfo" fontColor="#007aff" @userTab="userTab"></page-line-title>
		<page-line-title :param="markgetPersionInfo" fontColor="#007aff" @userTab="userTab"></page-line-title>
		<view v-if="isFullCal">
			<app-table key="isFullCal-0" :fixednum="2" :totalRow="totalRow" :changeNum="changeNum" :values="list" :columns="isFullProjectColumns" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
		</view>
		<view v-else>
			<app-table key="isNotFullCal-0" :fixednum="2" :totalRow="totalRow" :changeNum="changeNum" :values="list" :columns="isNotFullProjectColumns" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
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
			isFullCal: this.$store.state.isFullCal,
			tipsList: this.$store.state.availablePageTipsList,
			list: [],
			reqParam:{
				interfaceType:'2',//0 概况 1 事业部汇总 2 项目汇总 3 项目明细
				queryType:'',// '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
				grpMarketingCode:'',
				divisionCode:'',
				caliberType:this.$store.state.isFullCal ? '0':'1',
				divisionOrGroupMarketing:'0' //'0' 事业部 '1' 营销组
			},
			totalRow: null,
			tableSelected: {
				key: "bisProjectId",
				keysMap: {},
			},
			operPersionInfo:null,
			markgetPersionInfo:null,
			isFullProjectColumns: [
				{
					label: "序号",
					width: "90rpx",
				},
				{
					label: "项目名称",
					key: "projectName",
					color: "#3992BA",
					align: "left",
					width: "330rpx",
					message:true
				},
				{
					label: "可售总面积(万m²)",
					key: "salableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "可售总货值(亿元)",
					key: "salableTotalAmount",
					width: "260rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "已取证未售总面积(万m²)",
					key: "envidencedSalableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "已取证未售总货值(亿元)",
					key: "envidencedSalableTotalAmount",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "未取证总面积(万m²)",
					key: "unenvidenceSalableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "未取证总货值(亿元)",
					key: "unenvidenceSalableTotalAmount",
					width: "260rpx",
					sortable: false,
					align: "right",
				}
			],
			isNotFullProjectColumns: [
				{
					label: "序号",
					width: "90rpx",
				},
				{
					label: "项目名称",
					key: "projectName",
					color: "#3992BA",
					align: "left",
					width: "330rpx",
					message: true
				},
				{
					label: "可售总面积(万m²)",
					key: "salableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "可售总货值(亿元)",
					key: "salableTotalRightAmount",
					width: "260rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "已取证未售总面积(万m²)",
					key: "envidencedSalableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "已取证未售总货值(亿元)",
					key: "envidencedSalableTotalRightAmount",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "未取证总面积(万m²)",
					key: "unenvidenceSalableTotalArea",
					width: "260rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "未取证总货值(亿元)",
					key: "unenvidenceSalableTotalRightAmount",
					width: "260rpx",
					sortable: false,
					align: "right",
				}
			],
			changeNum:1,
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
	onLoad: function (options) {
		let params = JSON.parse(options.params)
		this.reqParam.queryType = params.queryType
		
		this.reqParam.divisionOrGroupMarketing = params.divisionOrGroupMarketing
		if(params.divisionOrGroupMarketing === '0'){
			this.title = params.divisionName
			this.reqParam.divisionCode = params.divisionCode
		}else{
			this.title = params.groupMarketingName
			this.reqParam.grpMarketingCode = params.grpMarketingCode
		}
		
		if(localStorage.getItem('watermarkText')){
			this.watermarkText = localStorage.getItem('watermarkText')
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
			await this.$http('post','appGoodsAvailable',this.reqParam,false,true).then(res => {
				this.list = []
				if(res && res.data && res.data.marketingUnSoldGroupByProjectList){
					this.list = res.data.marketingUnSoldGroupByProjectList;
					this.list.forEach(item=>{
						if(item.projectType == 1){
							item.message = '方案未批复项目';
						}
					});
				}
			})
		},
		async initContactUser() {
			let newReqParam = {divisionCode:null,groupMarketing:null,interfaceType:this.reqParam.interfaceType}
			if(this.reqParam.divisionOrGroupMarketing === '0'){
				newReqParam.divisionCode = this.reqParam.divisionCode
			}else{
				newReqParam.groupMarketing = this.reqParam.grpMarketingCode
			}
			await this.$http('post','findContactUser',newReqParam,false,true).then(res => {
				if(res && res.data && res.data.availableContactUser){
					let params = res.data.availableContactUser
					if(this.reqParam.divisionOrGroupMarketing === '0'){
						this.operPersionInfo = {title: '运营审核人：',id: params.operUserId,userName: params.operUserName,dateTime: params.operAuditedDate}
					}else{
						this.markgetPersionInfo = {title: '营销审核人：',id: params.marketUserId,userName: params.marketUserName,dateTime: params.marketAuditedDate}
					}
				}
			})
			
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
		// tab click callback function
		onRowColumnClick(data) {
			const rowSelected = data.detail.row;
			uni.navigateTo({
				url: '/pages/available/project/index?projectName=' + rowSelected.projectName 
						+'&projectCode=' + rowSelected.projectCode 
						+ '&grpMarketingCode=' + rowSelected.grpMarketingCode
						+ '&queryType=' + this.reqParam.queryType
			})
		},
		createHtml(data,state) {
			this.isFullCal = state;
			setTimeout(() => {
				this.changeNum ++
			},200);
		},
		userTab(user) {
			wechat.pageGo(user.id)
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
