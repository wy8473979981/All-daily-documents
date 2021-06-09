<template>
	<!-- 首页展示组件 -->
	<view class="_page-mian" @click="tabClick">
	    <view class="main-tip" v-if="tList" v-for="tl in tList">{{tl.title}}</view>
		<view class="main-title">
			<view>
				<span>{{title?title:data.title}}</span>
				<span class="title-unit">{{unit?unit:''}}</span>
			</view>
			<view class="main-user">
				<view v-for="(user,index) in users" @click.stop="userTab(user)">
					<span>{{user.name}}</span>
					<image src="../../assets/images/message.png"></image>
				</view>
			</view>
			<image v-if="url" class="main-down" src="@/assets/images/icon-arrow-down.png"></image>
		</view>
		<view class="title-box">
			<view v-if="subtitle || data.subtitle" class="main-subtitle">{{subtitle?subtitle:data.subtitle}}</view>
			<icon v-if="data.toastTitle" type="info" size="16" @click.stop="showToast(data.toastTitle)"></icon>
		</view>
		<view v-if="data.total || data.total === 0" class="main-total">{{data.total}}</view>
		<view v-if="show">
			<view v-for="(item,index) in data.items" :key="index" class="main-table" :class="{'groupItem':index%2 == 0}">
				<view>
					<span :class="item.col1class" :style="item.col1color" v-html="item.col1"></span>
					<span class="title-unit">{{item.unit?units[item.unit-1]:(item.col1_unit || '')}}</span>
					<icon v-if="item.col1_toast" type="info" size="16" @click.stop="showToast(item.col1_toast)"></icon>
				</view>
				<view>
					<span :style="item.col2color" v-html="item.col2"></span>
					<span class="title-unit">{{item.unit?units[item.unit-1]:(item.col2_unit || '')}}</span>
					<icon v-if="item.col2_toast" type="info" size="16" @click.stop="showToast(item.col2_toast)"></icon>
				</view>
				<view :class="{'main-red': item.color === 'red','main-green': item.color === 'green'}">
					<span :style="item.col3color" v-html="item.col3"></span>
					<span class="title-unit">{{item.unit?units[item.unit-1]:(item.col3_unit || '')}}</span>
					<icon v-if="item.col3_toast" type="info" size="16" @click.stop="showToast(item.col3_toast)"></icon>
				</view>
				<view v-if="item.col4 !== null && item.col4 !== undefined" :class="{'main-red': item.color === 'red','main-green': item.color === 'green'}">
					<span :style="item.col4color" v-html="item.col4"></span>
					<span class="title-unit">{{item.unit?units[item.unit-1]:(item.col4_unit || '')}}</span>
					<icon v-if="item.col4_toast" type="info" size="16" @click.stop="showToast(item.col4_toast)"></icon>
				</view>
			</view>
		</view>
		<view v-else class="main-wait">敬请期待</view>
		<page-project v-if="showPro" :list="data.proList" :title="data.proTitle" @close="showPro = false"></page-project>
	</view>
</template>

<script>
	import pageProject from "@/components/page-content/page-project.vue"
	export default {
		name: 'pageContent',
		components: {
			pageProject
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			subtitle: {
				type: String,
				default: ''
			},
			data: {
				type: Object,
				default: function () {
					return null
				}
			},
			show: {
				type: Boolean,
				default: true
			},
			url: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: ''
			},
			tList: {
				type: Array,
				default: function () {
					return null
				}
			},
			users: {
				type: Array,
				default: function () {
					return null
				}
			}
		},
		data() {
			return {
				units: ['㎡','万㎡', '(亿元)', '%'],
				showPro: false
			}
		},
		watch: {

		},
		mounted() {

		},
		methods: {
			tabClick() {
				// do something
				// this.$emit('topClick', index);
				console.log("params"+this.data)
				uni.navigateTo({
					url: this.url+'?params=' + JSON.stringify(this.data.params)
				})
			},
			showToast(text) {
				if(text) {
					this.$toast(text)
				}
				if(this.data.type === 1 || this.data.type === '1') {
					if(text instanceof Array){
						this.showPro = true;
						this.data.proList = text;
					}
				}
			},
			userTab(user) {
				this.$emit('userTab',user)
			}
		}
	}
</script>

<style lang="scss" scoped>
	._page-mian {
		padding: 10px 15px 15px;
		margin-bottom: 10px;
		background-color: #ffffff;
		
		.title-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 8px;
		}
		.main-title {
			color: #333333;
			font-size: 14px;
			font-weight: bold;
			height: 16px;
			line-height: 16px;
			// border-left: 3px solid #3992BA;
			border-left: 3px solid #014176;
			padding-left: 7px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.title-unit {
			font-size: 10px;
			color: #b0b0b0;
			font-weight: 700;
			padding-left: 2px;
		}
		.main-down {
			margin-left: 10px;
			width: 13px;
			height: 7px;
			-webkit-transform: rotate(-90deg);
			transform: rotate(-90deg);
		}
		.main-tip {
			color: #616161;
			font-size: 10px;
			padding: 0 10px 2px;
		}
		.main-subtitle {
			font-size: 12px;
			padding: 2px 10px;
			color: #616161;
		}

		.main-total {
			padding: 0 10px;
			font-size: 20px;
		}

		.main-table {
			display: flex;
			flex-direction: row;
			font-size: 12px;
			padding: 0 10px;
			color: #616161;
			&:nth-child(2n) {
				font-size: 18px;
				color: #333333;
			}

			view {
				flex: 1;
				display: flex;
				align-items: center;
			}
		}

		.main-wait {
			width: 96%;
			line-height: 5em;
			// border: 3px solid #3992BA;
			margin: 5px 10px;
			text-align: center;
			// color: #3992BA;
			color: #014176;
			background-color: #dddddd;
		}
		.main-user {
			display: flex;
			color: #00a1ff;
			font-weight: 400;
			position: absolute;
			right: 30px;
			z-index: 10;
			view {
				margin-left: 10px;
				display: flex;
				// text-decoration: underline;
				image{
					width: 16px;
					height: 16px;
				}
			}
		}
		.custom-title-cls{
			font-size:14px;
			font-weight: bold;
			color: #014176;
		}
		.groupItem{
			margin-top: 8px;
		}
	}
</style>
