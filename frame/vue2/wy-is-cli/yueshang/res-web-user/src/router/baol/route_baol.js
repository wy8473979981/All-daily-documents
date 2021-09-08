import Layout from '@/layout/index.vue'
import menuTree from '@/components/menuTree.vue'
import { resolve } from 'url';
export default [
  {
    path: "/form",
    component: menuTree,
    redirect: '/form/list',
    meta: {
      title: "表单模板",
      // icon: "el-icon-coin",
      visible: true
    },
    children: [
      {
        name: "list",
        path: "list",
        component: () => import("@/views/form/list.vue"),
        meta: {
          title: "表单模板列表",
          visible: true
        }
      },
      {
        name: "edit",
        path: "edit",
        component: () => import("@/views/form/edit.vue"),
        meta: {
          title: "表单模板编辑",
          visible: true
        }
      },
      {
        name: "detail",
        path: "detail",
        component: () => import("@/views/form/detail.vue"),
        // component: resolve => require(['@/views/form/detail.vue'], resolve),
        meta: {
          title: "表单模板详情",
          visible: true
        }
      },
      {
        name: "test",
        path: "test",
        component: () => import("@/views/form/components/test.vue"),
        meta: {
          title: "表单模板详情",
          visible: true
        }
      }
    ]
  },
  {
    path: "/process",
    component: () => import("@/views/process/index.vue"),
    meta: {
      title: "流程分析",
      visible: true
    }
  },
  {
    path: "/analyze",
    component: () => import("@/views/process/analyze.vue"),
    meta: {
      title: "效率分析",
      visible: true
    }
  }
];