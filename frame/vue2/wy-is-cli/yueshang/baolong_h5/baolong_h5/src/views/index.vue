<template>
	<div class="index">
		<div class="app-header">
			<div>
				<app-project-select @projeSelected="projeSelected"></app-project-select>
			</div>
			<div class="app-header-right">
				<app-date-pick @selected="dateSelected" :selected="params.yearMonth" type="year-month"></app-date-pick>
			</div>
		</div>
		<div class="tab-list-box">
			<div v-for="(item, index) in tabList" :key="index" :class="'tab-list-item ' + (item.code === params.storeType ? 'border-current' : '')" @click="changeTab(item)">
				{{ item.name }}
			</div>
		</div>
		<div class="index-main">
			<app-section title="客流" url="#" @click.native="goToDetail({ url: '/keliu/paiming', skip: '/keliu/month' })">
				<span class="title-unit" slot="head-title">（万元）</span>
				<div class="index-item-box">
					<div class="index-item-inner">
						<div class="item-inner-label">昨日</div>
						<div class="item-inner-data">
							<div class="inner-data-num">{{ passengerFlow.ipvaYesterday || "-" }}</div>
							<div class="inner-data-comparison comparison-up">
								<div class="comparison-dire">
									<div :class="'inner-data-comparison ' + (passengerFlow.ipvaYesterdayTb >= 0 ? 'comparison-up' : 'comparison-down')" v-if="isEmpty(passengerFlow.ipvaYesterdayTb)">
										<div class="comparison-dire">
											<img class="tb-icon" :src="tongbiUp" v-if="passengerFlow.ipvaYesterdayTb >= 0" />
											<img class="tb-icon" :src="tongbiDown" v-if="passengerFlow.ipvaYesterdayTb < 0" />
										</div>
										<div class="comparison-number">{{ absoluteValue(passengerFlow.ipvaYesterdayTb) }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="index-item-inner">
						<div class="item-inner-label">当日</div>
						<div class="item-inner-data">
							<div class="inner-data-num">{{ passengerFlow.currFlow || "-" }}</div>
						</div>
					</div>
					<div class="index-item-inner">
						<div class="item-inner-label">当月</div>
						<div class="item-inner-data">
							<div class="inner-data-num">{{ passengerFlow.ipvaNum || "-" }}</div>
							<div :class="'inner-data-comparison ' + (passengerFlow.ipvaRate >= 0 ? 'comparison-up' : 'comparison-down')" v-if="isEmpty(passengerFlow.ipvaRate)">
								<div class="comparison-dire">
									<img class="tb-icon" :src="tongbiUp" mode="widthFix" v-if="passengerFlow.ipvaRate >= 0" />
									<img class="tb-icon" :src="tongbiDown" mode="widthFix" v-if="passengerFlow.ipvaRate < 0" />
								</div>
								<div class="comparison-number">{{ absoluteValue(passengerFlow.ipvaRate) }}</div>
							</div>
						</div>
					</div>
					<div class="index-item-inner">
						<div class="item-inner-label">当年</div>
						<div class="item-inner-data">
							<div class="inner-data-num">{{ passengerFlow.ipvaNumLj || "-" }}</div>
						</div>
					</div>
				</div>
			</app-section>
		</div>
	</div>
</template>
<script>
import tongbiUp from "../assets/images/tongbi-up.png";
import tongbiDown from "../assets/images/tongbi-down.png";
export default {
	data() {
		return {
			tongbiUp,
			tongbiDown,
			searchList: [
				{
					label: "物业类型",
					key: "wylx",
					selectedCode: 1,
					values: [
						{
							name: "购物中心",
							code: 1,
						},
						{
							name: "商业街",
							code: 2,
						},
						{
							name: "全部",
							code: 0,
						},
					],
				},
			],
			params: {
				bisProjectId: "",
				storeType: "0",
				yearMonth: "",
			},
			tabList: [],
			passengerFlow: {},
		};
	},
	methods: {
		// 项目选中
		projeSelected(item) {
			this.params.bisProjectId = item.bisProjectId;
			this.getPassengerFlowDetail();
		},
		// 时间选中
		dateSelected(item) {
			this.params.yearMonth = item;
			this.getPassengerFlowDetail();
		},
		// 获取客流详情
		async getPassengerFlowDetail() {
			let res = await this.$axios.getPassengerFlowDetail(this.params);
			this.passengerFlow = res.data;
		},
		// 获取所有物业类型
		async getEstateEnumerate() {
			let res = await this.$axios.getEstateEnumerate();
			this.tabList = res.data;
		},
		//
		goToDetail(item) {
			this.$router.push({
				path: this.params.bisProjectId ? item.skip : item.url,
				query: {
					type: item.type,
					...this.params,
				},
			});
		},
		// 切换物业类型
		changeTab(item) {
			this.params.storeType = item.code;
			this.getPassengerFlowDetail();
		},
		// 获取默认时间
		getDefaultDate() {
			let date = new Date();
			let result = this.$dayjs(date).format("YYYY-MM");
			this.params.yearMonth = result;
		},
		// 去绝对值
		absoluteValue: function(num) {
			if (num === "-" || num === "") {
				return "";
			}
			return Math.abs(num - 0) + "%";
		},
		// 判断是否为空
		isEmpty: function(num) {
			if (num === 0) {
				return true;
			}
			return num && num !== "-" && num !== "- ";
		},
	},
	mounted() {
		this.getDefaultDate();
		this.getEstateEnumerate();
		this.getPassengerFlowDetail();
	},
};
</script>
<style lang="scss" scoped>
.tab-list-box {
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-size: 0.37rem;
	background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
	padding: 0 1.5rem;
	color: #cdcfd5;
	.tab-list-item {
		border-bottom: 3px solid transparent;
		padding-bottom: 10px;
	}
	.border-current {
		border-color: #fff;
		color: #fff;
		font-size: 0.42rem;
	}
}
.index-main {
	.title-unit {
		color: #b0b0b0;
		font-size: 0.12rem;
	}
}
.index-item-box {
	display: flex;
	flex-wrap: wrap;
	padding: 0 0.3rem;
	.index-item-inner {
		width: 45%;
		margin-bottom: 0.2rem;
		line-height: 1.3;
	}
	.title-sub {
		/* line-height: 14rpx; */
		/* margin-top: -10rpx; */
		display: block;
		margin-top: 0rpx;
		margin-bottom: 0.2rem;
		padding: 0 0.2rem;
	}
	.min {
		width: 33%;
	}
	.index-item-inner-1 {
		width: 45%;
		margin-bottom: 0.15rem;
	}
	.item-inner-label {
		color: #616161;
		font-size: 0.32rem;
	}
	.item-inner-data {
		display: flex;
		align-items: center;
	}
	.inner-data-num {
		font-size: 0.48rem;
		color: #333333;
	}
	.inner-data-unit {
		color: #616161;
		font-size: 0.32rem;
	}
	.tb-icon {
		width: 0.2rem;
		height: 0.3rem;
		margin: 0 3px;
	}
	.comparison-up {
		color: #5bbb35;
		display: flex;
		align-items: center;
	}
	.comparison-down {
		color: #fe1010;
		display: flex;
		align-items: center;
	}
}
</style>
