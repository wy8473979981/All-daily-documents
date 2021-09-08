/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 招商管理
 */
const businessRouter = {
  name: 'Business',
  title: '招商管理',
  redirect: '/BusinessManage/EntertainOfList',
  children: [{
    title: '招商平台',
    name: 'BusinessManage',
    redirect: '/BusinessManage/EntertainOfList',
    children: [
      {
        name: 'DecorationEnterList',
        title: '进场装修'
      }, {
        name: 'DecorationEnterAdd',
        hidden: true, // 是否在左侧菜单显示，子页面用过true
        title: '进场装修新增',
        parentName: 'DecorationEnterList'
      }, {
        name: 'DecorationEnterDetail',
        hidden: true, // 是否在左侧菜单显示，子页面用过true
        title: '进场装修详情',
        parentName: 'DecorationEnterList'
      },
      {
        name: 'BisExamineApprove',
        title: '开业审批'
      },
      {
        name: 'BisExamineApproveAdd',
        hidden: true, // 是否在左侧菜单显示
        title: '开业审批新增',
        parentName: 'BisExamineApprove'
      },
      {
        name: 'BisExamineApproveDetail',
        hidden: true, // 是否在左侧菜单显示true开启
        title: '开业审批详情',
        parentName: 'BisExamineApprove'
      },
      {
        name: 'BrandPositioningList',
        title: '品牌落位'
      },
      {
        name: 'BrandPositioningAdd',
        hidden: true, // 是否在左侧菜单显示，子页面用过true
        title: '品牌落位新增',
        parentName: 'BrandPositioningList'
      },
      {
        name: 'BrandPositioningDetail',
        hidden: true,
        title: '品牌落位详情',
        parentName: 'BrandPositioningList'
      },
      {
        name: 'Negotiation',
        title: '深入洽谈'
      },
      {
        name: 'AgreementIntention', // name必须和组件name保持一致用于keep-alive
        title: '意向协议'
      },
      {
        name: 'AgreementOfIntentAdd',
        parentName: 'AgreementIntention',
        title: '意向协议新增',
        hidden: true
      },
      {
        name: 'AgreementOfIntentDetails',
        parentName: 'AgreementIntention',
        title: '意向协议详情',
        hidden: true
      },
      {
        name: 'HoldinveStmentdue', // name必须和组件name保持一致用于keep-alive
        title: '租赁合同'
      },
      {
        name: 'LeaseContractAdd',
        hidden: true,
        title: '租赁合同新增',
        parentName: 'HoldinveStmentdue'
      },
      {
        name: 'HoldinveStmentdueDetails',
        hidden: true,
        title: '租赁合同详情',
        parentName: 'HoldinveStmentdue'
      },
      // {
      //   name: 'ContractDetails',
      //   parentName: 'ContractDetails',
      //   title: '详情',
      //   hidden: true
      // },
      {
        name: 'EntertainOfList', // name必须和组件name保持一致用于keep-alive
        title: '招商进度'
      },
      {
        name: 'EntertainDetail', // name必须和组件name保持一致用于keep-alive
        hidden: true, // 是否在左侧菜单显示，子页面用过true
        parentName: 'EntertainOfList',
        title: '招商进度详情'
      },
      {
        name: 'GroupingSchemeList',
        title: '计租方案'
      },
      {
        name: 'GroupingSchemeListAdd',
        hidden: true,
        parentName: 'GroupingSchemeList',
        title: '计租方案新增'
      },
      {
        name: 'AttractList', // name必须和组件name保持一致用于keep-alive
        title: '招商工具'
      }

    ]
  },
  {
    name: 'AttractInvestment',
    title: '招商报表',
    redirect: '/AttractInvestment/ProgressOfGroup',
    children: [
      {
        title: '招商进度-集团',
        name: 'ProgressOfGroup'
      },
      {
        title: '招商进度-项目',
        name: 'ProgressOfProject'
      },
      {
        title: '招商签约台帐',
        name: 'SigningAccount'
      },
      {
        title: '空铺统计-集团',
        name: 'EmptyShopStatisticsOfGroup'
      },
      {
        title: '空铺统计-项目',
        name: 'EmptyShopStatisticsOfProject'
      },
      {
        title: '空铺统计-合同',
        name: 'EmptyShopStatisticsOfContract'
      },
      {
        title: '空铺统计',
        name: 'EmptyShopStatistics'
      },
      {
        title: '租售比分析-按合同',
        name: 'RentalRatioAnalysisOfContract'
      }
    ]
  }]
}

export default businessRouter
