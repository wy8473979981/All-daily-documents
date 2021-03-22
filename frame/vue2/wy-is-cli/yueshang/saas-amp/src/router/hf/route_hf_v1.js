import Layout from '@/layout/index.vue'

export default [
  // 租金市调 start
  {
    path: "/contTempCate",
    component: Layout,
    redirect: '/contTempCate/contTempCateList',
    meta: {
      title: "租金市调",
      icon: require('@images/rent.png'),
      iconActive: require('@images/rentActive.png'),
      visible: true
    },
    children: [
      {
        name: "contTempCateList",
        path: "contTempCateList",
        component: () => import("@views/contTempCate/list.vue"),
        meta: {
          title: "租金市调列表",
          visible: true
        }
      },
      {
        name: "projectList",
        path: "projectList",
        component: () => import("@views/contTempCate/project.vue"),
        meta: {
          title: "项目信息列表",
          visible: true
        }
      },
      {
        name: "marketNameDetail",
        path: "marketNameDetail",
        component: () => import("@views/contTempCate/detail.vue"),
        meta: {
          title: "租金市调信息",
          visible: true
        }
      },
      {
        name: "contTempCateCreate",
        path: "contTempCateCreate",
        component: () => import("@views/contTempCate/create.vue"),
        meta: {
          title: "新增租金市调",
          visible: false
        }
      },
      {
        name: "projectAdd",
        path: "projectAdd",
        component: () => import("@views/contTempCate/add.vue"),
        meta: {
          title: "新增项目",
          visible: false
        }
      },
      {
        name: "contTempCateUpdate",
        path: "contTempCateUpdate",
        component: () => import("@views/contTempCate/update.vue"),
        meta: {
          title: "编辑租金市调",
          visible: false
        }
      },
      {
        name: "projectUpdate",
        path: "projectUpdate",
        component: () => import("@views/contTempCate/information.vue"),
        meta: {
          title: "编辑项目信息",
          visible: false
        }
      },
      {
        name: "projectDetail",
        path: "projectDetail",
        component: () => import("@views/contTempCate/projectDetail.vue"),
        meta: {
          title: "项目信息详细",
          visible: false
        }
      },
      {
        name: "projectDetailUpdate",
        path: "projectDetailUpdate",
        component: () => import("@views/contTempCate/projectDetailUpdate.vue"),
        meta: {
          title: "新增/编辑项目",
          visible: false
        }
      }
    ]
  },
  // 租金测算 start
  {
    path: "/companyContract",
    component: Layout,
    redirect: '/companyContract/companyContractList',
    meta: {
      title: "租金测算",
      icon: require('@images/prediction.png'),
      iconActive: require('@images/predictionActive.png'),
      visible: true
    },
    children: [
      {
        name: "companyContractList",
        path: "companyContractList",
        component: () => import("@views/companyContract/list.vue"),
        meta: {
          title: "租金测算列表",
          visible: true
        }
      },
      {
        name: "analogyList",
        path: "analogyList",
        component: () => import("@views/companyContract/analogy.vue"),
        meta: {
          title: "竞品类比列表",
          visible: true
        }
      },
      {
        name: "companyContractCreate",
        path: "companyContractCreate",
        component: () => import("@views/companyContract/create.vue"),
        meta: {
          title: "新增租金测算",
          visible: false
        }
      },
      {
        name: "companyContractUpdate",
        path: "companyContractUpdate",
        component: () => import("@views/companyContract/update.vue"),
        meta: {
          title: "编辑租金测算",
          visible: false
        }
      },
      {
        name: "analogyStep",
        path: "analogyStep",
        component: () => import("@views/companyContract/analogyStep.vue"),
        meta: {
          title: "新建竞品类比",
          visible: false
        }
      },
      {
        name: "propertyDetail",
        path: "propertyDetail",
        component: () => import("@views/companyContract/propertyDetail.vue"),
        meta: {
          title: "购物中心/商业街/底商",
          visible: false
        }
      }
    ]
  },
  // 权重定价 start
  {
    path: "/weightedPricing",
    component: Layout,
    redirect: '/weightedPricing/weightedPricingList',
    meta: {
      title: "权重定价",
      icon: require('@images/analysis.png'),
      iconActive: require('@images/analysisActive.png'),
      visible: true
    },
    children: [
      {
        name: "weightedPricingList",
        path: "weightedPricingList",
        component: () => import("@views/weightedPricing/list.vue"),
        meta: {
          title: "权重定价列表",
          visible: true
        }
      },
      {
        name: "weightList",
        path: "weightList",
        component: () => import("@views/weightedPricing/analogy.vue"),
        meta: {
          title: "竞品权重列表",
          visible: true
        }
      },
      {
        name: "weightedPricingUpdate",
        path: "weightedPricingUpdate",
        component: () => import("@views/weightedPricing/update.vue"),
        meta: {
          title: "编辑权重定价",
          visible: false
        }
      },
      {
        name: "weightedPricingCreate",
        path: "weightedPricingCreate",
        component: () => import("@views/weightedPricing/create.vue"),
        meta: {
          title: "新增权重定价",
          visible: false
        }
      },
      {
        name: "weightStep",
        path: "weightStep",
        component: () => import("@views/weightedPricing/weightStep.vue"),
        meta: {
          title: "新建/编辑竞品权重",
          visible: false
        }
      },
      {
        name: "propertyDetail",
        path: "propertyDetail",
        component: () => import("@views/weightedPricing/propertyDetail.vue"),
        meta: {
          title: "购物中心/商业街/底商",
          visible: false
        }
      }
    ]
  },
  // 租金分解 start
  {
    path: "/rentDecomposition",
    component: Layout,
    redirect: '/rentDecomposition/rentDecompositionList',
    meta: {
      title: "租金分解",
      icon: require('@images/sandbox.png'),
      iconActive: require('@images/sandboxActive.png'),
      visible: true
    },
    children: [
      {
        name: "rentDecompositionList",
        path: "rentDecompositionList",
        component: () => import("@views/rentDecomposition/list.vue"),
        meta: {
          title: "租金分解列表",
          visible: true
        }
      },
      {
        name: "decompositionList",
        path: "decompositionList",
        component: () => import("@views/rentDecomposition/analogy.vue"),
        meta: {
          title: "竞品租金分解列表",
          visible: true
        }
      },
      {
        name: "rentDecompositionUpdate",
        path: "rentDecompositionUpdate",
        component: () => import("@views/rentDecomposition/update.vue"),
        meta: {
          title: "编辑租金分解",
          visible: false
        }
      },
      {
        name: "rentDecompositionCreate",
        path: "rentDecompositionCreate",
        component: () => import("@views/rentDecomposition/create.vue"),
        meta: {
          title: "新增租金分解",
          visible: false
        }
      },
      {
        name: "decompositionStep",
        path: "decompositionStep",
        component: () =>
          import("@views/rentDecomposition/decompositionStep.vue"),
        meta: {
          title: "新建/编辑租金分解",
          visible: false
        }
      },
      {
        name: "propertyDetail",
        path: "propertyDetail",
        component: () => import("@views/rentDecomposition/propertyDetail.vue"),
        meta: {
          title: "购物中心/商业街/底商",
          visible: false
        }
      }
    ]
  }
];
