const zhaoshang = [
	{
		path: "/zhaoshang/process/index",
		name: "zhaoshangIndex",
		component: () => import("../views/zhaoshang/process/index.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/process/detail",
		name: "zhaoshangDetail",
		component: () => import("../views/zhaoshang/process/detail.vue"),
	},
	{
		path: "/zhaoshang/reject",
		name: "zhaoshangDetail",
		component: () => import("../views/zhaoshang/reject.vue"),
	},
	{
		path: "/zhaoshang/commissionTotal",
		name: "zhaoshangCommissionTotal",
		component: () => import("../views/zhaoshang/commissionTotal.vue"),
	},
	{
		path: "/zhaoshang/perfCheck/index",
		name: "perfCheckIndex",
		component: () => import("../views/zhaoshang/perfCheck/index.vue"),
	},
	{
		path: "/zhaoshang/perfCheck/detail",
		name: "perfCheckDetail",
		component: () => import("../views/zhaoshang/perfCheck/detail.vue"),
	},
	{
		path: "/zhaoshang/perfCheck/shop",
		name: "perfCheckDetail",
		component: () => import("../views/zhaoshang/perfCheck/shop.vue"),
	},
	{
		path: "/zhaoshang/linkBrand/index",
		name: "linkBrandIndex",
		component: () => import("../views/zhaoshang/linkBrand/index.vue"),

	},
	{
		path: "/zhaoshang/linkBrand/detail",
		name: "linkBrandDetail",
		component: () => import("../views/zhaoshang/linkBrand/detail.vue"),

	},
	{
		path: "/zhaoshang/rentCompletRate",
		name: "rentCompletRate",
		component: () => import("../views/zhaoshang/rentCompletRate.vue"),
	},
	{
		path: "/zhaoshang/brandNum",
		name: "brandNum",
		component: () => import("../views/zhaoshang/brandNum.vue"),
	},
	{
		path: "/zhaoshang/noMakebusinessBrandNum",
		name: "noMakebusinessBrandNum",
		component: () => import("../views/zhaoshang/noMakebusinessBrandNum.vue"),
	}
]
export default zhaoshang