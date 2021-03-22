<template>
	<div>
		<div class="app-date-pick" @click="showDatePick = true">
			<div class="date-label">{{ dateLabel }}</div>
			<van-image width="0.4rem" height="0.3rem" :src="dataIcon" />
		</div>
		<van-popup v-model="showDatePick" position="bottom" :style="{ height: '60%' }">
			<van-datetime-picker v-model="currentDate" :type="pickType" @confirm="confirm" @click.stop v-if="pickType !== 'year'" />
			<van-picker show-toolbar :columns="columns" :default-index="defaultIndex" @confirm="confirmYear" v-if="pickType === 'year'"/>
		</van-popup>
	</div>
</template>
<script>
import dataIcon from "../../assets/images/icon-calendar.png";
export default {
	props: {
		selected: {
			type: String,
			default: function() {
				return "选择时间";
			},
		},
		type: {
			type: String,
			default: "date", //
		},
	},
	watch: {
		type: {
			handler: function(newValue) {
				this.pickType = newValue;
			},
			immediate: true,
			deep: true,
		},
		selected: {
			handler: function(newValue) {
				this.dateLabel = newValue;
				this.currentDate = new Date(newValue);
				if (this.pickType === "year") {
					let pickYear = newValue.split("-")[0];
					this.dateLabel = pickYear;
					this.defaultIndex = this.columns.indexOf(pickYear);
				}
			},
			immediate: true,
			deep: true,
		},
	},
	data() {
		return {
			dateLabel: "",
			pickType: "",
			defaultIndex: 0,
			dataIcon: dataIcon,
			showDatePick: false,
			currentDate: "",
			columns: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"],
		};
	},
	methods: {
		confirm(value) {
			if (this.pickType === "date") {
				this.dateLabel = this.$dayjs(value).format("YYYY-MM-DD");
			} else if (this.pickType === "year-month") {
				this.dateLabel = this.$dayjs(value).format("YYYY-MM");
			}
			this.showDatePick = false;
			this.$emit("selected", this.dateLabel);
		},
		confirmYear(value) {
			this.dateLabel = value;
			this.showDatePick = false;
			this.$emit("selected", this.dateLabel);
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.app-date-pick {
	display: flex;
	align-items: center;
	.date-label {
		margin-right: 5px;
	}
}
</style>
