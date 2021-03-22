// 欠费
const qianfei = [
	{
		path: "/qianfei/list",
		name: "list",
		component: () => import("../views/qianfei/list/list.vue"),
		meta: {
			goback: 1
		}
	},
	{
		path: "/qianfei/detail",
		name: "month",
		component: () => import("../views/qianfei/detail/details.vue"),
		meta: {
			goback: 2
		}
	},

];
export default qianfei;
