import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import TableTest from "../views/TableTest";
import keliu from "./keliu";
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/table-test",
        name: "table.test",
        component: TableTest,
    },
    {
        path: "/projectList",
        name: "ProjectList",
        component: () => import("../components/projectSelect/projectList.vue"),
    },
    {
        path: "/index",
        name: "Index",
        component: () => import("../views/index.vue"),
    },
    ...keliu,
];
const router = new VueRouter({
    routes,
});
export default router;
