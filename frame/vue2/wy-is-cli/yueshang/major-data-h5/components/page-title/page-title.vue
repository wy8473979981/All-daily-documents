<template>
	<!-- 标题 -->
	<view class="_page-title" v-if="title">
		<view class="main-title">{{title}}</view>
		<view class="main-subtitle">{{subtitle}}</view>
	</view>
</template>

<script>
	export default {
		name: 'page-title',
		props: {
			title: {
				type: String,
				default: ''
			},
			subtitle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			}
		},
		watch: {

		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	._page-title {
		padding: 5px 0px 5px 10px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		.main-title {
			color: #333333;
			font-size: 14px;
			font-weight: bold;
			height: 14px;
			line-height: 14px;
			// border-left: 3px solid #3992BA;
			border-left: 3px solid #014176;
			padding-left: 7px;
		}
		
		.main-subtitle {
			font-size: 12rpx;
			padding: 2px 10px;
		}
	}
</style>
