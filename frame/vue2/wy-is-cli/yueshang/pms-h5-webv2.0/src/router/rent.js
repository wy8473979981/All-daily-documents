const rent = [
	{
		path: "/rent/index",
		name: "rentIndex",
		component: () => import("../views/rent/index.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/rent/detail",
		name: "rentDetail",
		component: () => import("../views/rent/detail.vue"),
		meta: {
			goback: 2
		}
	}
]
export default rent