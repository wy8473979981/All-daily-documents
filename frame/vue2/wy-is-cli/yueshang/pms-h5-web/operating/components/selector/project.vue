<template>
	<view>
		<view class="app-project-selector" v-if="globalBisProjectId">
			<view>{{ globalProjectName }}</view>
			<view class="project-leader" v-if="bisProjectId" @tap.stop="showLeaderDetail">
				<image class="leader-avatar" src="/static/assets/images/leader.png" lazy-load="false"></image>
				<view class>项目总</view>
			</view>
		</view>
		<view class="app-project-selector" @tap="onClick" v-else>
			<view>{{ component.selected.label }}</view>
			<image v-if="!disabled" class="app-project-selector-icon" src="/static/assets/images/icon-selector-arrow.png"></image>
			<view class="project-leader" v-if="bisProjectId" @tap.stop="showLeaderDetail">
				<image class="leader-avatar" src="/static/assets/images/leader.png" lazy-load="false"></image>
				<view class>项目总</view>
			</view>
		</view>
		<cover-view class="project-leader-modal" v-if="showLeader" catchtouchmove="true">
			<cover-view class="leader-modal-inner">
				<cover-view class="leader-modal-inner-content" v-if="leaderDetail">
					<cover-view class="leader-name">{{ leaderDetail.userName }}</cover-view>
					<cover-view v-for="(item, index) in leaderDetail.resultList" :key="index" class="leader-title">
						{{ item.workDuty }} ({{ item.type === 1 ? item.startDate : item.startDate + "-" + item.endDate }})
					</cover-view>
					<cover-view class="leader-title">入职：{{ leaderDetail.attendWorkDate }}</cover-view>
				</cover-view>
				<cover-view class="leader-close" @tap="closeModal">X</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const cacheKey = "project-selector-selected";
let selfList = {};
export default {
	data() {
		return {
			component: {
				selected: {
					label: "全部",
					value: null,
				},
			},
			globalBisProjectId: app.globalData.bisProjectId,
			globalProjectName: app.globalData.projectName,
			bisProjectId: app.globalData.bisProjectId,
			showLeader: false,
			leaderDetail: "",
		};
	},

	components: {},
	props: {
		page: {
			type: String,
			default: "/pages/common/project-selector",
			table: {
				mode: "month",
			},
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		hideAll: {
			type: Boolean,
			default: false,
		},
		disabledAll: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: Object,
			default: null,
		},
	},
	watch: {
		selected: {
			handler: function (newValue) {
				if (newValue) {
					let bisProjectId = newValue.value.bisProjectId;
					if (newValue.label === "全部") {
						bisProjectId = null;
					}
					this.setData({
						"component.selected": {
							label: newValue.label,
							value: newValue.value,
						},
						bisProjectId: bisProjectId,
					});
				}
			},
			immediate: true,
			deep: true,
		},
		$route(to, from) {
			if (from.path === "/pages/common/project-selector") {
				const selected = app.globalData.cache.get(cacheKey, null);
				app.globalData.cache.clear(cacheKey);
				selfList[to.path].setData({
					"component.selected": selected || selfList[to.path].component.selected,
				});
				if (selected) {
					selfList[to.path].emit(selfList[to.path]);
				}
			}
		},
	},
	mounted() {
		selfList[this.$route.path] = this;
		this.setData({
			globalBisProjectId: app.globalData.bisProjectId,
			globalProjectName: app.globalData.projectName,
			bisProjectId: app.globalData.bisProjectId,
		});
		if (app.globalData.bisProjectId && app.globalData.bisProjectId !== "") {
			this.setData({
				globalBisProjectId: app.globalData.bisProjectId,
				globalProjectName: app.globalData.projectName,
				bisProjectId: app.globalData.bisProjectId,
			});
		} else {
			app.setProjectDefault = (res) => {
				this.setData({
					globalBisProjectId: res.bisProjectId,
					globalProjectName: res.projectName,
					bisProjectId: res.bisProjectId,
				});
			};
		}
	},

	onPageShow() {
		const selected = app.globalData.cache.get(cacheKey, null);
		app.globalData.cache.clear(cacheKey);
		this.setData({
			"component.selected": selected || this.component.selected,
		});
		if (selected) {
			this.emit();
		}
	},

	methods: {
		onClick() {
			if (this.disabled) {
				return;
			}

			const { disabledAll, hideAll } = this;
			app.globalData.page.go(this.page, {
				disabledAll,
				hideAll,
			});
		},

		emit(self) {
			this.setData({
				bisProjectId: (this.component.selected.value && this.component.selected.value.bisProjectId) || "",
			});
			self.$emit("selected", {
				detail: this.component.selected,
			});
		},

		showLeaderDetail() {
			this.getLeaderInner();
		},

		// 获取项目总信息
		async getLeaderInner() {
			let res = await app.globalData.request
				.options({
					loading: true,
				})
				.get(`/open/bis-open-report!bisProjectPrincipalInfo.action?bisProjectId=${this.bisProjectId}`);

			if (res.data) {
				this.setData({
					leaderDetail: res.data,
					showLeader: true,
				});
			} else {
				uni.showToast({
					title: "职位空缺",
					duration: 2000,
				});
			}
		},

		closeModal() {
			this.setData({
				showLeader: false,
			});
		},
	},
};
</script>
<style>
@import "./project.css";
</style>
