import Layout from '@/layout/index.vue'

export default [
  {
    path: "/database",
    component: Layout,
    redirect: '/database/city_files',
    meta: {
      title: "城市档案",
      icon: require('@images/cityFiles.png'),
      iconActive: require('@images/cityFilesActive.png'),
      visible: true
    },
    children: [
      {
        name: "cityFiles",
        path: "city_files",
        component: () => import("@views/database/city-files/index.vue"),
        meta: {
          title: "城市档案列表",
          visible: true
        }
      }
    ]
  },
  {
    path: "/land_manage",
    component: Layout,
    redirect: '/land_manage/parcel_msg',
    meta: {
      title: "地块信息",
      icon: require('@images/landManage.png'),
      iconActive: require('@images/landManageActive.png'),
      visible: true
    },
    children: [
      {
        name: "parcelMsg",
        path: "parcel_msg",
        component: () => import("@views/land-manage/parcel-msg/index.vue"),
        meta: {
          title: "地块信息列表",
          visible: true
        }
      },
      {
        name: "parcelMsgDetail",
        path: "parcel_msg/detail",
        component: () => import("@views/land-manage/parcel-msg/detail.vue"),
        meta: {
          title: "地块信息列表 > 详情",
          visible: false
        }
      },
    ]
  },
  {
    path: "/analysis",
    component: Layout,
    redirect: '/analysis/product',
    meta: {
      title: "竞品分析",
      icon: require('@images/analysis.png'),
      iconActive: require('@images/analysisActive.png'),
      visible: true
    },
    children: [
      {
        name: "product",
        path: "product",
        component: () => import("@views/analysis/product/index.vue"),
        meta: {
          title: "竞品分析",
          visible: true
        }
      },
      {
        name: "productDetail",
        path: "product/detail",
        component: () => import("@views/analysis/product/detail.vue"),
        meta: {
          title: "竞品分析 > 详情",
          visible: false
        }
      }
    ]
  },
  {
    path: "/sandbox",
    component: Layout,
    redirect: '/sandbox/index',
    meta: {
      title: "沙盒",
      icon: require('@images/sandbox.png'),
      iconActive: require('@images/sandboxActive.png'),
      visible: true
    },
    children: [
      {
        name: "sandbox",
        path: "index",
        component: () => import("@views/manage-tool/sandbox/index.vue"),
        meta: {
          title: "沙盒",
          visible: true
        }
      },
      {
        name: "sandboxDetail",
        path: "index/detail",
        component: () => import("@views/manage-tool/sandbox/detail.vue"),
        meta: {
          title: "沙盒详情",
          visible: false,
          breadcrumb: "沙盒详情 > 铺位列表",
        }
      }
    ]
  },
  {
    path: "/rent",
    component: Layout,
    redirect: '/rent/index',
    meta: {
      title: "租金包",
      icon: require('@images/rent.png'),
      iconActive: require('@images/rentActive.png'),
      visible: true
    },
    children: [
      {
        name: "rent",
        path: "index",
        component: () => import("@views/manage-tool/rent/index.vue"),
        meta: {
          title: "租金包",
          visible: true
        }
      },
      {
        name: "rentDetail",
        path: "index/detail",
        component: () => import("@views/manage-tool/rent/detail.vue"),
        meta: {
          title: "租金包 > 详情",
          visible: false
        }
      }
    ]
  },
  {
    path: "/prediction",
    component: Layout,
    redirect: '/prediction/index',
    meta: {
      title: "投模预测",
      icon: require('@images/prediction.png'),
      iconActive: require('@images/predictionActive.png'),
      visible: true
    },
    children: [
      {
        name: "prediction",
        path: "index",
        component: () => import("@views/prediction/index.vue"),
        meta: {
          title: "投模预测",
          visible: true
        }
      }
    ]
  },
  {
    path: "/synthetical",
    component: Layout,
    redirect: '/synthetical/index',
    meta: {
      title: "综合分析",
      icon: require('@images/synthetical.png'),
      iconActive: require('@images/syntheticalActive.png'),
      visible: true
    },
    children: [
      {
        name: "synthetical",
        path: "index",
        component: () => import("@views/synthetical/index.vue"),
        meta: {
          title: "综合分析",
          visible: true
        }
      },
      {
        name: "syntheticalDetail",
        path: "index/detail",
        component: () => import("@views/synthetical/detail.vue"),
        meta: {
          title: "综合分析 > 详情",
          visible: false
        }
      }
    ]
  },
  {
    path: "/risk_manage",
    component: Layout,
    redirect: '/risk_manage/risk',
    meta: {
      title: "风控",
      icon: require('@images/riskManage.png'),
      iconActive: require('@images/riskManageActive.png'),
      visible: true
    },
    children: [
      {
        name: "risk",
        path: "risk",
        component: () => import("@views/risk-manage/risk/index.vue"),
        meta: {
          title: "风控",
          visible: true
        }
      },
      {
        name: "riskDetail",
        path: "risk/detail",
        component: () => import("@views/risk-manage/risk/detail.vue"),
        meta: {
          title: "风控 > 详情",
          visible: false
        }
      }
    ]
  }
];
