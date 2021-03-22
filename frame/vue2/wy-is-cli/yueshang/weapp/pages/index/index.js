const app = getApp();

Page({
	data: {
		tabList: [],
		currentTab: "0",
		label: "",
		params: {
			storeType: "1",
			bisProjectId: "",
			yearMonth: "",
		},
		defaultDate: "",
		showLeader: false,
		dataDetail: {},
		memberDetail: {},
	},
	onLoad: function () {
		this.setData({
			["params.yearMonth"]: app.getDefaultDate("month"),
		});
		this.getStoreType();
		this.getdata();
		this.getMember();
	},
	// 获取项目总信息
	async getLeaderInner() {
		let res = await app.request
			.options({ loading: true })
			.get(
				`/open/bis-open-report!bisProjectPrincipalInfo.action?bisProjectId=${this.data.params.bisProjectId}`
			);
		if (res.data) {
			this.setData({
				leaderDetail: res.data,
				showLeader: true,
			});
		} else {
			wx.showToast({
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
	showLeaderDetail() {
		this.getLeaderInner();
	},
	async getdata() {
		let res = await app.request
			.options({ loading: true })
			.get("/open/bis-open-statistics!getTotalInfo.action", this.data.params);
		this.setData({
			dataDetail: res.data,
		});
	},
	// 获取会员信息
	async getMember() {
		let res = await app.request
			.options({ loading: true })
			.get(
				"/open/bis-open-statistics!getYunYingGeneralMemberInfo.action?yearMonth=2020-10",
				this.data.params
			);
		this.setData({
			memberDetail: res.data,
		});
	},
	// 切换tab
	changeTab(e) {
		this.setData({
			["params.storeType"]: e.currentTarget.dataset.type,
		});
		this.getdata();
	},
	onProjectSelected(e) {
		let title = "运营数据（首页）";
		if (!e.detail.value) {
			title = "运营数据（首页）";
		} else {
			title = "运营数据（在营 )";
		}
		wx.setNavigationBarTitle({
			title: title,
		});
		this.setData({
			label: e.detail.label,
			["params.bisProjectId"]:
				(e.detail.value && e.detail.value.bisProjectId) || "",
		});
		this.getdata();
	},
	onDateChanged(e) {
		this.setData({
			["params.yearMonth"]: e.detail.value,
		});
		this.getdata();
	},
	// 获取搜索物业类型枚举
	async getStoreType() {
		let res = await app.request
			.options({ loading: true })
			.get("/open/bis-open-dict!chargeTypeList.action");
		this.setData({
			tabList: res.data,
		});
	},
	// 跳转
	skip() {
		app.page.go("../kaiye/index");
	},

	gotoYS() {
		app.page.go("/pages/yusuan/zyzb/index");
	},

	gotoZB() {
		app.page.go("/pages/zhibiao/index");
	},
});
