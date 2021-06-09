<template>
	<!-- tab单选 -->
	<view class="_tab">
		<view v-for="(item,index) in list" :key="index" @click="callback(index)">
			<view style="width:50px">{{item.name}}</view>
			<image v-if="!item.hiddenImage" src="../../static/icon-down.png" :class="{'_tab-active': actives[index]}"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'page-tab',
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			data: Object,
			close: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				actives: [false, false, false, false]
			}
		},
		watch: {
			close(n) {
				this.actives = [false, false, false, false]
			}
		},
		mounted() {

		},
		methods: {
			callback(index) {
				this.actives[index] = !this.actives[index]
				this.$forceUpdate()
				this.$emit('showPop', {
					index: index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	._tab {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		height: 30px;
		align-items: center;
		justify-content: space-around;
		margin: 0;
		padding: 0 10px;
		border-radius: 4px;
		font-size: 12px;

		view {
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 20rpx;
				height: 20rpx;
				margin-left: 6rpx;
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
				-webkit-transition: -webkit-transform 0.3s;
				transition: -webkit-transform 0.3s;
				transition: transform 0.3s;
				transition: transform 0.3s, -webkit-transform 0.3s;
			}

			._tab-active {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
				-webkit-transition: -webkit-transform 0.3s;
				transition: -webkit-transform 0.3s;
				transition: transform 0.3s;
				transition: transform 0.3s, -webkit-transform 0.3s;
			}
		}
	}
</style>
