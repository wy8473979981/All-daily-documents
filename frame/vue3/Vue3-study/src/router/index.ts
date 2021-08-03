/*
 * @Descripttion:
 * @version:
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 16:53:11
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo.vue"),
  },
  {
    path: "/shallowRef",
    name: "shallowRef",
    component: () => import("../views/shallowRef.vue"),
  },
  {
    path: "/shallowReadonly",
    name: "shallowReadonly",
    component: () => import("../views/shallowReadonly.vue"),
  },
  {
    path: "/markRaw",
    name: "markRaw",
    component: () => import("../views/markRaw.vue"),
  },
  {
    path: "/toRef",
    name: "toRef",
    component: () => import("../views/toRef.vue"),
  },
  {
    path: "/customRef",
    name: "customRef",
    component: () => import("../views/customRef.vue"),
  },
  {
    path: "/provide",
    name: "provide",
    component: () => import("../views/provide/Father.vue"),
  },
  {
    path: "/isRef",
    name: "isRef",
    component: () => import("../views/isRef.vue"),
  },
  {
    path: "/suspense",
    name: "suspense",
    component: () => import("../views/suspense/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
