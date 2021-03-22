<template>
	<div :class="'app-section ' + (collapsed ? 'collapsed' : '')" @click="onSectionClick" :style="'background-color: ' + bgc + ';'">
		<div class="app-section__head" @click="toggleCollapse">
			<div class="app-section__head__title" :style="'border-left-color:' + borderColor">
				{{ title }}<text class="app-section__head__title__subtitle">{{ subtitle }}</text
				><slot name="head-title"></slot>
			</div>
			<slot class="app-section__head__actions_left" name="head-actions_left"></slot>

			<div class="app-section__head__actions">
				<slot name="head-actions"></slot>
			</div>

			<van-image v-if="url" class="app-section__head__url" :src="arrowDown"></van-image>
			<van-image v-else-if="collapseable" :class="'app-section__head__collapse ' + (collapsed ? 'collapsed' : '')" :src="arrowDown"></van-image>
		</div>
		<div class="app-section__body" v-if="!collapsed">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import arrowDown from "../../assets/images/icon-arrow-down.png";
export default {
	data() {
		return {
			collapsed: false,
			arrowDown: arrowDown,
		};
	},

	components: {},
	props: {
		title: {
			type: String,
		},
		subtitle: {
			type: String,
		},
		collapseable: {
			type: Boolean,
			default: false,
		},
		url: {
			type: String,
			default: null,
		},
		type: {
			type: String,
			default: null,
		},
		skip: {
			type: String,
			default: null,
		},
		bgc: {
			type: String,
			default: null,
		},
		borderColor: {
			type: String,
			default: null,
		},
	},
	options: {
		multipleSlots: true, // 在组件定义时的选项中启用多slot支持
	},
	methods: {
		toggleCollapse() {
			if (!this.collapseable) return;
			this.collapsed = !this.collapsed;
		},
		onSectionClick() {
			// if (this.url && this.url !== "#" && (!this.type || !this.skip)) {
			// 	// const app = getApp();
			// 	// app.page.go(this.url);
			// 	uni.navigateTo({ url: this.url });
			// } else {
			// 	this.$emit("navigation", { url: this.url, type: this.type, skip: this.skip });
			// }
		},
	},
};
</script>
<style>
@import "./section.css";
</style>
