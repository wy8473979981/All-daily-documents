<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<view v-if="list" v-for="(data,index) in list">
			<page-title :title="data.title" :subtitle="data.subtitle"></page-title>
			<app-table :key="'tab'+index" v-if="data.periodName !=='noPlPeriod'" :changeNum.sync="changeNum" :fixednum="2" :totalRow.sync="totalRow" :values.sync="data.rowList" :columns.sync="projectColumns"></app-table>
		</view>
		<!-- vant-ui-action-sheet -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		
		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
	import pageTop from "@/components/page-header/page-top.vue"
	import pageHeader from "@/components/page-header/page-header.vue"
	import appTable from "@/components/table/index"
	import pageTitle from "@/components/page-title/page-title.vue"
	import pageLineTitle from "@/components/page-title/page-line-title.vue"
	import wechat from "@/utils/wechat.js"

	export default {
		data() {
			return {
				title: '',
				watermarkText:'',
				tipsList: this.$store.state.supplyPageTipsList,
				persionInfo: null,
				supplyQueryParam: {
					queryType: '0', // 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
					annual: null, // 年月度  0：月度 1：年度
					groupMarketing: '', // 营销分组id
					projectId: '' // 项目id
				},
				list:[
					{
						title:'',
						periodName:'',
						rowList:[]
					}
				],
				totalRow: null,
				projectColumns: [
					{
						label: "成本分期",
						key: "periodName",
						align: "left",
						width: "150rpx",
					},
					{
						label: "楼栋名称",
						key: "buildingName",
						align: "left",
						width: "200rpx",
					},
					{
						label: "汇总业态",
						key: "scopeCategoryName",
						align: "left",
						width: "150rpx",
					},
					{
						label: "供货日期",
						key: "supplyDate",
						align: "left",
						width: "210rpx",
					},
					{
						label: "面积(m²)",
						key: "supplyArea",
						width: "220rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "参考单价(万元)",
						key: "unsoldPrice",
						width: "220rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "全口径货值(万元)",
						key: "saleAmount",
						width: "220rpx",
						sortable: false,
						align: "right",
					},
					{
						label: "权益货值(万元)",
						key: "equitySaleAmount",
						width: "220rpx",
						sortable: false,
						align: "right",
					}
				],
				changeNum: 1,
				result:null,
				selectTabList:[
					{name: '全部业态'}
				],
				show: [false],
				close: true,
				index: null,
				vas1: null,
				actionSheets: {
					0: [
						{name: '全部业态',code: '0',color: null},
						{name: '住宅',code: '1',color: null,},
						{name: '商办',code: '2',color:null,},
						{name: '车位其他',code: '3',color: ''}
					]
				}
			};
		},
		components: {
			pageTop,
			pageHeader,
			appTable,
			pageTitle,
			pageLineTitle
		},
		onLoad: function(options) {
			this.title = options.projectName
			this.supplyQueryParam.projectId = options.projectId
			this.supplyQueryParam.queryType = options.queryType
			
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			
			this.initSelectTabList()
			this.initData();
		},
		onShow() {
			this.initData()
		},
		methods: {
			// 初始化数据-首页
			async initData() {
				await this.$http('post', 'supplyProject', this.supplyQueryParam, true, true).then(res => {
					if (res && res.data && res.data) {
						this.result = res.data;
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
			createHtml(data,state) {
				this.list = [];
				if(data){
					Object.keys(data).forEach(key => {
						const item = data[key];
						let rowItem = {title: key,periodName:key,rowList:[]};
						item.forEach(rowData=>{
							if (rowData.periodName !== '合计') {
								let newRow = {};
								newRow.periodName = rowData.periodName;
								newRow.buildingName = rowData.buildingName;
								newRow.scopeCategoryName = rowData.scopeCategoryName;
								newRow.supplyDate = rowData.supplyDate;

								newRow.supplyArea = parseFloat(rowData.supplyArea).toFixed(2);
								newRow.unsoldPrice = parseFloat(rowData.unsoldPrice).toFixed(2);
								newRow.saleAmount = parseFloat(rowData.saleAmount).toFixed(2);
								newRow.equitySaleAmount = parseFloat(rowData.equitySaleAmount).toFixed(2);
								rowItem.rowList.push(newRow);
							}
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
				let index = parseInt(this.supplyQueryParam.queryType);
				this.selectTabList[0] = {name: this.actionSheets[0][index].name}
				this.actionSheets[0][index].color = '#00a1ff'
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
