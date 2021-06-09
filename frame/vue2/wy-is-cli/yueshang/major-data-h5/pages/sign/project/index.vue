<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<view v-if="list" v-for="(data,index) in list">
			<page-title :title="data.title" :subtitle="data.subtitle"></page-title>
			 <app-table :key="index" :changeNum.sync="changeNum" :fixednum="2" :totalRow.sync="totalRow" :values.sync="data.rowList" :columns.sync="projectColumns"></app-table>
		</view>
		<!-- 下拉框组件数据 -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<!-- 用户名水印 -->
		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
	import pageTop from "@/components/page-header/page-top.vue"
	import indexContent from "@/components/page-content/page-content.vue"
	import appTable from "@/components/table/index"
	import pageTitle from "@/components/page-title/page-title.vue"

	export default {
		data() {
			return {
				title: '',
				watermarkText:'',
				tipsList: this.$store.state.signPageTipsList,
				reqParam: {
					interfaceType: '3', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '', // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
					projectCode:''
				},
				list:[
					{
						title:'',
						periodName:'',
						rowList:[]
					}
				],
				datalist : [],
				equityDataList : [],
				totalRow: null,
				projectColumns: [{label: "序号",width: "90rpx",},
					{label: "项目名称",key: "projectName",color: "#3992BA",align: "left",width: "220rpx",},
					{label: "汇总业态",key: "scopeCategoryName",color: "#3992BA",align: "left",width: "220rpx",},
					{label: "昨日签约金额",key: "signAmount",width: "320rpx",sortable: false,align: "right",},
					{label: "本月签约面积",key: "monthSignArea",width: "320rpx",sortable: false,align: "right",},
					{label: "本月签约金额",key: "monthSignAmount",width: "200rpx",sortable: false,align: "right",},
					{label: "本年签约面积",key: "yearSignArea",width: "320rpx",sortable: false,align: "right",},
					{label: "本年签约金额",key: "yearSignAmount",width: "200rpx",sortable: false,align: "right",},
					{label: "更新人",key: "modifyUserName",width: "200rpx",sortable: false,align: "left",},
					{label: "更新时间",key: "modifyDate",width: "380rpx",sortable: false,align: "left",}
				],
				changeNum: 1,
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
			indexContent,
			appTable,
			pageTitle
		},
		onLoad: function(options) {
			this.title = options.projectName
			this.reqParam.projectCode = options.projectCode
			this.reqParam.queryType = options.queryType
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			this.initSelectTabList()
			this.initData(this.$store.state.isFullCal)
		},
		methods: {
			// 初始化数据-首页
			async initData(state) {
				await this.$http('post', 'appSignAndPaymentByDetail', this.reqParam, false, true).then(res => {
					if (res && res.data && res.data.dataList) {
						this.list = [];
						let data;
						this.dataList = res.data.dataList;
						this.equityDataList = res.data.equityDataList;
						if(state){
							data = res.data.dataList;
						}else{
							data = res.data.equityDataList;
						}
						this.createHtml(data,this.$store.state.isFullCal);
						uni.hideLoading();
					}else{
						this.list = [{
							title:'',
							periodName:'',
							rowList:[]
						}];
					}
				})
			},
			createHtml(data,state){
				Object.keys(data).forEach(key => {
					const item = data[key];
					let rowItem = {title:key ==='noPlPeriod'?'非自操盘分期':key,periodName:key,rowList:[]};
					item.forEach(rowData=>{
						let newRow = {};
						newRow.projectName = rowData.projectName;
						newRow.periodName = rowData.periodName;
						newRow.scopeCategoryName = rowData.scopeCategoryName;
						newRow.signAmount = rowData.signAmount.toFixed(2);
						newRow.monthSignArea = rowData.monthSignArea.toFixed(2);
						newRow.monthSignAmount = rowData.monthSignAmount.toFixed(2);
						newRow.yearSignArea = rowData.yearSignArea.toFixed(2);
						newRow.yearSignAmount = rowData.yearSignAmount.toFixed(2);
						newRow.modifyUserName = rowData.modifyUserName;
						newRow.modifyDate = rowData.modifyDate;
						rowItem.rowList.push(newRow);
					});
					this.list.push(rowItem);
					setTimeout(() => {
						this.changeNum ++
					},200)
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
					this.initData(state);
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
			}
		}
		
	}
</script>
<style>
	@import "./index.css"
</style>
