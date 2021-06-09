import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* 自动化后的路由 */
import menusList from '@/views/index.js'

// 默认路由
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/errorPage401')
},
{
  path: '/',
  redirect: '/home',
  component: Layout, // 一级菜单组 Layout 二级菜单组 menusList.mini 三级目前只能页面
  meta: {
    title: '首页及代办',
    level: 1
  },
  alwaysShow: true, // 取消合并规则 有children的都需要添加此参数
  children: [{
    path: '/home', // 定义url
    name: 'Home', // name必须和组件name保持一致用于keep-alive
    component: menusList.mini, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: false, // 是否在左侧菜单显示，子页面用过true
    // alwaysShow: true,
    meta: {
      title: '数据概览',
      hideNavBar: false,
      level: 2
    },
    children: [{
      path: '/home/data', // 定义url  //
      name: 'Home', // name必须和组件name保持一致用于keep-alive
      component: menusList.home, // 映射本地目录,menusList在运行时会自动扫描生成
      hidden: false, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '数据概览',
        hideNavBar: true,
        level: 3
      } // title：页面标题 hideNavBar：是否显示面包屑
    }, {
      path: 'investmentPromotionRanking', // 定义url  //
      name: 'investmentPromotionRanking', // name必须和组件name保持一致用于keep-alive
      component: menusList.investmentPromotionRanking, // 映射本地目录,menusList在运行时会自动扫描生成
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '招商排名',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      } // title：页面标题 hideNavBar：是否显示面包屑
    },
    {
      path: 'incomeRanking',
      name: 'incomeRanking',
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      component: menusList.incomeRanking,
      meta: {
        title: '收入排名',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      }
    },
    {
      path: 'saleRanking',
      name: 'saleRanking',
      hidden: true,
      component: menusList.saleRanking,
      meta: {
        title: '销售排名',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      }
    },
    {
      path: 'arrearage-rank', // 定义url
      name: 'ArrearageRank', // name必须和组件name保持一致用于keep-alive
      component: menusList.arrearageRank, // 映射本地目录,menusList在运行时会自动扫描生成
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '欠费排名',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      } // title：页面标题 hideNavBar：是否显示面包屑
    },
    {
      path: 'vip-rank', // 定义url
      name: 'VipRank', // name必须和组件name保持一致用于keep-alive
      component: menusList.vipRank, // 映射本地目录,menusList在运行时会自动扫描生成
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '会员指标',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      } // title：页面标题 hideNavBar：是否显示面包屑
    }, {
      path: 'customerFlowRank',
      name: 'CustomerFlowRank',
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      component: menusList.customerFlowRank,
      meta: {
        title: '客流排名',
        level: 3,
        activeMenu: '/home/data'
      }
    },
    {
      path: 'car-flow-rank',
      name: 'CarFlowRank',
      component: menusList.carFlowRank,
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '车流排名',
        level: 3,
        activeMenu: '/home/data'
      }
    }, {
      path: 'earlyWarning', // 定义url  //
      name: 'earlyWarning', // name必须和组件name保持一致用于keep-alive
      component: menusList.earlyWarning, // 映射本地目录,menusList在运行时会自动扫描生成
      hidden: true, // 是否在左侧菜单显示，子页面用过true
      meta: {
        title: '预警',
        hideNavBar: false,
        level: 3,
        activeMenu: '/home/data'
      }
    }
    ]
  },

  {
    path: '/globalSearch', // 定义url  //
    name: 'globalSearch', // name必须和组件name保持一致用于keep-alive
    component: menusList.globalSearch, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: true, // 是否在左侧菜单显示，子页面用过true
    meta: {
      title: '全局搜索',
      hideNavBar: false,
      level: 2,
      activeMenu: '/home/data'

    }
  },
  {
    path: 'group',
    name: 'group',
    component: menusList.group,
    meta: {
      title: '集团首页',
      level: 2
    }
  },
  {
    path: 'home2',
    component: menusList.mini,
    redirect: 'Page401',
    meta: {
      title: '信息和审批',
      level: 2
    },
    alwaysShow: true,
    children: [{
      path: 'Page401',
      name: 'errorPage401',
      component: menusList.errorPage401,
      meta: {
        title: '邮件和信息',
        level: 3
      }
    },
    {
      path: 'Page404',
      name: 'errorPage401',
      component: menusList.errorPage404,
      meta: {
        title: '网上审批',
        level: 3
      }
    }
    ]
  },
  {
    path: 'projectHome', // 定义url
    name: 'ProjectHome', // name必须和组件name保持一致用于keep-alive
    component: menusList.projectHome, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: false, // 是否在左侧菜单显示，子页面用过true
    meta: {
      title: '项目首页',
      hideNavBar: true,
      level: 2
    } // title：页面标题 hideNavBar：是否显示面包屑
  },
  {
    path: 'formDemo', // 定义url
    name: 'FormDemo', // name必须和组件name保持一致用于keep-alive
    component: menusList.formDemo, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: false, // 是否在左侧菜单显示，子页面用过true
    meta: {
      title: '表单页Demo',
      hideNavBar: true,
      level: 2
    } // title：页面标题 hideNavBar：是否显示面包屑
  }
  ]
},
{
  path: '/budgetList',
  redirect: '/home',
  component: Layout, // 一级菜单组 Layout 二级菜单组 menusList.mini 三级目前只能页面
  meta: {
    title: '预算管理',
    level: 1
  },
  alwaysShow: true, // 取消合并规则 有children的都需要添加此参数
  children: [{
    path: '/budgetList', // 定义url
    name: 'budgetOrganizationList', // name必须和组件name保持一致用于keep-alive
    component: menusList.mini, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: false, // 是否在左侧菜单显示，子页面用过true
    alwaysShow: true,
    meta: {
      title: '预算编制',
      hideNavBar: false,
      level: 2
    },
    children: [{
      path: '/budget-list',
      component: () => import('@/views/budgetOrganizationList/index'),
      name: 'budgetOrganizationList',
      meta: {
        title: '预算编制列表',
        level: 3
      }
    }, {
      path: '/budget-income',
      component: () => import('@/views/budgetOrganizationIncome/index'),
      name: 'budgetOrganizationIncome',
      meta: {
        title: '收入',
        level: 3
      }
    },
    {
      path: '/budget-cost',
      component: () => import('@/views/budgetOrganizationIncome/index'),
      name: 'budgetOrganizationIncome',
      meta: {
        title: '费用',
        level: 3
      }
    },
    {
      path: '/budget-summary',
      component: () => import('@/views/budgetOrganizationIncome/index'),
      name: 'budgetOrganizationIncome',
      meta: {
        title: '汇总表',
        level: 3
      }
    }, {
      path: '/approval-list',
      component: () => import('@/views/budgetaApproval/index'),
      name: 'budgetaApproval',
      meta: {
        title: '审批列表',
        level: 3
      }
    },
    {
      path: '/approval-details',
      component: () => import('@/views/approvaldetails/index'),
      name: 'Approvaldetails',
      meta: {
        title: '审批详情',
        level: 3
      }
    },
    {
      path: '/shops-adjustment-list',
      component: menusList.budgetAdjustmentList,
      name: 'BudgetAdjustmentList',
      meta: {
        title: '预算调整列表',
        level: 3
      }
    },
    {
      path: '/shops-adjustment-details',
      component: menusList.budgetAdjustmentDetails,
      name: 'BudgetAdjustmentDetails',
      meta: {
        title: '预算调整详情',
        level: 3
      }
    },
    {
      path: '/shops-support-contracts',
      component: menusList.shopPreparationList,
      name: 'ShopPreparationList',
      meta: {
        title: '铺位预算编制列表',
        level: 3
      }
    },
    {
      path: '/shops-support-many ',
      component: menusList.multipathList,
      name: 'multipathList',
      meta: {
        title: '多经编制列表',
        level: 3
      }
    }, {
      path: '/shops-consumption',
      component: menusList.energyDetails, // () => import('@/views/budgetModule/energyDetails/energyDetails'),
      name: 'EnergyDetails',
      meta: {
        title: '能耗明细',
        level: 3
      }
    }]
  },
  {
    path: '/shops', // 定义url
    name: 'SubjectConfig', // name必须和组件name保持一致用于keep-alive
    component: menusList.mini, // 映射本地目录,menusList在运行时会自动扫描生成
    hidden: false, // 是否在左侧菜单显示，子页面用过true
    alwaysShow: true,
    meta: {
      title: '预算设置',
      hideNavBar: false,
      level: 2
    }, children: [{
      path: '/shops-configuration',
      component: menusList.subjectConfig,
      name: 'SubjectConfig',
      meta: {
        title: '科目配置',
        level: 3
      }
    }]
  }
  ]
},

