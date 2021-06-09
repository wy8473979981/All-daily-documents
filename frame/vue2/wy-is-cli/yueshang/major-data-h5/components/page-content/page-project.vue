<template>
	<!-- 项目列表 -->
	<view class="_page-pro" @click.stop="tabClick">
		<image src="../../assets/images/icon-close-ffffff.png"></image>
		<view v-if="list && list.length > 0" class="pro-title">{{title}}</view>
		<view class="pro-item" v-for="item in list">{{item.name}}</view>
	</view>
</template>

<script>
	export default {
		name: 'pageProject',
		props: {
			title: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: function () {
					return null
				}
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
			tabClick(){
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	._page-pro {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		z-index: 900;
		background-color: rgba(0,0,0,.3);
		align-items: center;
		justify-content: flex-end;
		
		.pro-title{
			width: 100%;
			text-align: center;
			font-weight: bold;
			color: #333333;
			background-color: #f5f5f5;
			padding: 5px 0;
		}
		.pro-item{
			width: 100%;
			text-align: center;
			color: #333333;
			background-color: #FFFFFF;
			padding: 5px 0;
		}
		image{
			width: 50px;
			height: 50px;
			margin-bottom: 30px;
		}
	}
</style>
