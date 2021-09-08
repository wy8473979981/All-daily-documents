/*
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description: 路由配置文件
 */
import baseRouter from './modules/base'
import businessRouter from './modules/business'
import baseOfficesRouter from './modules/baseOffices'
import financiaRouter from './modules/financia'
import operateManagementRouter from './modules/operationManagement'

import reportRouter from './modules/report'
import demoRouter from './modules/demo'

const routerList = [
  // 首页模块开始
  {
    path: '/',
    hidden: true,
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    redirect: '/Home/HomeData',
    title: '首页及待办',
    children: [
      {
        name: 'HomeData',
        path: '/Home/HomeData',
        hideNavBar: true, // 是否需要顶部标题栏 目前只有首页不需要},
        title: '数据概览',
        hideScroll: true // 隐藏全局滚动条
      },
      {
        name: 'LeaseStatus',
        title: '租赁状态表',
        hidden: true
      },
      {
        name: 'PersonalHome',
        title: '个人首页'
      },
      {
        name: 'Raydata',
        title: 'Raydata',
        hidden: true
      },
      {
        name: 'ProjectHome',
        title: '项目首页',
        hidden: false,
        hideBread: true
      },
      {
        name: 'LeaseSystem',
        title: '租赁图',
        path: 'https://pmstest.powerlong.com/pc_static/#/rp-rental-platform-main'
      },
      {
        name: 'Group',
        title: '集团首页',
        hidden: true
      },
      {
        name: 'BudgetHome',
        title: '预算首页',
        hidden: true
      },
      {
        name: 'InvestmentPromotionRanking',
        title: '招商排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'IncomeRanking',
        title: '收入排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'SaleRanking',
        title: '销售排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'ArrearageRank',
        title: '欠费排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'VipRank',
        title: '会员指标',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'CustomerFlowRank',
        title: '客流排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'CarFlowRank',
        title: '车流排名',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'EarlyWarning',
        title: '预警',
        parentName: 'HomeData',
        hidden: true
      },
      {
        name: 'GlobalSearch',
        title: '全局搜索',
        parentName: 'HomeData',
        hidden: true
      }
    ]
  },
  // 首页模块结束
  baseRouter,

  // 基础数据写字楼
  baseOfficesRouter,

  // 招商管理模块开始
  businessRouter,
  // 招商管理模块结束

  // 营运管理模块开始
  operateManagementRouter,
  // 营运管理模块结束

  // OA审批 开始
  {
    name: 'Examine', // 一级目录名称
    title: 'OA审批展示', // 标题名
    // hidden: true,
    children: [
      {
        name: 'BrandPositioningExamine',
        title: '品牌落位'
      },
      {
        name: 'BisExamineApproveExamine',
        title: '开业审批'
      },
      {
        name: 'DecorationEnterExamine',
        title: '装修进场'
      },
      {
        name: 'ContractChangeExamine',
        title: '合同变更'
      },
      {
        name: 'ContractTerminationExamine',
        title: '合同解约'
      },
      {
        name: 'WithdrawExamine',
        title: '撤场清算'
      },
      {
        name: 'AgreementOfIntentExamine',
        title: '意向协议'
      },
      {
        name: 'MarginConversionExamine',
        title: '保证金转换'
      },
      {
        name: 'MarginProcessingExamine',
        title: '保证金处理单'
      },
      {
        name: 'OpenCloseShopsExamine',
        title: '拆合铺'
      },
      {
        name: 'OpenCloseOfficesExamine',
        title: '写字楼拆合铺'
      },
      {
        name: 'ShopOnePriceAuditExamine',
        title: '一铺一价'
      },
      {
        name: 'OfficesOnePriceAuditExamine',
        title: '写字楼一铺一价铺'
      },
      {
        name: 'BusinessShopOnePriceAuditExamine',
        title: '多经一铺一价'
      },
      {
        name: 'ReceivableLightlyExamine',
        title: '应收减免'
      },
      {
        name: 'ConversionDetailExamine',
        title: '暂收款转换单'
      },
      {
        name: 'ProcessingDetailExamine',
        title: '暂收款处理单'
      },
      {
        name: 'ShopsModifyExamine',
        title: '商铺面积变更'
      },
      {
        name: 'OfficeUnitModifyExamine',
        title: '租赁单元面积变更'
      },
      {
        name: 'AdjustmentCostExamine',
        title: '费用调整单'
      },
      {
        name: 'HoldinveStmentdueExamine',
        title: '租赁合同'
      },
      {
        name: 'BrandLibraryChangeExamine',
        title: '品牌变更'
      },
      {
        name: 'TenantLibraryChangeExamine',
        title: '商家变更'
      }
    ]
  },
  // OA审批 结束

  // demo开始
  {
    name: 'Demo', // 一级目录名称
    title: 'Demo', // 标题名
    hidden: true,
    children: [
      {
        name: 'FormDemo', // 二级目录与跳转用名称
        title: '表单页Demo' // 标题名
      },
      {
        name: 'TableDemo',
        title: '表格demo'
      },
      {
        name: 'PageListDemo',
        title: '列表页demo'
      },
      {

        name: 'PageAccordionDetailDemo',
        title: '手风琴详情页'
      },
      {
        name: 'BaseComDemo',
        title: '基础组件demo'
      },
      {
        name: 'ExamineDemo',
        title: '审核页demo'
      },
      {
        name: 'PageAccordionGroupDetailDemo',
        title: '分组详情页demo'
      }
    ]
  },
  {
    name: 'Test',
    title: '测试',
    hidden: true,
    activeMenu: '/Test/ExamineDemo',
    children: [
      {
        name: 'ExamineDemo',
        title: '测试',
        activeMenu: '/Test/ExamineDemo'
      }
    ]
  },
  // demo 结束

  // 财务管理模块开始
  financiaRouter,
  // 财务管理模块结束

  // 演示demo模块开始
  ...demoRouter,
  // 演示demo模块结束
  // 报表模块开始
  ...reportRouter
  // 报表模块结束
]

export default routerList
