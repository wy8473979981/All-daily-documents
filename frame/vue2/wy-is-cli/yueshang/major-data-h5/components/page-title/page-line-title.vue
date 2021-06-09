<template>
	<!-- 标题 -->
	<view class="_page-line-title" :style="{'color': fontColor}" v-if="title || param">
		<view class="line-title">{{param?param.title:title}}</view>
<!-- 		<view class="line-title line-user" v-if="param || userName" @click.stop="userTab(param)">{{param?param.userName:userName}}</view>
		<image class="title-msg" v-if="(param && param.userName) || userName" src="../../assets/images/message.png"></image> -->
		<view class="line-title" v-if="param || dateTime">{{param?param.dateTime:dateTime}}</view>
	</view>
</template>

<script>
	export default {
		name: 'page-line-title',
		props: {
			title: {
				type: String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			},
			dateTime: {
				type: String,
				default: ''
			},
			fontColor: {
				type: String,
				default: '#007aff'
			},
			param: {
				type: Object,
				default: function(){
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
			userTab(user) {
				this.$emit('userTab',user)
			}
		}
	}
</script>

<style lang="scss" scoped>
	._page-line-title {
		padding: 5px 0px 5px 10px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.line-title {
			// color: #007aff;
			font-size: 14px;
			height: 14px;
			line-height: 14px;
			//border-left: 3px solid #3992BA;
			padding-left: 7px;
		}
		.line-user {
			color: #00a1ff;
		}
		.line-subtitle {
			font-size: 12px;
			padding: 2px 10px;
		}
		.title-msg {
			width: 16px;
			height: 16px;
		}
	}
</style>