{
  path: '/promotionplatform',
  redirect: '/home',
  component: Layout, // 一级菜单组 Layout 二级菜单组 menusList.mini 三级目前只能页面
  meta: {
    title: '招商管理',
    level: 1
  },
  alwaysShow: true, // 取消合并规则 有children的都需要添加此参数
  children: [{

    path: 'home',
    component: menusList.mini,
    name: 'home',
    meta: {
      title: '招商平台',
      level: 2
    },

    children: [{
      path: '/groupingScheme',
      component: menusList.groupingScheme,
      name: 'groupingScheme',
      meta: {
        title: '计组方案列表',
        level: 3
      }
    },
    {
      path: '/rentalSchemeForm',
      component: menusList.rentalSchemeForm,
      name: 'rentalSchemeForm',
      meta: {
        title: '计组方案表单',
        level: 3
      }
    },

    {
      path: '/investmentPromotionProgress',
      component: menusList.investmentPromotionProgress,
      name: 'groupingScheme',
      meta: {
        title: '招商进度',
        level: 3
      }
    },
    {
      path: '/Negotiation',
      component: () => import('@/views/investmentPromotion/components/speedOfProgress/index.vue'),
      name: 'speedOfProgress',
      meta: {
        title: '洽谈',
        level: 3
      }
    },
    {
      path: '/contract',
      component: () => import('@/views/investmentPromotion/components/contract/index.vue'),
      name: 'speedOfProgress',
      meta: {
        title: '合同',
        level: 3
      }
    },
    {
      path: '/signature',
      component: () => import('@/views/investmentPromotion/components/signature/index.vue'),
      name: 'speedOfProgress',
      meta: {
        title: '双签',
        level: 3
      }
    }, {
      path: '/leaseContractList',
      component: menusList.leaseContractList,
      name: 'leaseContractList',
      meta: {
        title: '租赁合同列表',
        level: 3
      }
    },
    {
      path: '/leaseContractDetails',
      component: menusList.leaseContractDetails,
      name: 'leaseContractDetails',
      meta: {
        title: '租赁合同详情',
        level: 3
      }
    }
    ]
  }]

}, // 租赁合同页面
{
  path: '/page',
  redirect: '/home',
  component: Layout, // 一级菜单组 Layout 二级菜单组 menusList.mini 三级目前只能页面
  meta: {
    title: '财务管理',
    level: 1
  },
  alwaysShow: true, // 取消合并规则 有children的都需要添加此参数
  children: [{
    path: '/home',
    component: menusList.mini,
    name: 'bond',
    meta: {
      title: '保证金',
      level: 2
    },
    children: [{
      path: '/bond',
      component: () => import('@/views/bond/index.vue'),
      name: 'bond',
      meta: {
        title: '余额查询',
        level: 3
      }
    }]
  }, {
    path: '/collection',
    component: menusList.mini,
    name: 'collectionFinancial',
    meta: {
      title: '收款管理',
      level: 2
    },
    children: [{
      path: '/financial-list',
      component: () => import('@/views/collection/index.vue'),
      name: 'collectionFinancial',
      meta: {
        title: '收款单',
        level: 3
      }
    },
    {
      path: '/verification-added',
      component: () => import('@/views/collection/components/add.vue'),
      name: 'financialAdd',
      meta: {
        title: '财务收款单',
        level: 3
      }
    }]
  }, {
    path: '/home',
    component: menusList.mini,
    name: 'pinZhengGuanli',
    meta: {
      title: '凭证管理',
      level: 2
    },
    children: [
      {
        path: '/pinZhengGuanli',
        component: menusList.pinZhengGuanli,
        name: 'pinZhengGuanli',
        meta: {
          title: '凭证上传',
          level: 3
        }
      },
      {
        path: '/voucherDetails',
        component: menusList.voucherDetails,
        name: 'voucherDetails',
        meta: {
          title: '凭证页面详情',
          level: 3
        }
      }
    ]
  }, {
    path: '/invoice',
    component: menusList.mini,
    name: 'invoiceList',
    meta: {
      title: '票据管理',
      level: 2
    }, children: [{

      path: '/invoiceList',
      component: menusList.invoiceList,
      name: 'invoiceList',
      meta: {
        title: '发票页面',
        level: 3
      }
    },
    {
      path: '/invoiceDetails',
      component: menusList.invoiceDetails,
      name: 'invoiceDetails',
      meta: {
        title: '详情',
        level: 3
      }
    }]
  }, {
    path: '/verification',
    component: menusList.mini,
    name: 'financialVerification',
    meta: {
      title: '收款管理',
      level: 2
    }, children: [{
      path: '/verification-list',
      component: () => import('@/views/financialVerification/index.vue'),
      name: 'financialVerification',
      meta: {
        title: '核销单',
        level: 3
      }
    },
    {
      path: '/verification-details',
      component: () => import('@/views/financiaDetails/index.vue'),
      name: 'financiaDetails',
      meta: {
        title: '详情',
        level: 3
      }
    },
    {
      path: '/liushui',
      component: () => import('@/views/water/index.vue'),
      name: 'water',
      meta: {
        title: '流水',
        level: 3
      }
    }]
  }]
},

