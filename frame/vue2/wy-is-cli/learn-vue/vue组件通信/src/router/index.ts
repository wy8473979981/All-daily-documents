/*
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 13:13:28
 * @LastEditTime: 2020-07-19 13:19:27
 * @LastEditors: user
 * @Description:
 * @FilePath: \usedemolist\src\router\index.ts
 */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/parent.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
