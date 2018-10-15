<template>
	<div class="app">
		<!-- 
			v-header組件显示的是5个主页面时的头部
		 -->
		<v-header v-show="!isDetailHeader"></v-header>
		<!-- 
			detail-header组件显示的是详情页的头部
		 -->
		<detail-header :nickname="detailHeaderNickName"  v-show="isDetailHeader"></detail-header>
		<!-- 
			router-view：路由匹配到的组件将渲染在这里
		 -->
		<router-view class="content"></router-view>
		<!-- 
			slide-bar组件显示的个人侧栏菜单
		 -->
		<slide-bar></slide-bar>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Header from 'components/header/Header.vue'
import DetailHeader from 'components/detailheader/DetailHeader.vue'
import SlideBar from 'components/slidebar/SlideBar.vue'

	export default {
		data () {
			return {
				nickname: ''
			}
		},
		// 两种写法
		// computed: mapGetters({
		// 	isDetailHeader: 'isDetailHeader',
		// 	detailHeaderNickName: 'detailHeaderNickName'
		// }),
		computed: {
			...mapGetters({
				isDetailHeader: 'isDetailHeader',
				detailHeaderNickName: 'detailHeaderNickName'
			})
	    },
		components: {
	    	"v-header": Header,
			"slide-bar": SlideBar,
			"detail-header": DetailHeader,
	  }
	}
</script>

<style lang="less">
	.app{
		height: 100%;
	}
	.content{
		margin-top: 60px;
	}
</style>
