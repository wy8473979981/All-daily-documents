const shouru = [
	{
		path: "/shouru/zujin",
		name: "shouru",
		component: () => import("../views/shouru/zujin/zujin.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/shouru/shouruxq",
		name: "shouruxq",
		component: () => import("../views/shouru/shouruxq/shouruxq.vue"),
		meta: {
			goback: 2
		}
	},
	{
		path: "/shouru/duibi",
		name: "duibi",
		component: () => import("../views/shouru/duibi/duibi.vue"),
		meta: {
			goback: 3
		}
	},

];
export default shouru;