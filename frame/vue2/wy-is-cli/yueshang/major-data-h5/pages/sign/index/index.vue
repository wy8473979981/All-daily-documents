<template>
	<div class="ys-page">
		<!-- 顶部标题显示 -->
		<page-top :title="title"></page-top>
		<!-- 下拉框组件选择框 -->
		<page-tab :list="selectTabList" @showPop="showPop" :close="close"></page-tab>
		<page-tips :tList="tipsList"></page-tips>
		<page-content  :data="list[0]" title="动态签约" :users="users1" @userTab="userTab"  url="/pages/sign/division/index" show></page-content>
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
				tipsList: this.$store.state.signPageTipsList,
				list: [{title: '全宝龙',subtitle: '',total: '',items: []}], // 首页数据
				reqParam: {
					interfaceType: '0', //0 概况 1 事业部汇总 2 项目汇总 3 项目明细
					queryType: '0' // '' 全部 '0' 住宅 '1' 商办 '2' 车位其他 '3'
				},
				result: null,
				signAndPayment:null,
				equitySignAndPayment:null,
				users1: [],
				selectTabList:[
					{name: '全部业态'},
					{name: '权益口径'},
					{name: '全项目清单',hiddenImage:'1'}
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
			indexContent
		},
		onLoad: function(options) {
			if(localStorage.getItem('watermarkText')){
				this.watermarkText = localStorage.getItem('watermarkText')
			}
			this.initSignAndPayment()
		},
		onShow() {
			this.initSignAndPayment()
		},
		methods: {
			// 初始化数据
			async initSignAndPayment() {
                this.$http('post', 'appSignAndPaymentByOverview', this.reqParam,false,true).then(res => {
                    if (res && res.data) {
                        this.signAndPayment = res.data.data;
                        this.equitySignAndPayment = res.data.equityData;
                        this.createSignAndPaymentHtml(this.equitySignAndPayment,this.$store.state.isFullCal);
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
			createSignAndPaymentHtml(data,state) {
				let signItem = [{col1: '',col2: '',col3: ''},
								{col1: '昨日',col1class:'custom-title-cls',col2: '',col3: ''},
								{col1: data.signAmount,col2: '',col3: ''
								,col1_unit : '亿元'},
								
								{col1: '本月',col1class:'custom-title-cls',col2: '',col3: ''},
								{col1: '本月指标',col2: '本月实际',col3: '本月完成率'},
								{col1: data.monthSignIndexAmount,col2: data.monthSignAmount,col3: data.monthSignRate
								,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
								
								{col1: '本年',col1class:'custom-title-cls',col2: '',col3: ''},
								{col1: '本年指标',col2: '本年实际',col3: '本年完成率'},
								{col1: data.yearSignIndexAmount,col2: data.yearSignAmount,col3: data.yearSignRate
								,col1_unit : '亿元',col2_unit : '亿元',col3_unit : '%'},
								
								{col1: '截止上月',col1class:'custom-title-cls',col2: '',col3: ''},
								{col1: '截至上月指标',col2: '截至上月实际',col3: '缺口/超额'},
								{col1: data.lastMonthSignIndexAmount.toFixed(2),col2: data.lastMonthSignAmount.toFixed(2),col3: ''
								,col1_unit : '亿元',col2_unit : '亿元'}]
				// 填充数据
				this.list.forEach((item, index) => {
					[0, 1].forEach((son, sindex) => {
						// 签约
			            if (index === 0) {
							signItem[11].col3 = "<span style='font-size:15px;'>" + data.lastMonthSignRate + '%</span>'
							 + "<span style='font-size:12px;'>"+ (data.lastMonthSignAmount - data.lastMonthSignIndexAmount).toFixed(2) + '亿元</span>';
							signItem[11].col3color = data.lastMonthSignRate>=0?{color:'green'}:{color:'red'};
			            }
			        })
				})
				// 赋值
				this.list[0].items = signItem;
				this.list[0].params = {queryType:this.reqParam.queryType};
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
					//营销业态变化
					this.reqParam.queryType = res.detail.code;
					this.initSignAndPayment();
				}else if(this.index === 1){
					//权益口径变化
					this.$store.state.isFullCal = res.detail.code;
					if(res.detail.code){
					    this.createSignAndPaymentHtml(this.signAndPayment,res.detail.code);
					}else{
					    this.createSignAndPaymentHtml(this.equitySignAndPayment,res.detail.code);
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
					uni.navigateTo({
						url: '/pages/sign/ranking/index?queryType='+this.reqParam.queryType
					})
				}
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
