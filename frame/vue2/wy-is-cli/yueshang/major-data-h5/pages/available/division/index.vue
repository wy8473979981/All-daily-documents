<template>
	<div class="ys-page">
		<page-top :title="title" @calBack="calBack"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-content v-for="data in list" :data="data" :users="data.users" @userTab="userTab" url="/pages/available/ranking/index"></page-content>
		<!-- vant-ui-action-sheet -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas3" :show="show[2]" :actions="actionSheets[2]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>

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
				list: [],
				reqParam: {
					divisionOrGroupMarketing:'0',//'0' 事业部 '1' 营销组
					interfaceType: '1', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '' // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他
				},
				result: null,
				tipsList: this.$store.state.availablePageTipsList,
				appOperUserList:[],
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
						{name: '事业部',code: '0',color: '#00a1ff'},
						{name: '营销组',code: '1',color: null}
					]
				}
			};
		},
		components: {
		},
		onLoad: function(options) {
			let params = JSON.parse(options.params)
			this.reqParam.queryType = params.queryType;

			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText');
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
				await this.$http('post', 'appGoodsAvailable', this.reqParam, false, true).then(res => {
					if (res && res.data && res.data.marketingUnSoldGroupByMarketMap) {
						this.result = res.data.marketingUnSoldGroupByMarketMap
						this.appOperUserList = res.data.appOperatingUsers
						this.createHtml(this.result,this.$store.state.isFullCal)
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
			createHtml(data,state) {
				this.list = [];
				// 初始化展示
				Object.keys(data).forEach(key => {
					const item = data[key];

					let totalProjectCnt = item.totalProjectCnt + '个';

					let availableGoodsValueItem = [
						{col1: '',col2: '',col3: ''},
						{col1: '可售总面积',col1_toast:'',col2: '已取证未售总面积',col3: '未取证总面积',col3_toast:''},
						{col1: '',col2: '',col3: ''},
						
						{col1: '',col2: '',col3: ''},
						{col1: '可售总货值',col1_toast:'',col2: '已取证未售总货值',col3: '未取证总货值',col3_toast:''},
						{col1: '',col2: '',col3: ''}];
					availableGoodsValueItem[2].col1 = item.salableTotalArea; // 可售总面积
					availableGoodsValueItem[2].col2 = item.envidencedSalableTotalArea; // 已取证可售总面积
					availableGoodsValueItem[2].col3 = item.unenvidenceSalableTotalArea; // 未取证可售总面积
					availableGoodsValueItem[2].unit = 2;
					availableGoodsValueItem[5].col1 = state?item.salableTotalAmount:item.salableTotalRightAmount; // 可售总货值
					availableGoodsValueItem[5].col2 = state?item.envidencedSalableTotalAmount:item.envidencedSalableTotalRightAmount; // 已取证可售总货值
					availableGoodsValueItem[5].col3 = state?item.unenvidenceSalableTotalAmount:item.unenvidenceSalableTotalRightAmount; // 未取证可售总货值
					availableGoodsValueItem[5].unit = 3;
					let users = []
					this.appOperUserList.forEach(appOperUser => {
						console.log("divisionOrGroupMarketing=",this.reqParam.divisionOrGroupMarketing)
						if(this.reqParam.divisionOrGroupMarketing === '0' && item.divisionCode === appOperUser.divisionCode){
							users.push({name:appOperUser.userName,id:appOperUser.userId})
						}
						if(this.reqParam.divisionOrGroupMarketing === '1' && item.grpMarketingCode === appOperUser.grpMarketingCode){
							users.push({name:appOperUser.userName,id:appOperUser.userId})
						}
					})
					
					let params =  {
							divisionCode:item.divisionCode,
							divisionName:item.divisionName,
							grpMarketingCode:item.grpMarketingCode,
							grpMarketingName:item.grpMarketingName,
							divisionOrGroupMarketing:this.reqParam.divisionOrGroupMarketing,
							queryType:this.reqParam.queryType}
					this.list.push({
						title: key,
						subtitle: '项目总数',
                        toastTitle:'',
						total: totalProjectCnt,
						items: availableGoodsValueItem,
						params:params,
						users:users
					})
				});
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
				}else if(this.index === 2){//事业部营销组变化
					this.reqParam.divisionOrGroupMarketing = res.detail.code
					this.initData()
				}
				else{
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
