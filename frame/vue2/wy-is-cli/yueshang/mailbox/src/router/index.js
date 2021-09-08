import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: () => import("../views/main/index.vue"),
        meta: {
            title: '联席总裁信箱'
        }
    },
    {
        path: "/writeEmail",
        name: "writeEmail",
        component: () => import("../views/writeEmail/index.vue"),
        meta: {
            title: '写信'
        }
    },
    {
        path: "/getEmail",
        name: "getEmail",
        component: () => import("../views/getEmail/index.vue"),
        meta: {
            title: '收件箱',
            keepAlive: true
        }
    },
    {
        path: "/getDetail",
        name: "getDetail",
        component: () => import("../views/getEmail/detail.vue"),
        meta: {
            title: '收件箱',
            keepAlive: true
        }
    },
    {
        path: "/draftBox",
        name: "draftBox",
        component: () => import("../views/draftBox/index.vue"),
        meta: {
            title: '草稿箱'
        }
    },
    {
        path: "/sentEmail",
        name: "sentEmail",
        component: () => import("../views/sentEmail/index.vue"),
        meta: {
            title: '已发送'
        }
    },
    {
        path: "/sentDetail",
        name: "sentDetail",
        component: () => import("../views/sentEmail/detail.vue"),
        meta: {
            title: '已发送'
        }
    },
    {
        path: "/delEmail",
        name: "delEmail",
        component: () => import("../views/delEmail/index.vue"),
        meta: {
            title: '已删除'
        }
    },
    {
        path: "/delDetail",
        name: "delDetail",
        component: () => import("../views/delEmail/detail.vue"),
        meta: {
            title: '已删除'
        }
    },
    {
        path: "/searchEmail",
        name: "searchEmail",
        component: () => import("../views/searchEmail/index.vue"),
        meta: {
            title: '联系总裁信箱'
        }
    },
    {
        path: "/contact",
        name: "contact",
        component: () => import("../views/contact/index.vue"),
        meta: {
            title: '通讯录'
        }
    }
];
const router = new VueRouter({
    routes,
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.y = document.body.scrollTop
    //         }
    //         return { x: 0, y: to.meta.y || 0 }
    //     }
    // }
});
export default router;
