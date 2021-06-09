<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-line-title :param="persionInfo" fontColor="#007aff" @userTab="userTab"></page-line-title>
		<app-table :fixednum="2" :totalRow="totalRow" :values="list" :columns="projectColumns" :selected="tableSelected"></app-table>
		<!-- 下拉框组件数据 -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<!-- 用户名水印 -->
		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
import pageTop from "@/components/page-header/page-top.vue"
import pageHeader from "@/components/page-header/page-header.vue"
import appTable from "@/components/table/index"
import pageLineTitle from "@/components/page-title/page-line-title.vue"

export default {
	data() {
		return {
			title: '全宝龙',
			watermarkText:'',
			tipsList: this.$store.state.valuePageTipsList,
			list : [],
			equityDataList : [],
			dataList : [],
			reqParam:{
				groupMarketingCode:null,
				divisionCode:null,
				dataType:'SY',
				groupType:''// 商业 SY  车位 CW
			},
			totalRow: null,
			tableSelected: {
				key: "bisProjectId",
				keysMap: {},
			},
			persionInfo:null,
			isMarketing:null,
			isAllProject:false,
			projectColumns: [
				{label: "序号",width: "90rpx",},
				{label: "项目名称",key: "orgName",color: "#3992BA",align: "left",width: "270rpx",},
				{label: "年结转可售货值",key: "carryOverValue",width: "280rpx",sortable: false,align: "right",},
				{label: "年新增货值",key: "newValue",width: "280rpx",sortable: false,align: "right",},
				{label: "总可售货值",key: "totalSaleable",width: "280rpx",sortable: false,align: "right",},
				{label: "本年指标",key: "annualIndex",width: "280rpx",sortable: false,align: "right",},
				{label: "本年实际",key: "annualCompleteSigned",width: "280rpx",sortable: false,align: "right",},
				{label: "本年完成率",key: "annualCompleteRatio",width: "280rpx",sortable: false,align: "right",},
				{label: "本月指标",key: "monthlyIndex",width: "280rpx",sortable: false,align: "right",},
				{label: "本月实际",key: "monthlyCompleteSigned",width: "280rpx",sortable: false,align: "right",},
				{label: "本月完成率",key: "monthlyCompleteRatio",width: "320rpx",sortable: false,align: "right",},
				{label: "上月累计完成",key: "lastMonthlyCompleteSigned",width: "320rpx",sortable: false,align: "right",},
				{label: "最近更新人",key: "updateName",width: "280rpx",sortable: false,align: "left",},
				{label: "最近更新日期",key: "updateDate",width: "380rpx",sortable: false,align: "left",}
			],
			selectTabList:[
				{name: '月份'},
				// {name: '权益口径'},
			],
			index: 0, 
			show: [false,false],
			close: true,
			vas1: null,
			vas2: null,
			actionSheets: {
				0: [
					{name: '一月',code: '1',color:null},
					{name: '二月',code: '2',color:null,},
					{name: '三月',code: '3',color:null,},
					{name: '四月',code: '4',color:null},
					{name: '五月',code: '5',color:null},
					{name: '六月',code: '6',color:null},
					{name: '七月',code: '7',color:null},
					{name: '八月',code: '8',color:null},
					{name: '九月',code: '9',color:null},
					{name: '十月',code: '10',color:null},
					{name:'十一月',code:'11',color:null},
					{name:'十二月',code:'12',color:null}
				],
				// 1: [
				// 	{name: '权益口径',code: false,color: null},
				// 	{name: '全口径',code: true,color: '#00a1ff'}
				// ],
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
		this.reqParam.dataType = options.dataType;
		this.reqParam.month = options.month;
		if(localStorage.getItem('watermarkText')){
			this.watermarkText = localStorage.getItem('watermarkText')
		}
		this.initSelectTabList()
		this.initData()
		//水印数据
		if(localStorage.getItem('watermarkText')){
			this.watermarkText = localStorage.getItem('watermarkText')
		}
	},
	methods: {
		// 初始化数据-首页
		async initData() {
			await this.$http('post','getBusinessAndParkingDetail',this.reqParam,false,true).then(res => {
				if(res && res.data){
					this.list = res.data;
					for(var i=0;i<res.data.length;i++){
						res.data[i].carryOverValue = res.data[i].carryOverValue.toFixed(2);
						res.data[i].newValue = res.data[i].newValue.toFixed(2);
						res.data[i].totalSaleable = res.data[i].totalSaleable.toFixed(2);
						res.data[i].annualIndex = res.data[i].annualIndex.toFixed(2);
						res.data[i].annualCompleteSigned = res.data[i].annualCompleteSigned
						=== null?0.00:res.data[i].annualCompleteSigned.toFixed(2);
						res.data[i].annualCompleteRatio = (res.data[i].annualCompleteRatio*100).toFixed(2) + '%';
						res.data[i].monthlyIndex = res.data[i].monthlyIndex.toFixed(2);
						res.data[i].monthlyCompleteSigned = res.data[i].monthlyCompleteSigned
						=== null?0.00:res.data[i].monthlyCompleteSigned.toFixed(2);
						res.data[i].monthlyCompleteRatio = (res.data[i].monthlyCompleteRatio*100).toFixed(2) + '%';
						res.data[i].lastMonthlyCompleteSigned = res.data[i].lastMonthlyCompleteSigned.toFixed(2);
						res.data[i].updateDate = this.getLocalTime(res.data[i].updateDate);
					}
				}
				uni.hideLoading();
			})
		},
		async initContactUser() {
			//两个后台接口参数不同
			let newReqParam = {groupMarketingCode:this.reqParam.groupMarketingCode};
			await this.$http('post','findContactUser',newReqParam,false,true).then(res => {
				if(res && res.data && res.data.availableContactUser){
					let params = res.data.availableContactUser;
					//加载数据
					if(!this.isMarketing){
						this.persionInfo = {title: '运营审核人：',id: params.operUserId,userName: params.operUserName,dateTime: params.operAuditedDate};
					}else{
						this.persionInfo = {title: '营销审核人：',id: params.marketUserId,userName: params.marketUserName,dateTime: params.marketAuditedDate};
					}
				}
			})
		},
		getLocalTime(nS) {
		   return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
		},
		//初始化下拉选中项
		initSelectTabList(){
			let index = parseInt(this.reqParam.groupType);
			//修改选中项选中颜色 第一个下拉
			this.actionSheets[0].forEach((item,ind) => {
				if( item.code === index.toString()) {
					item.color = '#00a1ff';
				}else{
					item.color = null;
				}
			})
			// //修改选中项选中颜色 第二个下拉
			// if(this.$store.state.isFullCal){
			// 	this.selectTabList[1] = {name: '全口径'}
			// 	this.actionSheets[1][1].color = '#00a1ff';
			// 	this.actionSheets[1][0].color = null;
			// }else{
			// 	this.selectTabList[1] = {name: '权益口径'}
			// 	this.actionSheets[1][1].color = null;
			// 	this.actionSheets[1][0].color = '#00a1ff';
			// }
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
				//月份变化
				this.reqParam.month = res.detail.code;
				this.initData();
			}else if(this.index === 1){
				//权益口径变化
				var state = res.detail.code;
				if(state){
					this.list = this.dataList;
				}else{
					this.list = this.equityDataList;
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
			if(this.index === 2){
				this.downloadProjectUnsold();
			}
			//迫使 Vue 实例重新渲染
			this.$forceUpdate();
		},
	}
}
</script>
<style>
@import "./index.css"
</style>
