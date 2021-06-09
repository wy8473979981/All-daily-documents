<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-content  :data="list[0]" title="一年以上货值去化" :users="users1" @userTab="userTab"  url="/pages/value/division/index" show></page-content>
		<page-content  :data="list[1]" title="商办去化" :users="users1" @userTab="userTab"  url="/pages/value/division/index" show></page-content>
		<page-content  :data="list[2]" title="车位去化" :users="users1" @userTab="userTab"  url="/pages/value/division/index" show></page-content>
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
	import indexContent from "@/components/page-content/page-content.vue"

	export default {
		data() {
			return {
				title: '全宝龙',
				watermarkText:'',
				tipsList: this.$store.state.valuePageTipsList,
				list: [{title: '全宝龙',subtitle: '',total: '',items: []},
					{title: '全宝龙',subtitle: '',total: '',items: []},
					{title: '全宝龙',subtitle: '',total: '',items: []}], // 首页数据
				reqParam: {
					monthly:'',
					queryType: '0' // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
				},
				businessParam:{
					month:'',
					dataType:'SY'
				},
				result: null,
				resultData:null,
				equityData:null,
				users1: [],
				selectTabList:[
					{name: '月份'},
					{name: '权益口径'}
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
						{name: '五月',code: '5',color:'#00a1ff'},
						{name: '六月',code: '6',color:null},
						{name: '七月',code: '7',color:null},
						{name: '八月',code: '8',color:null},
						{name: '九月',code: '9',color:null},
						{name: '十月',code: '10',color:null},
						{name:'十一月',code:'11',color:null},
						{name:'十二月',code:'12',color:null}
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
			indexContent
		},
		onLoad: function(options) {
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			var time = new Date;
			var month = time.getMonth() + 1;
			this.reqParam.monthly = month;
			this.init()
			this.initBusiness()
			this.initParking()
		},
		onShow() {
			this.init()
		},
		methods: {
			// 初始化数据  - 一年以上货值去化
			async init() {
                this.$http('post', 'goodsMoreOneYearSummary', this.reqParam,false,true).then(res => {
                    if (res && res.data) {
                        this.resultData = res.data.data;
                        this.equityData = res.data.equityData;
						//默认权益口径数据
                        this.createHtml(this.equityData,this.$store.state.isFullCal);
						//关联用户
						this.users1 = [];
						if (res.data.operatorList && res.data.operatorList.length > 0) {
							for (let i = 0; i < res.data.operatorList.length; i++) {
								let operator = res.data.operatorList[i];
								this.users1[i] = {name: operator.userName, id: operator.userId};
							}
						}
					}
                })
            },
			//创建页面
			createHtml(data,state) {
				let dataItem = [
					{col1: '20年结转可售货值',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: data.settleSaleableAmount.toFixed(2),col2: '',col3: '',col1_unit : '亿元'},
					{col1: '',col2: '',col3: ''},
					
					{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '本年指标',col2: '本年实际',col3: '本年完成率'},
					{col1: data.settleSignIndex.toFixed(2),col2: data.settleSignAmount.toFixed(2),col3: (data.settleSignRatio*100).toFixed(2)
					,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
					
					{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '本月指标',col2: '本月实际',col3: '本月完成率'},
					{col1: data.signAmountIndex.toFixed(2),col2: data.signAmount.toFixed(2),col3: (data.signAmountRatio*100).toFixed(2)
					,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
					
					{col1: '截止上月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '截至上月指标',col2: '截至上月实际',col3: '偏差率/缺口'},
					{col1: data.lastMonthSignIndex.toFixed(2),col2: data.lastMonthSignAmount.toFixed(2),col3: ''
					,col1_unit : '亿元',col2_unit : '亿元'}]
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1].forEach((son, sindex) => {
			            if (index === 0) {
							dataItem[13].col3 = "<span style='font-size:15px;'>" + data.lastMonthSignRatio.toFixed(2) + '%</span>'
								dataItem[13].col3color = data.lastMonthSignRatio>=0?{color:'green'}:{color:'red'};
								dataItem[13].col3_toast= ((data.lastMonthSignAmount - data.lastMonthSignIndex) < 0 ? '缺口：':'超额:')
								 + (data.lastMonthSignAmount - data.lastMonthSignIndex).toFixed(2) + '亿元'
							
			            }
			        })
				})
				// 赋值
				this.list[0].items = dataItem;
				this.list[0].params = {queryType:this.reqParam.queryType};
			},
			
			
			// 初始化数据  - 商办去化
			async initBusiness() {
				this.businessParam.month = this.reqParam.monthly;
				this.businessParam.dataType = 'SY';
				this.businessParam.groupType = 'marketingGroup';
				// this.businessParam.groupType = 'divisionGroup';
			    this.$http('post', 'getBusinessAndParkingIndex', this.businessParam,false,true).then(res => {
			        if (res && res.data) {
						let resultArray = [];
						let equityArray = [];
						for(var i=0;i<res.data.length;i++){
							resultArray.push(res.data[i].all);
							equityArray.push(res.data[i].right);
						}
			            this.resultBusiness = resultArray;
			            this.equityBusiness = equityArray;
						console.log(this.resultBusiness);
						console.log(this.equityBusiness);
						//默认权益口径数据
			            this.createHtmlBusiness(this.resultBusiness,this.$store.state.isFullCal);
						//关联用户
						this.users1 = [];
						if (res.data.operatorList && res.data.operatorList.length > 0) {
							for (let i = 0; i < res.data.operatorList.length; i++) {
								let operator = res.data.operatorList[i];
								this.users1[i] = {name: operator.userName, id: operator.userId};
							}
						}
					}
			    })
			},
			//创建页面
			createHtmlBusiness(data,state) {
				let businessItem = [
					{col1: '20年结转可售货值',col2: '21年新增货值',col3: '总可售货值',
					col1class:'custom-title-cls',col2class:'custom-title-cls',col3class:'custom-title-cls'},
					{col1: data.carryOverValue.toFixed(2),col2: data.newValue.toFixed(2),col3: data.totalSaleable.toFixed(2),
					col1_unit : '亿元',col2_unit : '亿元',col3_unit : '亿元'},
					{col1: '',col2: '',col3: ''},
					
					{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '本年指标',col2: '本年实际',col3: '本年完成率'},
					{col1: data.annualIndex.toFixed(2),col2: data.annualCompleteSigned.toFixed(2),col3: (data.annualCompleteRatio*100).toFixed(2)
					,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
					
					{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '本月指标',col2: '本月实际',col3: '本月完成率'},
					{col1: data.monthlyIndex.toFixed(2),col2: data.monthlyCompleteSigned.toFixed(2),col3: (data.monthlyCompleteRatio*100).toFixed(2)
					,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
					
					{col1: '截止上月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '截至上月指标',col2: '截至上月实际',col3: '偏差率/缺口'},
					{col1: data.untilLastMonthIndex.toFixed(2),col2: data.untilLastMonthSigned.toFixed(2),col3: ''
					,col1_unit : '亿元',col2_unit : '亿元'}]
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1].forEach((son, sindex) => {
			            if (index === 0) {
							businessItem[13].col3 = "<span style='font-size:15px;'>" + data.deviationRatio.toFixed(2) + '%</span>'
							businessItem[13].col3color = data.deviationRatio>=0?{color:'green'}:{color:'red'};
							businessItem[13].col3_toast= ((data.untilLastMonthSigned - data.untilLastMonthIndex).toFixed(2) < 0 ? '缺口：':'超额:')
						    + (data.untilLastMonthSigned - data.untilLastMonthIndex).toFixed(2) + '亿元'
							
			            }
			        })
				})
				// 赋值
				this.list[1].items = businessItem;
				this.list[1].params = {queryType:this.reqParam.queryType};
			},
			
			// 初始化数据  - 车位去化
			async initParking() {
				this.businessParam.month = this.reqParam.monthly;
				this.businessParam.dataType = 'CW';
			    this.$http('post', 'getBusinessAndParkingIndex', this.businessParam,false,true).then(res => {
			        if (res && res.data) {
			            this.resultParking = res.data[0].all;
			            this.equityParking = res.data[0].right;
						//默认权益口径数据
			            this.createParkingHtml(this.resultParking,this.$store.state.isFullCal);
						//关联用户
						this.users1 = [];
						if (res.data.operatorList && res.data.operatorList.length > 0) {
							for (let i = 0; i < res.data.operatorList.length; i++) {
								let operator = res.data.operatorList[i];
								this.users1[i] = {name: operator.userName, id: operator.userId};
							}
						}
					}
			    })
			},
			//创建页面
			createParkingHtml(data,state) {
				let parkingItem = [
					{col1: '20年结转可售个数',col2: '21年新增个数',col3: '总可售个数',
					col1class:'custom-title-cls',col2class:'custom-title-cls',col3class:'custom-title-cls'},
					{col1: data.carryOverValue.toFixed(2),col2: data.newValue.toFixed(2),col3: data.totalSaleable.toFixed(2),
					col1_unit : '个',col2_unit : '个',col3_unit : '个'},
					{col1: '',col2: '',col3: ''},
					
					{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '本年指标',col2: '本年实际',col3: '本年完成率'},
					{col1: data.annualIndex.toFixed(2),col2: data.annualCompleteSigned.toFixed(2),col3: (data.annualCompleteRatio*100).toFixed(2)
					,col1_unit : '个',col2_unit : '个',col3_unit : '%'},
					
					{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '本月指标',col2: '本月实际',col3: '本月完成率'},
					{col1: data.monthlyIndex.toFixed(2),col2: data.monthlyCompleteSigned.toFixed(2),col3: (data.monthlyCompleteRatio*100).toFixed(2)
					,col1_unit : '个',col2_unit : '个',col3_unit : '%'},
					
					{col1: '截止上月',col1class:'custom-title-cls',col2: '',col3: ''},
					{col1: '',col2: '',col3: ''},
					{col1: '截至上月指标',col2: '截至上月实际',col3: '偏差率/缺口'},
					{col1: data.untilLastMonthIndex.toFixed(2),col2: data.untilLastMonthSigned.toFixed(2),col3: ''
					,col1_unit : '个',col2_unit : '个'}]
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1].forEach((son, sindex) => {
			            if (index === 0) {
							parkingItem[13].col3 = "<span style='font-size:15px;'>" + data.deviationRatio.toFixed(2) + '%</span>'
								parkingItem[13].col3color = data.deviationRatio>=0?{color:'green'}:{color:'red'};
								parkingItem[13].col3_toast= ((data.untilLastMonthSigned - data.untilLastMonthIndex).toFixed(2) < 0 ? '缺口：':'超额:')
								 + (data.untilLastMonthSigned - data.untilLastMonthIndex).toFixed(2) + '个'
							
			            }
			        })
				})
				// 赋值
				this.list[2].items = parkingItem;
				this.list[2].params = {queryType:this.reqParam.queryType};
			},
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
				if(this.index === 0){
					//月份
					this.reqParam.monthly = res.detail.code;
					this.init();
				}else if(this.index === 1){
					//权益口径变化
					this.$store.state.isFullCal = res.detail.code;
					if(res.detail.code){
					    this.createHtml(this.resultData,res.detail.code);
					}else{
					    this.createHtml(this.equityData,res.detail.code);
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
				//迫使 Vue 实例重新渲染
				this.$forceUpdate();
			},
			userTab(user) {
				this.$wechat.pageGo(user.id);
			},
			// 获取userId
			async getUserId(code) {
				await this.$http('post', 'getUserId', {loginCode:code},false,false).then(res => {
					if (res && res.data) {
						this.$store.state.userId = res.data.userId;
						localStorage.getItem('userId',res.data.userId);
					}
				})
			},
		}
	}
</script>
<style>
	@import "./index.css"
</style>
