import Layout from '@/layout/index.vue'

export default [
  {
    path: '/base',
    component: Layout,
    redirect: '/base/index',
    meta: {
      title: '基础信息',
      icon: require('@images/base.png'),
      iconActive: require('@images/baseActive.png'),
      visible: false
    },
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('@views/base/index.vue'),
        meta: {
          title: '基础信息',
          visible: true
        }
      }
    ]
  },
  {
    path: '/appraisal',
    component: Layout,
    redirect: '/appraisal/listing',
    meta: {
      title: '价值评估',
      icon: require('@images/appraisal.png'),
      iconActive: require('@images/appraisalActive.png'),
      visible: false
    },
    children: [
      {
        path: 'listing',
        name: 'listing',
        component: () => import('@/views/appraisal/listing-value.vue'),
        meta: { title: 'IP价值', visible: true }
      },
      {
        path: 'fair',
        name: 'fair',
        component: () => import('@/views/appraisal/fair-value.vue'),
        meta: { title: '经营价值', visible: true }
      },
      {
        path: 'calculation',
        name: 'calculation',
        component: () => import('@/views/appraisal/calculation-model.vue'),
        meta: { title: '附件上传', visible: false }
      },
      {
        path: 'financing',
        name: 'financing',
        component: () => import('@/views/appraisal/financing-value.vue'),
        meta: { title: '融资价值', visible: false }
      }
    ]
  },
  {
    path: '/show',
    component: Layout,
    redirect: '/show/index',
    meta: {
      title: '展示',
      icon: require('@images/operateLog.svg'),
      iconActive: require('@images/operateLog.svg'),
      visible: true
    },
    children: [
      {
        name: 'indexLog',
        path: 'index',
        component: () => import('@/views/show/index.vue'),
        meta: {
          title: '资产盘点系统',
          visible: true
        }
      },
      {
        name: 'distribution',
        path: 'distribution',
        component: () => import('@/views/show/distribution/index.vue'),
        meta: {
          title: '资产分配情况',
          visible: true
        }
      },
      {
        name: 'entrust',
        path: 'entrust',
        component: () => import('@/views/show/entrust/index.vue'),
        meta: {
          title: '经营委托情况',
          visible: true
        }
      }
    ]
  },
  {
    path: '/income',
    component: Layout,
    redirect: '/income/calculation',
    meta: {
      title: '业主收益',
      icon: require('@images/assetsSum.svg'),
      iconActive: require('@images/assetsSum.svg'),
      visible: true
    },
    children: [
      {
        name: 'calculation',
        path: 'calculation',
        component: () => import('@/views/income/calculation/index.vue'),
        meta: {
          title: '项目测算',
          visible: true
        }
      },
      {
        name: 'comparison',
        path: 'comparison',
        component: () => import('@/views/income/comparison/index.vue'),
        meta: {
          title: '对比分析',
          visible: true
        }
      },
      // {
      //   name: 'susceptibility',
      //   path: 'susceptibility',
      //   component: () => import('@/views/income/susceptibility/index.vue'),
      //   meta: {
      //     title: '敏感性分析',
      //     visible: true
      //   }
      // }
    ]
  },
  {
    path: '/calculationCreate',
    name: 'calculationCreate',
    component: () => import('@/views/income/calculation/create/index.vue'),
    meta: {
      title: "项目测算录入",
      visible: false,
      dump: true,
    }
  },
  {
    path: '/assetsSum',
    component: Layout,
    redirect: '/assetsSum/stock',
    meta: {
      title: '资产汇总',
      icon: require('@images/assetsSum.svg'),
      iconActive: require('@images/assetsSum.svg'),
      visible: true
    },
    children: [
      {
        path: 'stock',
        name: 'stock',
        component: () => import('@/views/assetsSum/stock/index.vue'),
        meta: { title: '存量资产', visible: true }
      },
      {
        path: 'inbuild',
        name: 'inbuild',
        component: () => import('@/views/assetsSum/inbuild/index.vue'),
        meta: { title: '在建资产', visible: true }
      }
    ]
  },
  // {
  //   path: '/typeh',
  //   component: Layout,
  //   redirect: '/type/contrast',
  //   meta: {
  //     title: '汇总对比',
  //     icon: require('@images/assetsSum.svg'),
  //     iconActive: require('@images/assetsSum.svg'),
  //     visible: true
  //   },
  //   children: [
  //     {
  //       name: 'contrast',
  //       path: 'contrast',
  //       component: () => import('@views/type/contrast.vue'),
  //       meta: {
  //         title: '汇总对比',
  //         visible: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/typeh',
    component: Layout,
    redirect: '/typeh/contrast',
    meta: {
      title: '汇总对比',
      icon: require('@images/assetsSum.svg'),
      iconActive: require('@images/assetsSum.svg'),
      visible: true
    },
    children: [
      {
        name: 'contrast',
        path: 'contrast',
        component: () => import('@views/type/contrast.vue'),
        meta: {
          title: '汇总对比',
          visible: true
        }
      }
    ]
  },
  {
    path: '/stockAssets',
    component: Layout,
    redirect: '/stockAssets/trade',
    meta: {
      title: '存量资产导入',
      icon: require('@images/stockAssets.svg'),
      iconActive: require('@images/stockAssets.svg'),
      visible: true
    },
    children: [
      {
        name: 'trade',
        path: 'trade',
        component: () => import('@views/stockAssets/trade.vue'),
        meta: {
          title: '商业',
          visible: true
        }
      },
      {
        name: 'hotel',
        path: 'hotel',
        component: () => import('@views/stockAssets/hotel.vue'),
        meta: {
          title: '酒店',
          visible: true
        }
      },
      {
        name: 'office',
        path: 'office',
        component: () => import('@views/stockAssets/office.vue'),
        meta: {
          title: '办公',
          visible: true
        }
      },
      {
        name: 'flats',
        path: 'flats',
        component: () => import('@views/stockAssets/flats.vue'),
        meta: {
          title: '公寓',
          visible: true
        }
      },
      {
        name: 'barn',
        path: 'barn',
        component: () => import('@views/stockAssets/barn.vue'),
        meta: {
          title: '车库',
          visible: true
        }
      },
      {
        name: 'other',
        path: 'other',
        component: () => import('@views/stockAssets/trade.vue'),
        meta: {
          title: '其他',
          visible: false
        }
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/summary',
    meta: {
      title: '审核汇总',
      icon: require('@images/auditSum.svg'),
      iconActive: require('@images/auditSum.svg'),
      visible: true
    },
    children: [
      {
        name: 'summary',
        path: 'summary',
        component: () => import('@views/audit/index.vue'),
        meta: {
          title: '审核汇总',
          visible: true
        }
      }
    ]
  },
  {
    path: '/projectAllot',
    component: Layout,
    redirect: '/projectAllot/index',
    meta: {
      title: '项目分配',
      icon: require('@images/projectAllot.svg'),
      iconActive: require('@images/projectAllot.svg'),
      visible: true
    },
    children: [
      {
        name: 'indexAllot',
        path: 'index',
        component: () => import('@views/projectAllot/index.vue'),
        meta: {
          title: '项目分配',
          visible: true
        }
      }
    ]
  },
  {
    path: '/type',
    component: Layout,
    redirect: '/type/stock_assets',
    meta: {
      title: '类型配置',
      icon: require('@images/typeConfig.svg'),
      iconActive: require('@images/typeConfig.svg'),
      visible: true
    },
    children: [
      {
        name: 'stock_assets',
        path: 'stock_assets',
        component: () => import('@views/type/stock.vue'),
        meta: {
          title: '存量资产',
          visible: true
        }
      },
      {
        name: 'build',
        path: 'build',
        component: () => import('@views/type/build.vue'),
        meta: {
          title: '在建资产',
          visible: true
        }
      },
      {
        name: 'project',
        path: 'project',
        component: () => import('@views/type/project.vue'),
        meta: {
          title: '项目列表',
          visible: true
        }
      }
      // {
      //   name: 'contrast',
      //   path: 'contrast',
      //   component: () => import('@views/type/contrast.vue'),
      //   meta: {
      //     title: '汇总对比',
      //     visible: true
      //   }
      // }
    ]
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: '/type/analysis',
    meta: {
      title: '对比分析',
      visible: false
    }
  },
  {
    path: '/opening',
    component: Layout,
    redirect: '/type/opening',
    meta: {
      title: '开业率',
      visible: false
    }
  },
  {
    path: '/occupancy',
    component: Layout,
    redirect: '/type/occupancy',
    meta: {
      title: '出租率',
      visible: false
    }
  },
  {
    path: '/covered',
    component: Layout,
    redirect: '/type/covered',
    meta: {
      title: '建筑面积对比',
      visible: false
    }
  },
  {
    path: '/authority',
    component: Layout,
    redirect: '/authority/index',
    meta: {
      title: '权限配置',
      // icon: require('@images/base.png'),
      // iconActive: require('@images/baseActive.png'),
      visible: false
    },
    children: [
      {
        name: 'indexConfig',
        path: 'index',
        component: () => import('@views/authority/index.vue'),
        meta: {
          title: '权限配置',
          visible: true
        }
      }
    ]
  },

  {
    path: '/operateLog',
    component: Layout,
    redirect: '/operateLog/index',
    meta: {
      title: '日志',
      icon: require('@images/operateLog.svg'),
      iconActive: require('@images/operateLog.svg'),
      visible: true
    },
    children: [
      {
        name: 'indexLog',
        path: 'index',
        component: () => import('@views/operateLog/index.vue'),
        meta: {
          title: '日志',
          visible: true
        }
      }
    ]
  }
  // {
  //   path: '/show',
  //   component: Layout,
  //   redirect: '/show',
  //   meta: {
  //     title: '展示',
  //     icon: require('@images/showLog.svg'),
  //     iconActive: require('@images/showLog.svg'),
  //     visible: true
  //   }
  // },
  // {
  //   path: '/planShow',
  //   component: Layout,
  //   redirect: '/plan/planShow',
  //   meta: {
  //     title: '平面图',
  //     icon: require('@images/showLog.svg'),
  //     iconActive: require('@images/showLog.svg'),
  //     visible: true
  //   },
  //   children: [
  // {
  //   name: 'planIndex',
  //   path: 'index',
  //   component: () => import('@views/plan/index.vue'),
  //   meta: {
  //     title: 'SVG管理',
  //     visible: true
  //   }
  // },
  // {
  //   name: 'planShow',
  //   path: 'planShow',
  //   meta: {
  //     title: '平面图展示',
  //     visible: true
  //   }
  // }
  //   ]
  // }
]