{
  path: '/basicdata',
  redirect: '',
  component: Layout, // 一级菜单组 Layout 二级菜单组 menusList.mini 三级目前只能页面
  meta: {
    title: '基础数据',
    level: 1
  },
  alwaysShow: true, // 取消合并规则 有children的都需要添加此参数
  children: [{
    path: '/brand',
    name: 'brandLibrarys',
    component: menusList.mini,
    meta: {
      title: '品牌商家',
      level: 2
    },
    alwaysShow: true,
    children: [{
      path: 'brandLibrary',
      name: 'brandLibrary',
      component: menusList.brandLibrary,
      meta: {
        title: '品牌库',
        level: 3
      }
    }, {
      path: '/brandlibrarydetails',
      name: 'BrandDetails',
      component: menusList.brandDetails,
      meta: {
        title: '品牌详情',
        level: 3
      }
    }]
  }]
}]
// 根据接口配置路由
export function getMenusList(menus) {
  const menuList = []
  menus.forEach(element => {
    const item = setMenu(element)
    item && menuList.push(item)
  })
  return menuList
}

// 递归菜单children
function setMenu(menuItem) {
  // 和接口约定这个必须为json字符串
  const extraInfo = JSON.parse(menuItem.extraInfo)

  // 前端没这组件 直接去除
  if (!menusList[extraInfo.component]) {
    return null
  }
  // 递归children
  const childrenList = []
  menuItem.children.forEach(element => {
    const item = setMenu(element)
    item && childrenList.push(item)
  })

  // 返回的menuItem
  const menu = {
    path: menuItem.url,
    meta: {
      title: menuItem.name,
      icon: extraInfo.icon
    },
    hidden: extraInfo.hidden,
    component: menusList[extraInfo.component]
  }

  // 如果children=0 不添加到menuItem中
  if (childrenList.length > 0) {
    menu.children = childrenList
  }

  // 如果是一级目录 直接设置布局
  if (extraInfo.component === 'Layout') {
    // 一级
    menu.redirect = menuItem.url
    // 没children的一级
    if (childrenList.length === 0) {
      return undefined
    }
  } else {
    menu.name = extraInfo.component
  }
  return menu
}

/**
 * asyncRoutes
 * 菜单一级可以不写children，但是考虑到后台页面很多会出现各种子级，所以只有一级菜单也必须设置children
 */
export const asyncRoutes = [

]

// 报错路由
export const errorRoutes = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

// 创建路由函数
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
