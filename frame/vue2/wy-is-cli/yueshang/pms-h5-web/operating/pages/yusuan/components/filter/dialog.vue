<template>
	<view>
		<view :class="'app-filter app-filter--' + type" @tap="open">
			<slot></slot>
		</view>
		<view v-if="component.opened" class="app-filter-dialog overlay">
			<view class="app-filter-dialog__main">
				<image class="app-filter-dialog__main__close" src="@/assets/images/icon-close-ffffff.png" @tap="close"></image>
				<view class="app-filter-dialog__main__body">
					<view class="items__items">
						<view
							v-for="(item, itemi) in component.items"
							:key="itemi"
							:class="'item-item ' + (component.selectedId === item.value.budgetSheetId ? 'selected' : '')"
							@tap="onItemClick"
							:data-value="JSON.stringify(item.value)"
						>
							{{ item.label }}
						</view>
					</view>
				</view>
				<view class="app-filter-dialog__main__actions">
					<button type="primary" @tap="ok">确定</button>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
import { projectPageMap } from "@/pages/yusuan/datasource";
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";

export default {
	data() {
		return {
			component: {
				opened: false,
				items: [],
				projectName: null,
				projectId: null,
				selected: {},
				selectedId: null,
			},
		};
	},
	components: {},
	props: {
		type: {
			type: String,
			default: "",
		},
		projectId: {
			type: String | Number,
			default: "",
		},
		projectName: {
			type: String,
			default: "全部",
		},
		opened: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: function () {
				return [];
			},
		},
		selected: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	watch: {
		projectId: {
			handler: function (newValue) {
				this.setData({
					"component.projectId": newValue,
				});
			},
			immediate: true,
		},
		projectName: {
			handler: function (newValue) {
				this.setData({
					"component.projectName": newValue,
				});
			},
			immediate: true,
		},
		opened: {
			handler: function (newValue) {
				this.setData({
					"component.opened": newValue,
				});
			},
			immediate: true,
		},
		items: {
			handler: function (newValue) {
				this.setData({
					"component.items": newValue === "" ? [] : newValue,
				});
			},
			immediate: true,
			deep: true,
		},
		selected: {
			handler: function (selected) {
				this.setData({
					selected: selected.map((item) => (typeof item === "string" ? item : JSON.stringify(item))),
				});
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		close() {
			this.setData({
				"component.opened": false,
			});
			this.$emit("closed");
		},

		onItemClick(e) {
			const { value } = e.target.dataset;
			let result = JSON.parse(value);
			this.setData({
				"component.selected": result,
				"component.selectedId": result.budgetSheetId,
			});
		},

		ok() {
			const { id, budgetSheetId: mapId } = this.component.selected;

			if (mapId) {
				const url = projectPageMap[mapId][1];
        this.close();
        let detail ={
          shortName:this.component.projectName,
  	      mallId: this.component.projectId,
        }
        app.globalData.cache.set('project-selector-selected-ys',detail );
        if(url==='/pages/yusuan/zyzb/index'){
          	app.globalData.page.go(url, {
					id,
					projectName: this.component.projectName,
          projectId: this.component.projectId,
          path:'main'
				});
        }else{
          	app.globalData.page.go(url, {
              id,
              projectName: this.component.projectName,
              projectId: this.component.projectId,
            });

        }
			
			}
		},
	},
};
</script>
<style>
@import "./dialog.css";
</style>
