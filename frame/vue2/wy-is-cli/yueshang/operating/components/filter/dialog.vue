<template>
	<view>
		<view :class="'app-filter app-filter--' + type" @tap="open">
			{{ title }}<image v-if="title" class="app-filter-icon" src="/static/assets/images/icon-filter.png"></image><slot></slot>
		</view>
		<view v-if="component.opened" class="app-filter-dialog overlay">
			<view class="app-filter-dialog__main">
				<image class="app-filter-dialog__main__close" src="@/static/assets/images/icon-close-ffffff.png" @tap="close"></image>
				<view class="app-filter-dialog__main__tip" v-if="tip">
					{{ tip }}
				</view>
				<view class="app-filter-dialog__main__body">
					<block v-if="component.groups.length">
						<view v-for="(group, groupi) in component.groups" :key="groupi" class="group">
							<view class="group__title">
								{{ group.label }}
							</view>
							<view class="group__items">
								<view
									v-for="(item, itemi) in group.items"
									:key="itemi"
									:class="
										'group-item ' +
										(component.selected[item.value] ? 'selected' : '') +
										' ' +
										(!component.selected[item.value] && (group.disabled || component.disabled) ? 'disabled' : '')
									"
									@tap="onGroupItemClick"
									:data-value="JSON.stringify(item.value)"
									:data-group="JSON.stringify(group)"
								>
									{{ item.label }}
								</view>
							</view>
						</view>
					</block>
					<block v-else>
						<view v-for="(item, itemi) in component.checkboxes" :key="itemi" class="checkbox-item">
							<label class="checkbox" @tap="onCheckboxClick" :data-value="item.value">
								<checkbox
									:checked="component.selected[item.value]"
									:disabled="!component.selected[item.value] && component.disabled"
									@tap.stop="onCheckboxClick"
									:data-value="item.value"
								></checkbox
								>{{ item.label }}
							</label>
						</view>
					</block>
				</view>
				<view class="app-filter-dialog__main__actions">
					<button type="primary" @tap="ok">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			component: {
				opened: false,
				disabled: false,
				checkboxes: [],
				groups: [],
				selected: {},
			},
		};
	},

	components: {},
	props: {
		overlay: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			default: "normal", // 'primary', 'normal'
		},
		title: {
			type: String,
		},
		tip: {
			type: String,
		},
		checkboxes: {
			type: Array,
			default: function () {
				return [];
			},
		},
		groups: {
			type: Array,
			default: function () {
				return [];
			},
		},
		maxnum: {
			type: Number,
			default: 0,
		},
	},
	watch: {
		checkboxes: {
			handler: function (items) {
				this.setData({
					"component.checkboxes": items.map((item) => {
						return {
							label: item.label,
							value: JSON.stringify(item.value || item),
						};
					}),
				});
			},
			immediate: true,
			deep: true,
		},
		groups: {
			handler: function (groups) {
				const selected = {};
				const newGroups = groups.map((group, groupi) => {
					return {
						maxnum: 0,
						id: `group-${groupi}`,
						...group,
						items: group.items.map((item) => {
							const value = item.value || item;
							if (item.selected === true) {
								selected[value] = `group-${groupi}`;
							}

							return {
								label: item.label,
								value,
							};
						}),
						$index: groupi,
					};
				});
				this.setData({
					"component.groups": newGroups,
					"component.selected": selected,
				});
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		open() {
			this.setData({
				"component.opened": true,
			});
			this.$emit("open");
		},

		close() {
			this.setData({
				"component.opened": false,
			});
			this.$emit("close");
		},

		onGroupItemClick(e) {
			const selected = this.component.selected;
			const group = JSON.parse(e.target.dataset.group);
			const value = JSON.parse(e.target.dataset.value);
			const setdata = {
				[`component.groups[${group.$index}].disabled`]: false,
			};

			if (selected[value]) {
				delete selected[value];
			} else {
				if (this.maxnum === 1) {
					this.setData({
						"component.selected": [value],
					});
					return;
				}

				if (group.maxnum === 1) {
					Object.keys(selected).forEach((key) => {
						if (selected[key] === group.id) {
							delete selected[key];
						}
					});
				}

				if (!this.component.disabled && this.component.groups[group.$index] && !this.component.groups[group.$index].disabled) {
					selected[value] = group.id;
				}

				if (group.maxnum > 1 && Object.keys(selected).filter((key) => selected[key] === group.id).length >= group.maxnum) {
					setdata[`component.groups[${group.$index}].disabled`] = true;
				}
			}

			setdata["component.disabled"] = this.maxnum && Object.keys(selected).length >= this.maxnum;
			setdata["component.selected"] = selected;
			this.setData(setdata);
			this.$forceUpdate();
		},

		onCheckboxClick(e) {
			const selected = this.component.selected;
			const value = e.target.dataset.value;

			if (selected[value]) {
				delete selected[value];
			} else {
				if (this.maxnum === 1) {
					Object.keys(selected).forEach((key) => {
						delete selected[key];
					});
				}

				if (!this.component.disabled) {
					selected[value] = true;
				}
			}

			this.setData({
				"component.disabled": this.maxnum > 1 && Object.keys(selected).length >= this.maxnum,
				"component.selected": selected,
			});
		},

		ok() {
			this.close();
			this.$emit("selected", {
				detail: Object.keys(this.component.selected).map((item) => {
					try {
						return JSON.parse(item);
					} catch {
						return item;
					}
				}),
			});
		},
	},
};
</script>
<style>
@import "./dialog.css";
</style>
