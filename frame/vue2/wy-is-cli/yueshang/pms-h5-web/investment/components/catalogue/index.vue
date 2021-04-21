<template>
	<view>
		<cover-view class="catalogue-title" @tap="showCatalogue">
			{{ titleProp }}
			<cover-image src="../../assets/images/icon-arrow.png" class="arrow-img"></cover-image>
		</cover-view>
		<cover-view class="catalogue-overlay" v-if="show" catchtouchmove="true">
			<cover-view class="catalogue-box">
				<cover-view class="catalogue-close-wrapper">
					<cover-view class="catalogue-close" @tap="closeCatalogue">X</cover-view>
				</cover-view>
				<cover-view class="catalogue-wrapper">
					<cover-view
						v-for="(item, index) in catalogueList"
						:key="index"
						@tap="navigation"
						:data-url="item.url"
						:class="'catalogue-item ' + (item.label === titleProp ? 'active' : '')"
						:data-label="item.label"
					>
						{{ item.label }}
					</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
// components/transform/index.js
const app = getApp();

export default {
	data() {
		return {
			titleProp: "",
			show: false,
			catalogueList: [
				{
					label: "筹备招商进度",
					url: "/pages/zhaoshang/zsjd/zsjd",
				},
				{
					label: "筹备期网批驳回率统计",
					url: "/pages/zhaoshang/bhl/bhl",
				},
				{
					label: "筹备期全面抽成统计",
					url: "/pages/zhaoshang/cctj/cctj",
				}, // {
				// 	label: "项目铺位分解",
				// 	url: "/pages/zhaoshang/pwfj/pwfj"
				// },
				{
					label: "招商业绩考核",
					url: "/pages/zhaoshang/yjkh/yjkh",
				},
				{
					label: "总部联发品牌数据监控",
					url: "/pages/zhaoshang/lfpp/lfpp",
				},
				{
					label: "已招租金达成率柱状图",
					url: "/pages/zhaoshang/yzzj/yzzj",
				},
				{
					label: "进场审图进度-品牌数",
					url: "/pages/zhaoshang/stjd/stjd",
				},
				{
					label: "待开业项目招商进度-品牌数",
					url: "/pages/zhaoshang/dky/dky",
				},
			],
		};
	},

	components: {},
	props: {
		title: {
			type: String,
		},
	},
	watch: {
		title: {
			handler: function (newValue) {
				this.setData({
					titleProp: newValue,
				});
			},
			immediate: true,
		},
	},
	methods: {
		showCatalogue() {
			this.setData({
				show: true,
			});
		},

		closeCatalogue() {
			this.setData({
				show: false,
			});
		},

		navigation(e) {
			if (this.titleProp === e.currentTarget.dataset.label) {
				return;
			}

			this.setData({
				show: false,
			});
			if (this.titleProp === "筹备招商进度") {
				this.pageGo(e.currentTarget.dataset.url, {});
			} else {
				app.globalData.page.go(e.currentTarget.dataset.url);
			}
		},
	},
};
</script>
<style>
@import "./index.css";
</style>
