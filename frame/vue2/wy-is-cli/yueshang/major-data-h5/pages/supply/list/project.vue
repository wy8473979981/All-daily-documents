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
import pageTop from "@/components/page-header/page-top.vue"
import pageHeader from "@/components/page-header/page-header.vue"
import appTable from "@/components/table/index"
import pageLineTitle from "@/components/page-title/page-line-title.vue"
import wechat from "@/utils/wechat.js"

export default {
	data() {
		return {
			watermarkText:'',
			title: '',
			isFullCal: this.$store.state.isFullCal,
			tipsList: this.$store.state.supplyPageTipsList,
			list: [],
			supplyQueryParam: {
				queryType: '0', // 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
				annual: null, // 年月度  0：月度 1：年度
			},
			totalRow: null,
			tableSelected: {
				key: "bisProjectId",
				keysMap: {},
			},
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
					label: "本月累计供货面积(万㎡)",
					key: "supplyAreaMonth",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本月供货指标面积(万㎡)",
					key: "planSupplyAreaMonth",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本月累计供货货值(亿元)",
					key: "saleAmountMonth",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本月供货指标货值(亿元)",
					key: "planSaleAmountMonth",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本年实际供货面积(万㎡)",
					key: "supplyAreaYear",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本年供货指标面积(万㎡)",
					key: "planSupplyAreaYear",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本年实际供货货值(亿元)",
					key: "saleAmountYear",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本年供货指标货值(亿元)",
					key: "planSaleAmountYear",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计供货(万㎡)",
					key: "deadlineLastMonthSupply",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计指标(万㎡)",
					key: "deadlineLastMonthPlanSupply",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计供货(亿元)",
					key: "deadlineLastMonthSupplyAmount",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计指标(亿元)",
					key: "deadlineLastMonthPlanSupplyAmount",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "填写人",
					key: "fillPerson",
					width: "150rpx",
					sortable: false,
					align: "left",
				},
				{
					label: "填写日期",
					key: "fillDate",
					width: "210rpx",
					sortable: false,
					align: "left",
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
					label: "本月累计供货面积(万㎡)",
					key: "supplyAreaMonth",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本月供货指标面积(万㎡)",
					key: "planSupplyAreaMonth",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本月累计供货货值(亿元)",
					key: "equitySaleAmountMonth",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本月供货指标货值(亿元)",
					key: "equityPlanSaleAmountMonth",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本年实际供货面积(万㎡)",
					key: "supplyAreaYear",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本年供货指标面积(万㎡)",
					key: "planSupplyAreaYear",
					width: "300rpx",
					sortable: false,
					align: "right"
				},
				{
					label: "本年实际供货货值(亿元)",
					key: "equitySaleAmountYear",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "本年供货指标货值(亿元)",
					key: "equityPlanSaleAmountYear",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计供货(万㎡)",
					key: "deadlineLastMonthSupply",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计指标(万㎡)",
					key: "deadlineLastMonthPlanSupply",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计供货(亿元)",
					key: "deadlineLastMonthEquitySupplyAmount",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "截至上月累计指标(亿元)",
					key: "deadlineLastMonthEquityPlanSupplyAmount",
					width: "300rpx",
					sortable: false,
					align: "right",
				},
				{
					label: "填写人",
					key: "fillPerson",
					width: "150rpx",
					sortable: false,
					align: "left",
				},
				{
					label: "填写日期",
					key: "fillDate",
					width: "210rpx",
					sortable: false,
					align: "left",
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
		pageTop,
		pageHeader,
		pageLineTitle,
		appTable
	},
	onLoad: function (options) {
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
			await this.$http('post','supplyProjects',this.supplyQueryParam,false,true).then(res => {
				this.list = [];
				if(res && res.data && res.data.list){
					this.list = res.data.list;
				}
			})
			
		},
		// tab click callback function
		onRowColumnClick(data) {
			const rowSelected = data.detail.row;
			uni.navigateTo({
				url: '/pages/supply/project/index?projectId=' + rowSelected.projectCode
						+'&queryType=' + this.supplyQueryParam.queryType
						+'&projectName=' + rowSelected.projectName
			})
		},
		createHtml(data,state) {
			this.isFullCal = state;
			setTimeout(() => {
				this.changeNum ++
			},200);
		},
		initSelectTabList(){
			let index = parseInt(this.supplyQueryParam.queryType);
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
				this.createHtml(this.list,res.detail.code)
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
				this.downloadProjectSupply()
			}
			this.$forceUpdate()
		},
		async downloadProjectSupply() {
					console.log("download")
					uni.showLoading({
						title: "保存中..."
					})
					uni.downloadFile({
						url: window.location.origin + '/operatingWeb/supply/exportExcel.htm?data='+JSON.stringify(this.supplyQueryParam), 
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
