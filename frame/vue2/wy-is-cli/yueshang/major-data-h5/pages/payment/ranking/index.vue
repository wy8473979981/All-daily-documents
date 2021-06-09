<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-line-title :param="persionInfo" fontColor="#007aff" @userTab="userTab"></page-line-title>
		<app-table :fixednum="2" :totalRow="totalRow" :values="list" :columns="projectColumns" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
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
			tipsList: this.$store.state.paymentPageTipsList,
			list: [],
			equityDataList : [],
			dataList : [],
			reqParam:{
				interfaceType:'2',//0 概况 1 事业部汇总 2 项目汇总 3 项目明细
				queryType:''// '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
			},
			totalRow: null,
			tableSelected: {
				key: "bisProjectId",
				keysMap: {},
			},
			persionInfo:null,
			isMarketing:true,
			isAllProject:false,
			projectColumns: [
				{label: "序号",width: "90rpx",},
				{label: "项目名称",key: "projectName",color: "#3992BA",align: "left",width: "270rpx",},
				{label: "昨日回款",key: "paymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本月回款金额",key: "monthPaymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本月回款指标",key: "monthPaymentIndexAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本年回款金额",key: "yearPaymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本年回款指标",key: "yearPaymentIndexAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "截止上月累计回款",key: "lastMonthPaymentAmount",width: "320rpx",sortable: false,align: "right",},
				{label: "截止上月回款指标",key: "lastMonthPaymentIndexAmount",width: "320rpx",sortable: false,align: "right",},
				{label: "更新人",key: "modifyUserName",width: "280rpx",sortable: false,align: "left",},
				{label: "更新日期",key: "modifyDate",width: "380rpx",sortable: false,align: "left",}
			],
			selectTabList:[
				{name: '全部业态'},
				{name: '权益口径'},
			],
			index: 0, 
			show: [false,false],
			close: true,
			vas1: null,
			vas2: null,
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
		pageLineTitle,
		appTable
	},
	onLoad: function (options) {
		//水印数据
		if(localStorage.getItem('watermarkText')){
			this.watermarkText = localStorage.getItem('watermarkText')
		}
		//判断是否是直接进入全项目清单
		if(options.params === undefined){
			this.reqParam.queryType = options.queryType;
			this.isAllProject = true;
			this.selectTabList=[
				{name: '全部业态'},
				{name: '权益口径'},
				{name: '下载',hiddenImage:'1'}
			];
			this.projectColumns = [
				{label: "序号",width: "90rpx",},
				{label: "项目名称",key: "projectName",color: "#3992BA",align: "left",width: "270rpx",},
				{label: "事业部",key: "divisionName",color: "#3992BA",align: "left",width: "270rpx",},
				{label: "营销组",key: "grpMarketingName",color: "#3992BA",align: "left",width: "270rpx",},
				{label: "昨日回款",key: "paymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本月回款金额",key: "monthPaymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本月回款指标",key: "monthPaymentIndexAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本年回款金额",key: "yearPaymentAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "本年回款指标",key: "yearPaymentIndexAmount",width: "280rpx",sortable: false,align: "right",},
				{label: "截止上月累计回款",key: "lastMonthPaymentAmount",width: "320rpx",sortable: false,align: "right",},
				{label: "截止上月回款指标",key: "lastMonthPaymentIndexAmount",width: "320rpx",sortable: false,align: "right",},
				{label: "更新人",key: "modifyUserName",width: "280rpx",sortable: false,align: "left",},
				{label: "更新日期",key: "modifyDate",width: "380rpx",sortable: false,align: "left",}
				];
			this.initData();
		}else{
			//参数解析
			let params = JSON.parse(options.params);
			this.title = params.grpMarketingName;
			this.reqParam.queryType = params.queryType;
			this.reqParam.grpMarketingCode = params.grpMarketingCode;
			//加载数据
			if(params.grpMarketingCode >= 8 && params.grpMarketingCode != 99){
				this.isMarketing = false;
				//加载关联用户
				this.initContactUser();
				this.initData();
			}else{
				this.isMarketing = true;
				//加载关联用户
				this.initContactUser();
				this.initMarketingData();
			}
		}
		//初始化tab选中项
		this.initSelectTabList();
	},
	methods: {
		// 初始化数据-首页
		async initData() {
			await this.$http('post','appSignAndPaymentByProjectDept',this.reqParam,false,true).then(res => {
				if(res && res.data){
					this.list = res.data.equityData;
					this.dataList = res.data.data;
					this.equityDataList = res.data.equityData;
				}
				uni.hideLoading();
			})
		},
		// 初始化数据-首页
		async initMarketingData() {
			await this.$http('post','appSignAndPaymentByProjectMarket',this.reqParam,false,true).then(res => {
				if(res && res.data){
					this.list = res.data.equityData;
					this.dataList = res.data.data;
					this.equityDataList = res.data.equityData;
				}
				uni.hideLoading();
			})
		},
		async initContactUser() {
			//两个后台接口参数不同
			let newReqParam;
			if(!this.isMarketing){
				newReqParam = {divisionCode:this.reqParam.grpMarketingCode,interfaceType:this.reqParam.interfaceType};
			}else{
				newReqParam = {groupMarketing:this.reqParam.grpMarketingCode,interfaceType:this.reqParam.interfaceType};
			}
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
		async downloadProjectUnsold() {
			console.log("download")
			uni.showLoading({
				title: "保存中..."
			})
			console.log(window.location.origin)
			uni.downloadFile({
				url: window.location.origin+'/operatingWeb/appSignAndPayment/exportPaymentExcel.htm?data='+JSON.stringify(this.reqParam), 
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
				if(this.reqParam.grpMarketingCode >= 8 && this.reqParam.grpMarketingCode != 99){
					this.initData();
				}else{
					this.initMarketingData();
				}
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
		// 行点击事件
		onRowColumnClick(data) {
			const rowSelected = data.detail.row;
			uni.navigateTo({
				url: '/pages/payment/project/index?projectCode=' + rowSelected.projectCode+'&projectName='
				+rowSelected.projectName+'&queryType='+this.reqParam.queryType
			})
		},
	}
}
</script>
<style>
@import "./index.css"
</style>
