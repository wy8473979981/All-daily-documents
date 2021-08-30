<template>
	<view>
		<phone-directory :phones="component.list" @paramClick="onSelected" style="width: 100%"></phone-directory>
	</view>
</template>

<script>
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
					"component.list": newValue
						.map((group) => {
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
						})
						.filter((group) => group.subItems.length),
				});
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		onSelected(e) {
			this.$emit("selected", {
				detail: e.detail.item,
			});
			uni.$emit("selected", {
				detail: e.detail.item,
			});
		},
	},
};
</script>
