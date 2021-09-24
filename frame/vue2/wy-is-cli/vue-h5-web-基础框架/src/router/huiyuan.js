// 会员
const huiyuan = [
    {
        path: "/huiyuan/index",
        name: "index",
        component: () => import("../views/huiyuan/index.vue"),
        meta: {
            goback: 1
        }
    },
    {
        path: "/huiyuan/detail",
        name: "detail",
        component: () => import("../views/huiyuan/detail.vue"),
        meta: {
            goback: 2
        }
    }
];
export default huiyuan;

// const huiyuan = [
//     {
//         path: "/huiyuan/detail",
//         name: "detail",
//         component: () => import("../views/huiyuan/detail.vue"),
//         meta: {
//             goback: 1
//         }
//     }
// ];
// export default huiyuan;
