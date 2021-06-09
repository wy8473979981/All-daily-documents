// 招商管理
const merchant = [
    {
        path: "/merchant/sjgl",
        name: "sjgl",
        component: () => import("../views/merchant/sjgl/index.vue"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: "/merchant/sjxx",
        name: "sjxx",
        component: () => import("../views/merchant/sjxx/index.vue"),
        meta: {
            goback: 1
        }
    },
    {
        path: "/merchant/sjlb",
        name: "sjlb",
        component: () => import("../views/merchant/sjlb/index.vue"),
        meta: {
            goback: 1
        }
    },
    {
        path: "/merchant/sjbj",
        name: "sjbj",
        component: () => import("../views/merchant/sjbj/index.vue"),
        meta: {
            goback: 1
        }
    },

];
export default merchant;
