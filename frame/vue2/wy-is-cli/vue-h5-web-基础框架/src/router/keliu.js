const keliu = [
	{
		path: "/keliu/paiming",
		name: "KeliuPaiming",
		component: () => import("../views/keliu/paiming/paiming.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/keliu/month",
		name: "month",
		component: () => import("../views/keliu/month/month.vue"),
		meta: {
			goback: 2
		}
	},
	{
		path: "/keliu/jiankong",
		name: "jiankong",
		component: () => import("../views/keliu/jiankong/jiankong.vue"),
		meta: {
			goback: 3
		}
	},
	{
		path: "/keliu/duibi",
		name: "duibi",
		component: () => import("../views/keliu/duibi/duibi.vue"),
		meta: {
			goback: 3
		}
	},
	{
		path: "/keliu/timeframe",
		name: "timeframe",
		component: () => import("../views/keliu/timeframe/timeframe.vue"),
		meta: {
			goback: 3
		}
	},
];
export default keliu;
