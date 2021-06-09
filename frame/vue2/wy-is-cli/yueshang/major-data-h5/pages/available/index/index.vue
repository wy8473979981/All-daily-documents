<template>
	<div class="ys-page">
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		
		<page-tips :tList="tipsList"></page-tips>
		<!-- 动态货值-->
		<page-content :data="list[0]" title="动态货值" :users="users1" @userTab="userTab" url="/pages/available/division/index" show></page-content>

		<!-- vant-ui-action-sheet -->
		<van-action-sheet v-model="vas1" :show="show[0]" :actions="actionSheets[0]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>
		<van-action-sheet v-model="vas2" :show="show[1]" :actions="actionSheets[1]" @select="onSelect" @click-overlay="overlay"></van-action-sheet>

		<wm-watermark :text="watermarkText"></wm-watermark>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '全宝龙',
				watermarkText:'',
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'},
					{name: '全项目清单',hiddenImage:'1'}
				],
				list: [ {title: '全宝龙',subtitle: '项目总数',type: null,toastTitle: '',total: '',items: [],proList:[]}], // 首页数据
				reqParam: {
					interfaceType: '0', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '0' // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
				},
				result: null,
				tipsList: this.$store.state.availablePageTipsList,
				users1: [],
				show: [false,false],
				close: true,
				index: null,
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
		},
		onLoad: function() {
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText');
			}
			this.initData()
		},
		onShow() {
			this.initData()
		},
		methods: {
			// 初始化数据-首页
			async initData() {
				await this.$http('post', 'appGoodsAvailable', this.reqParam,false,true).then(res => {
					if (res && res.data && res.data.marketingUnSoldValue) {
						this.result = res.data;
						this.createGoodsAvailableHtml(this.result,this.$store.state.isFullCal);
					}
				})
			},
			createGoodsAvailableHtml(data,state) {
				// test projectList
				//this.list[0].toastTitle = "含方案未批复项目"
				// 整体货值项目总数赋值
				this.list[0].total = data.totalProjectCnt + '个'

				//处理可售返回结果
				let marketingUnSoldItem = data.marketingUnSoldValue;
				let appOperatingUsers = data.appOperatingUsers

				// 初始化展示
				let availableGoodsValueItem = [
				{col1: '',col2: '',col3: ''}, 
				{col1: '可售总面积',col1_toast:'',col2: '已取证未售总面积',col3: '未取证总面积',col3_toast:''},
				{col1: '',col2: '',col3: ''}, 
				
				{col1: '',col2: '',col3: ''}, 
				{col1: '可售总货值',col1_toast:'',col2: '已取证未售总货值',col3: '未取证总货值',col3_toast:''},
				{col1: '',col2: '',col3: ''}]
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1].forEach((son, sindex) => {
						// 整体货值
						availableGoodsValueItem[2].col1 = marketingUnSoldItem.salableTotalArea; // 可售总面积
						availableGoodsValueItem[2].col2 = marketingUnSoldItem.envidencedSalableTotalArea; // 已取证可售总面积
						availableGoodsValueItem[2].col3 = marketingUnSoldItem.unenvidenceSalableTotalArea; // 未取证可售总面积
						availableGoodsValueItem[2].unit = 2;
						availableGoodsValueItem[5].col1 = state?marketingUnSoldItem.salableTotalAmount:marketingUnSoldItem.salableTotalRightAmount; // 可售总货值
						availableGoodsValueItem[5].col2 = state?marketingUnSoldItem.envidencedSalableTotalAmount:marketingUnSoldItem.envidencedSalableTotalRightAmount; // 已取证可售总货值
						availableGoodsValueItem[5].col3 = state?marketingUnSoldItem.unenvidenceSalableTotalAmount:marketingUnSoldItem.unenvidenceSalableTotalRightAmount; // 未取证可售总货值
						availableGoodsValueItem[5].unit = 3;
					})
				})
				this.users1 = [];
				for(let item of appOperatingUsers){
					this.users1.push({name:item.userName,id:item.userId})
				}
				// 赋值
				this.list[0].items = availableGoodsValueItem;
				this.list[0].params = {queryType:this.reqParam.queryType};
			},
			userTab(user) {
				this.$wechat.pageGo(user.id)
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
					this.createGoodsAvailableHtml(this.result,res.detail.code)
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
				if(this.index === 2){
					uni.navigateTo({
						url: '/pages/available/list/project'
					})
				}
				this.$forceUpdate()
			}
		}
	}
</script>
<style>
	@import "./index.css"
</style>
