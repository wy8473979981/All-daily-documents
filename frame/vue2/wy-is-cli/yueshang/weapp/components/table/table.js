// components/table.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		values: {
			type: Array,
			default: [],
		},
		columns: {
			type: Array,
			default: [],
		},
		totalRow: {
			type: Object,
			default: null,
		},
		transformId: String,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		activeSort: "",
		direction: "",
		colList: [],
		dataList: [],
		total: null,
		id: "",
	},
	observers: {
		totalRow: function (newVal) {
			this.setData({
				total: newVal,
			});
		},
		columns: function (newVal) {
			this.setData({
				colList: newVal,
			});
		},
		values: function (newVal) {
			this.setData({
				dataList: newVal,
			});
		},
		transformId: function (newVal) {
			this.setData({
				id: newVal,
			});
		},
	},

	/**
	 * 组件的方法列表
	 */
	ready() {
		this.setData({
			colList: this.data.columns,
			total: this.data.totalRow,
			dataList: this.data.values,
			id: this.data.transformId,
		});
	},
	methods: {
		sort(e) {
			let { key, sort } = e.currentTarget.dataset;
			if (!sort) {
				return;
			}
			let direction = this.data.direction;
			if (this.data.direction === "up") {
				direction = "down";
			} else if (this.data.direction === "down") {
				direction = "";
			} else {
				direction = "up";
			}
			this.setData({
				activeSort: key,
				direction,
			});
			this.tableSort(key, direction);
			this.triggerEvent("sort", { key, direction });
		},
		tableSort(key, direction) {
			if (direction === "") {
				this.setData({
					datalist: this.data.values,
				});
				return;
			}
			let data = this.data.dataList;
			data.sort((a, b) => {
				let value1 = parseFloat(a[key].split(",").join(""));
				let value2 = parseFloat(b[key].split(",").join(""));
				if (direction === "up") {
					return value1 - value2;
				} else {
					return value2 - value1;
				}
			});
			this.setData({
				dataList: data,
			});
		},
		bindtap(e) {
			if (e.currentTarget.dataset.action) {
				this.triggerEvent("clickRow", { id: e.currentTarget.dataset.id });
			}
		},
	},
});
