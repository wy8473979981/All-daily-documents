<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
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
			title: '全宝龙',
			watermarkText:'',
			isFullCal: this.$store.state.isFullCal,
			tipsList: this.$store.state.availablePageTipsList,
			list: [],
			reqParam:{
				interfaceType:'2',//0 概况 1 事业部汇总 2 项目汇总 3 项目明细
				queryType:'',// '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
				caliberType:this.$store.state.isFullCal ? '0':'1'
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
					width: "330rpx"
				},
				{
					label: "事业部",
					key: "divisionName",
					color: "#3992BA",
					align: "left",
					width: "330rpx"
				},
				{
					label: "营销分组",
					key: "grpMarketingName",
					color: "#3992BA",
					align: "left",
					width: "330rpx"
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
					width: "330rpx"
				},
				{
					label: "事业部",
					key: "divisionName",
					color: "#3992BA",
					align: "left",
					width: "330rpx"
				},
				{
					label: "营销分组",
					key: "grpMarketingName",
					color: "#3992BA",
					align: "left",
					width: "330rpx"
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
				{name: '权益口径'},
                {name: '下载',hiddenImage:'1'}
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
	onLoad: function () {
		if(localStorage.getItem('watermarkText')){
			this.watermarkText = localStorage.getItem('watermarkText')
		}
		this.initData()
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
				}
			})
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
			if(this.index === 2){
				this.downloadProjectUnsold()
			}
			this.$forceUpdate()
		},
		async downloadProjectUnsold() {
			console.log("download")
			uni.showLoading({
				title: "保存中..."
			})
			uni.downloadFile({
				url: window.location.origin +'/operatingWeb/appGoods/downloadProjectUnsoldList.htm?reqParamJson='+JSON.stringify(this.reqParam),
				header: {
					'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  //这里指定的数据要和后端对应
				},
				success:(result)=> {
					var tempFilePath = result.tempFilePath;
					uni.openDocument({
						filePath: tempFilePath,
						success:()=> {
							uni.showToast({
							title: "保存成功",
							duration: 2000
							})
						},
						fail:()=>{
							console.log("openDocument 失败");
							uni.hideLoading();
						},
						complete: function() {
							uni.hideLoading();
						}
					})
				},
				fail:()=> {
					console.log("downloadFile 失败");
				}
			})
		}
	}
}
</script>
<style>
@import "./index.css"
</style>
