const makeBusiness = [
	{
		path: "/makeBusiness/index",
		name: "makeBusinessIndex",
		component: () => import("../views/makeBusiness/index.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/makeBusiness/detail",
		name: "makeBusinessDetail",
		component: () => import("../views/makeBusiness/detail.vue"),
		meta: {
			goback: 2
		}
	},
	{
		path: "/makeBusiness/empty",
		name: "makeBusinessEmpty",
		component: () => import("../views/makeBusiness/empty.vue"),
		meta: {
			goback: 3
		}
	}
]
export default makeBusiness