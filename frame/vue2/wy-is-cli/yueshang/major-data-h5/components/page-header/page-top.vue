<template>
	<!-- 页面顶部项目名等信息 -->
	<view class="_page-top" @click="tabClick">
		<view class="_page-top-title">{{title}}</view>
		<!-- 
		<view class="_page-tab-title" @click="changCal">
			<image src="../../assets/images/button.png"></image>
			<span>{{fullCal[calIn]}}</span>
		</view> 
		-->
	</view>
</template>

<script>
	export default {
		name: 'pageTop',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				fullCal: ['全口径','权益口径'],
				calIn: 0
			}
		},
		computed: {
			isFullCal() {
				this.calIn = this.$store.state.isFullCal?0:1
			}
		},
		watch: {
			isFullCal(newV) {
				
			}
		},
		onLoad() {
			
		},
		mounted() {
			
		},
		methods: {
			tabClick() {
				// do something
				// this.$emit('topClick', index);
			},
			changCal() {
				this.$store.commit('setIsFullCal',this.calIn===1?true:false);
				this.$emit('calBack',{state:this.calIn===1?true:false});
			}
		}
	}
</script>

<style lang="scss" scoped>
	._page-top {
		width: 100%;
		height: 36px;
		line-height: 36px;
		// background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
		color: #FFFFFF;
		box-sizing: border-box;
		font-size: 16px;
		padding: 5px 0px 5px 10px;
		background-color: #014176;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		._page-tab-title{
			padding: 2px 10px;
			color: #ffffff;
			font-weight: bold;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 26px;
				height: 26px;
			}
		}
		
	}
</style>
