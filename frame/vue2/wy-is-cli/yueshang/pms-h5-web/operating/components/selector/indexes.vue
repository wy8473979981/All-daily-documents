<template>
	<!-- 项目选择 -->
	<view style="width: 100%">
		<phone-directory :phones="component.list" @paramClick="onSelected" style="width: 100%"></phone-directory>
	</view>
</template>

<script>
// import mpIndexList from "@/miniprogram_npm/@miniprogram-component-plus/index-list";
import phoneDirectory from "@/components/phone-directory/phone-directory.vue";
export default {
	data() {
		return {
			component: {
				list: [],
			},
		};
	},

	components: {
		phoneDirectory,
	},
	props: {
		list: {
			type: Array,
			default: [],
		},
	},
	watch: {
		list: {
			handler: function (newValue) {
				this.setData({
					"component.list": newValue.map((group) => {
						return {
							alpha: group.label,
							...group,
							subItems: group.items.map((item) => {
								return {
									name: item.label,
									...item,
								};
							}),
						};
					}),
				});
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		onSelected(e) {
			this.$emit("selected", {
				detail: e.detail,
			});
		},
	},
};
</script>
