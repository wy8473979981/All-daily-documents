<template>
	<!-- tab单选 -->
	<view class="_oneline">
		<view v-if="list && list.length > 0" v-for="item in list">
			<view class="_line-box" @tap="changeItem(item)">
				<image v-if="item.src" :src="item.src" mode="scaleToFill" @error="imageError"></image>
				<view>{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'page-oneline',
		props: {
			list: {
				type: Array,
				default: function(){
					return []
				}
			},
			data: Object
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
			changeItem(item) {
				console.log("user click item",item)
				this.$emit('change',item) // 回调事件
				uni.navigateTo({
					url: item.url
				})
			},
			imageError(e) {
				console.log("img load error:",e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	._oneline{
		 padding: 30px 0 0 0;
	}
	._line-box {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		height: 50px;
		align-items: center;
		justify-content: flex-start;
		margin: 0 10px 4px;
		padding: 0 10px;
		border-radius: 4px;
		font-size: 15px;
		image {
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}
	}
</style>
