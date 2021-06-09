const zhaoshang = [
	{
		path: "/zhaoshang/process/index",
		name: "zhaoshangIndex",
		component: () => import("../views/zhaoshang/process/index.vue"),
		meta: {
			goback: 1,
			keepAlive:true
		}
	},
	{
		path: "/zhaoshang/process/detail",
		name: "zhaoshangDetail",
		component: () => import("../views/zhaoshang/process/detail.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/reject",
		name: "zhaoshangDetail",
		component: () => import("../views/zhaoshang/reject.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/commissionTotal",
		name: "zhaoshangCommissionTotal",
		component: () => import("../views/zhaoshang/commissionTotal.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/perfCheck/index",
		name: "perfCheckIndex",
		component: () => import("../views/zhaoshang/perfCheck/index.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/perfCheck/detail",
		name: "perfCheckDetail",
		component: () => import("../views/zhaoshang/perfCheck/detail.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/perfCheck/shop",
		name: "perfCheckDetail",
		component: () => import("../views/zhaoshang/perfCheck/shop.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/linkBrand/index",
		name: "linkBrandIndex",
		component: () => import("../views/zhaoshang/linkBrand/index.vue"),
		meta: {
			goback: 1
		}

	},
	{
		path: "/zhaoshang/linkBrand/detail",
		name: "linkBrandDetail",
		component: () => import("../views/zhaoshang/linkBrand/detail.vue"),
        meta: {
        	goback: 1
        }
	},
	{
		path: "/zhaoshang/rentCompletRate",
		name: "rentCompletRate",
		component: () => import("../views/zhaoshang/rentCompletRate.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/brandNum",
		name: "brandNum",
		component: () => import("../views/zhaoshang/brandNum.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/zhaoshang/noMakebusinessBrandNum",
		name: "noMakebusinessBrandNum",
		component: () => import("../views/zhaoshang/noMakebusinessBrandNum.vue"),
		meta: {
			goback: 1
		}
	}
]
export default zhaoshang
