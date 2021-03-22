import Vue from "vue";
import VueRouter from "vue-router";
import xiaoshou from "./xiaoshou";
import shouru from "./shouru";
import keliu from "./keliu";
import qianfei from "./qianfei";
import rent from "./rent";
import cashForRent from './cashForRent'
import makeBusiness from './makeBusiness'
import huiyuan from "./huiyuan";
import zhaoshang from "./zhaoshang"
import merchant from "./merchant"
Vue.use(VueRouter);
//解决编程式路由往同一地址跳转时会报错的情况
/* const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
} */
const routes = [
    {
        path: "/",
        name: "operateHome",
        component: () => import("../views/operateHome/index.vue"),
    },
    {
        path: "/cheliu/paiming",
        name: "cheliuPaiming",
        component: () => import("../views/cheliu/paiming.vue"),
        meta: {
            goback: 1
        }
    },
    ...xiaoshou,
    ...shouru,
    ...keliu,
    ...qianfei,
    ...huiyuan,
    ...rent,
    ...cashForRent,
    ...makeBusiness,
    ...zhaoshang,
    ...merchant,
];
const router = new VueRouter({
    routes
});
export default router;
