const cashForRent = [
	{
		path: "/cashForRent/index",
		name: "cashForRentIndex",
		component: () => import("../views/cashForRent/index.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/cashForRent/detail",
		name: "cashForRentDetail",
		component: () => import("../views/cashForRent/detail.vue"),
		meta: {
			goback: 2
		}
	}
]
export default cashForRent