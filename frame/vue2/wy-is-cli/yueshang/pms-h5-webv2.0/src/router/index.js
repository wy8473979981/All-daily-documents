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
import yusuan from "./yusuan"
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
let home = {
    path: "/",
    name: "operateHome",
    component: null,
    meta:{
        keepAlive:true
    }
}
if(process) {
    console.log("process.env.NODE_ENV==43==",process.env.VUE_APP_ENV)
    if(process.env.VUE_APP_ENV === "prod") {
        home.component = () => import("../views/operateHome/index.vue")
    }else if(process.env.VUE_APP_ENV === "prodSyys") {
        home.component = () => import("../views/yusuan/index.vue")
    }else if(process.env.VUE_APP_ENV === "prodZsfx") {
        home.component = () => import("../views/zhaoshang/process/index.vue")
    }else if(process.env.VUE_APP_ENV === "prodSjfx") {
        home.component = () => import("../views/merchant/sjgl/index.vue")
    }else {
        home.component = () => import("../views/operateHome/index.vue")
    }
}else {
    home.component = () => import("../views/operateHome/index.vue")
}
const routes = [
    home,
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
    ...yusuan,
];
const router = new VueRouter({
    routes
});
export default router;
