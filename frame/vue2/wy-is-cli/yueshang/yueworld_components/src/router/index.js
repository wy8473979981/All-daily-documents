import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("views/Index/index.vue"),
  },
  {
    path: "/loading",
    name: "Loading",
    component: () => import("views/Loading/index.vue"),
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("views/Map/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
