<template>
	<div class="lengthways">
		<div class="lengthways-label">
			<div v-for="(item, index) in component.rows" :key="index" class="label-item">
				{{ item.label }}
			</div>
		</div>
		<div class="lengthways-content">
			<div v-for="(row, index) in component.list" :key="index" class="lengthways-item">
				<div v-for="(item, index2) in component.rows" :key="index2" class="label-item">
					<span v-if="!isNaN(row[item.key] - 0)">
						{{ row[item.key] | formatNumber }}{{ item.unit }}
					</span>
					<span v-else>{{ row[item.key] || "-" }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			component: {
				list: [
					{
						label: "项目",
					},
				],
				rows: [
					{
						label: "项目",
					},
				],
			},
			money: {
				decimal: ",",
				thousands: ".",
				precision: 2,
			},
		};
	},

	components: {},
	props: {
		values: {
			type: Array,
			default: function() {
				return [];
			},
		},
		rows: {
			type: Array,
			default: function() {
				return [];
			},
		},
	},
	watch: {
		rows: {
			handler(newVal) {
				this.component.rows = newVal;
			},
			immediate: true,
			deep: true,
		},
		values: {
			handler(newVal) {
				this.component.list = newVal;
			},
			immediate: true,
			deep: true,
		},
	},

	mounted() {
		// (this.component.list = this.values), (this.component.rows = this.cross);
	},

	methods: {},
};
</script>
<style>
@import "./lengthways.css";
</style>
