<template>
	<!-- tab单选 -->
	<view class="_checkone">
		<template v-for="(item,index) in list">
			<view class="tab" :style="{color: item.select?color:'#333333'}" @click.stop="changeItem(item)">{{item.title}}</view>
			<view v-if="index < (list.length - 1)">{{icon}}</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'page-title',
		props: {
			list: {
				type: Array,
				default: function(){
					return [{title:'月度',select: true,id: 0},{title:'年度',select: false,id: 1}]
				}
			},
			color: {
				type: String,
				default: '#007AFF'
			},
			icon: {
				type: String,
				default: '/'
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
			changeItem(item) {
				this.list.forEach(obj => obj.select = false)
				item.select = true
				this.$emit('change',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	._checkone {
		display: flex;
		font-size: 14rpx;
		justify-content: flex-end;
		padding: 5px 20px;
		font-weight: bold;
	}
</style>
