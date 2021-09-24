const xiaoshou = [
	{
		path: "/xiaoshou/paiming",
		name: "XiaoshouPaiming",
		component: () => import("../views/xiaoshou/paiming.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/xiaoshou/month",
		name: "XiaoshouMonth",
		component: () => import("../views/xiaoshou/month.vue"),
		meta: {
			goback: 2
		}
	}
]
export default xiaoshou