import Layout from '@/layout/index.vue'

export default [
  {
    path: '/management',
    component: Layout,
    redirect: '/management/budgetView',
    meta: {
      title: '预算管理',
      icon: require('@images/typeConfig.png'),
      iconActive: require('@images/typeConfig.png'),
      visible: true
    },
    children: [
      {
        name: 'budgetView',
        path: 'budgetView',
        redirect: '/management/budgetView/view',
        component: () => import('@views/management/budgetView/index.vue'),
        meta: {
          title: '预算查看',
          visible: true,
          breadcrumbVisible: false
        },
        children: [
          {
            name: 'view',
            path: 'view',
            redirect: '/management/budgetView/view/index',
            component: () => import('@views/management/budgetView/index.vue'),
            meta: {
              title: '预算查看',
              visible: false
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/budgetView/view.vue'),
                meta: {
                  title: '预算查看',
                  visible: false
                }
              }
            ]
          },
          {
            name: 'profit',
            path: 'profit',
            redirect: '/management/budgetView/profit/index',
            component: () => import('@views/management/budgetView/index.vue'),
            meta: {
              title: '利润表',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/budgetView/profit.vue'),
                meta: {
                  title: '利润表',
                  visible: false
                }
              }
            ]
          },
          {
            name: 'income',
            path: 'income',
            redirect: '/management/budgetView/income/index',
            component: () => import('@views/management/budgetView/index.vue'),
            meta: {
              title: '收入',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/budgetView/income.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
              {
                name: 'lease',
                path: 'lease',
                component: () => import('@views/management/budgetView/income/lease.vue'),
                meta: {
                  title: '租费收入-商业',
                  visible: true
                }
              },
              {
                name: 'project',
                path: 'project',
                component: () => import('@views/management/budgetView/income/project.vue'),
                meta: {
                  title: '项目指标',
                  visible: false
                }
              },
              {
                name: 'houseMassage',
                path: 'houseMassage',
                component: () => import('@views/management/budgetView/income/houseMassage.vue'),
                meta: {
                  title: '住宅/写字楼',
                  visible: true
                }
              },
              {
                name: 'rentHouseMassage',
                path: 'rentHouseMassage',
                component: () => import('@views/management/budgetView/income/rentHouseMassage.vue'),
                meta: {
                  title: '物管费收入-住宅',
                  visible: true
                }
              },
              {
                name: 'rentXzl',
                path: 'rentXzl',
                component: () => import('@views/management/budgetView/income/rentHouseMassage.vue'),
                meta: {
                  title: '物管费收入-写字楼',
                  visible: true
                }
              },
              {
                name: 'wsnHouseMassage',
                path: 'wsnHouseMassage',
                component: () => import('@views/management/budgetView/income/wsnHouseMassage.vue'),
                meta: {
                  title: '多经收入-住宅',
                  visible: true
                }
              },
              {
                name: 'wsnXzl',
                path: 'wsnXzl',
                component: () => import('@views/management/budgetView/income/wsnHouseMassage.vue'),
                meta: {
                  title: '多经收入-写字楼',
                  visible: true
                }
              },
              {
                name: 'wsn',
                path: 'wsn',
                component: () => import('@views/management/budgetView/income/wsn.vue'),
                meta: {
                  title: '多经收入-商业',
                  visible: true
                }
              },

              {
                name: 'otherCommissionRevenue',
                path: 'otherCommissionRevenue',
                component: () => import('@views/management/budgetView/income/otherCommissionRevenue.vue'),
                meta: {
                  title: '委托管理收入',
                  visible: true
                }
              },
              {
                name: 'rentManagementFee',
                path: 'rentManagementFee',
                component: () => import('@views/management/budgetView/income/rentManagementFee.vue'),
                meta: {
                  title: '委托管理收入',
                  visible: true
                }
              }, {
                name: 'parkingRevenue',
                path: 'parkingRevenue',
                component: () => import('@views/management/budgetView/income/parkingRevenue.vue'),
                meta: {
                  title: '停车场收入',
                  visible: true
                }
              }, {
                name: 'otherRevenue',
                path: 'otherRevenue',
                component: () => import('@views/management/budgetView/income/otherRevenue.vue'),
                meta: {
                  title: '其他业务类型收入',
                  visible: true
                }
              }, {
                name: 'consortiumIncome',
                path: 'consortiumIncome',
                component: () => import('@views/management/budgetView/income/consortiumIncome.vue'),
                meta: {
                  title: '联营收支明细',
                  visible: true
                }
              }, {
                name: 'otherIncome',
                path: 'otherIncome',
                component: () => import('@views/management/budgetView/income/otherIncome.vue'),
                meta: {
                  title: '其他收入',
                  visible: true
                }
              },
              {
                name: 'rentClearMessage',
                path: 'rentClearMessage',
                component: () => import('@views/management/budgetView/income/rentClearMessage.vue'),
                meta: {
                  title: '租费明细清欠',
                  visible: true
                }
              },
            ]
          },
          {
            name: 'disburse',
            path: 'disburse',
            redirect: '/management/budgetView/disburse/index',
            component: () => import('@views/management/budgetView/index.vue'),
            meta: {
              title: '费用支出',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/budgetView/disburse.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
              {
                name: 'wageWelfareFee',
                path: 'wageWelfareFee',
                component: () => import('@views/management/budgetView/disburse/wageWelfareFee.vue'),
                meta: {
                  title: '工资福利费',
                  visible: true
                }
              },
              {
                name: 'trainingFee',
                path: 'trainingFee',
                component: () => import('@views/management/budgetView/disburse/trainingFee.vue'),
                meta: {
                  title: '培训费',
                  visible: true
                }
              },
              {
                name: 'recruitmentFee',
                path: 'recruitmentFee',
                component: () => import('@views/management/budgetView/disburse/recruitmentFee.vue'),
                meta: {
                  title: '招聘费',
                  visible: true
                }
              },
              {
                name: 'administrativeExpenseBudget',
                path: 'administrativeExpenseBudget',
                component: () => import('@views/management/budgetView/disburse/administrativeExpenseBudget.vue'),
                meta: {
                  title: '行政费用',
                  visible: true
                }
              },
              {
                name: 'travelFee',
                path: 'travelFee',
                component: () => import('@views/management/budgetView/disburse/travelFee.vue'),
                meta: {
                  title: '差旅费',
                  visible: true
                }
              },
              {
                name: 'businessEntertainFee',
                path: 'businessEntertainFee',
                component: () => import('@views/management/budgetView/disburse/businessEntertainFee.vue'),
                meta: {
                  title: '业务招待费',
                  visible: true
                }
              },
              {
                name: 'invalidPurchase',
                path: 'invalidPurchase',
                component: () => import('@views/management/budgetView/disburse/invalidPurchase.vue'),
                meta: {
                  title: '非生产性资产采购',
                  visible: true
                }
              },
              {
                name: 'planningCostBudget',
                path: 'planningCostBudget',
                component: () => import('@views/management/budgetView/disburse/planningCostBudget.vue'),
                meta: {
                  title: '企划费明细',
                  visible: true
                }
              },
              {
                name: 'cleanHygieneBudget',
                path: 'cleanHygieneBudget',
                component: () => import('@views/management/budgetView/disburse/cleanHygieneBudget.vue'),
                meta: {
                  title: '清洁卫生费',
                  visible: true
                }
              },
              {
                name: 'cleanHygieneBudgetDetail',
                path: 'cleanHygieneBudgetDetail',
                component: () => import('@views/management/budgetView/disburse/cleanHygieneBudgetDetail.vue'),
                meta: {
                  title: '清洁卫生费明细',
                  visible: true
                }
              },
              {
                name: 'securityBudget',
                path: 'securityBudget',
                component: () => import('@views/management/budgetView/disburse/securityBudget.vue'),
                meta: {
                  title: '安全保卫费',
                  visible: true
                }
              },
              {
                name: 'securityBudgetDetail',
                path: 'securityBudgetDetail',
                component: () => import('@views/management/budgetView/disburse/securityBudgetDetail.vue'),
                meta: {
                  title: '安全保卫费明细',
                  visible: true
                }
              },
              {
                name: 'greeningCostBudget',
                path: 'greeningCostBudget',
                component: () => import('@views/management/budgetView/disburse/greeningCostBudget.vue'),
                meta: {
                  title: '绿化养护费',
                  visible: true
                }
              },
              {
                name: 'greeningCostBudgetDetail',
                path: 'greeningCostBudgetDetail',
                component: () => import('@views/management/budgetView/disburse/greeningCostBudgetDetail.vue'),
                meta: {
                  title: '绿化养护费明细',
                  visible: true
                }
              },
              {
                name: 'engineeringCostBudget',
                path: 'engineeringCostBudget',
                component: () => import('@views/management/budgetView/disburse/engineeringCostBudget.vue'),
                meta: {
                  title: '工程维保费',
                  visible: true
                }
              },
              {
                name: 'engineeringCostBudgetDetail',
                path: 'engineeringCostBudgetDetail',
                component: () => import('@views/management/budgetView/disburse/engineeringCostBudgetDetail.vue'),
                meta: {
                  title: '工程维保费明细',
                  visible: true
                }
              },
              {
                name: 'commonEnergyDetail',
                path: 'commonEnergyDetail',
                component: () => import('@views/management/budgetView/disburse/commonEnergyDetail.vue'),
                meta: {
                  title: '能耗明细',
                  visible: true
                }
              },
              {
                name: 'commonEnergySummary',
                path: 'commonEnergySummary',
                component: () => import('@views/management/budgetView/disburse/commonEnergySummary.vue'),
                meta: {
                  title: '能源汇总',
                  visible: true
                }
              },
              {
                name: 'depreciationFee',
                path: 'depreciationFee',
                component: () => import('@views/management/budgetView/disburse/depreciationFee.vue'),
                meta: {
                  title: '折旧费',
                  visible: true
                }
              },
              {
                name: 'financeFee',
                path: 'financeFee',
                component: () => import('@views/management/budgetView/disburse/financeFee.vue'),
                meta: {
                  title: '财务费用',
                  visible: true
                }
              },
              {
                name: 'rentalCost',
                path: 'rentalCost',
                component: () => import('@views/management/budgetView/disburse/rentalCost.vue'),
                meta: {
                  title: '整租租赁成本',
                  visible: true
                }
              },
              {
                name: 'otherCostFee',
                path: 'otherCostFee',
                component: () => import('@views/management/budgetView/disburse/otherCostFee.vue'),
                meta: {
                  title: '其他成本费用',
                  visible: true
                }
              },
              {
                name: 'projectReform',
                path: 'projectReform',
                component: () => import('@views/management/budgetView/disburse/projectReform.vue'),
                meta: {
                  title: '工程改造费',
                  visible: true
                }
              },
              {
                name: 'leasebackPay',
                path: 'leasebackPay',
                component: () => import('@views/management/budgetView/disburse/leasebackPay.vue'),
                meta: {
                  title: '返租支出',
                  visible: true
                }
              },
              {
                name: 'otherDisburse',
                path: 'otherDisburse',
                component: () => import('@views/management/budgetView/disburse/otherDisburse.vue'),
                meta: {
                  title: '其他支出',
                  visible: true
                }
              }
            ]
          },
          {
            name: 'summary',
            path: 'summary',
            redirect: '/management/budgetView/summary/index',
            component: () => import('@views/management/budgetView/index.vue'),
            meta: {
              title: '汇总',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/budgetView/summary.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },

              {
                name: 'fundPlan',
                path: 'fundPlan',
                component: () => import('@views/management/budgetView/summary/fundPlan.vue'),
                meta: {
                  title: '资金计划',
                  visible: true
                }
              },
              {
                name: 'areaInfo',
                path: 'areaInfo',
                component: () => import('@views/management/budgetView/summary/areaInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'projectInfo',
                path: 'projectInfo',
                component: () => import('@views/management/budgetView/summary/projectInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'personInfo',
                path: 'personInfo',
                component: () => import('@views/management/budgetView/summary/personInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'mainTarget',
                path: 'mainTarget',
                component: () => import('@views/management/budgetView/summary/mainTarget.vue'),
                meta: {
                  title: '主要指标',
                  visible: true
                }
              },
              {
                name: 'rentpoints',
                path: 'rentpoints',
                component: () => import('@views/management/budgetView/summary/rentpoints.vue'),
                meta: {
                  title: '租费概况',
                  visible: true
                }
              },
              {
                name: 'staffCost',
                path: 'staffCost',
                component: () => import('@views/management/budgetView/summary/staffCost.vue'),
                meta: {
                  title: '人事费用概况',
                  visible: true
                }
              },
              {
                name: 'personSurvey',
                path: 'personSurvey',
                component: () => import('@views/management/budgetView/summary/personSurvey.vue'),
                meta: {
                  title: '人事费用概况',
                  visible: true
                }
              },
              {
                name: 'administrativeExpenseSurvey',
                path: 'administrativeExpenseSurvey',
                component: () => import('@views/management/budgetView/summary/administrativeExpenseSurvey.vue'),
                meta: {
                  title: '行政费用概况',
                  visible: true
                }
              },
              {
                name: 'projectCost',
                path: 'projectCost',
                component: () => import('@views/management/budgetView/summary/projectCost.vue'),
                meta: {
                  title: '企划费',
                  visible: true
                }
              },
              {
                name: 'energySurvey',
                path: 'energySurvey',
                component: () => import('@views/management/budgetView/summary/energySurvey.vue'),
                meta: {
                  title: '能耗费概况',
                  visible: true
                }
              },
              {
                name: 'propertyPaymentStatistics',
                path: 'propertyPaymentStatistics',
                component: () => import('@views/management/budgetView/summary/propertyPaymentStatistics.vue'),
                meta: {
                  title: '地产支付物业款项统计',
                  visible: true
                }
              },
              {
                name: 'propertyDeliveryStatistics',
                path: 'propertyDeliveryStatistics',
                component: () => import('@views/management/budgetView/summary/propertyDeliveryStatistics.vue'),
                meta: {
                  title: '物业新增交房统计',
                  visible: true
                }
              },
              {
                name: 'wsngk',
                path: 'wsngk',
                component: () => import('@views/management/budgetView/summary/wsngk.vue'),
                meta: {
                  title: '多经概况',
                  visible: true
                }
              },
              {
                name: 'overviewPropertyManagement',
                path: 'overviewPropertyManagement',
                component: () => import('@views/management/budgetView/summary/overviewPropertyManagement.vue'),
                meta: {
                  title: '物业多经概况',
                  visible: true
                }
              },
            ]
          }
        ]
      },
      {
        name: 'plait',
        path: 'plait',
        redirect: '/management/plait/income',
        component: () => import('@views/management/plait/index.vue'),
        meta: {
          title: '预算编制',
          visible: true,
          breadcrumbVisible: true
        },
        children: [
          {
            name: 'income',
            path: 'income',
            redirect: '/management/plait/income/index',
            component: () => import('@views/management/plait/index.vue'),
            meta: {
              title: '收入',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/plait/income.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
              {
                name: 'lease',
                path: 'lease',
                component: () => import('@views/management/plait/income/lease.vue'),
                meta: {
                  title: '租费收入-商业',
                  visible: true
                }
              },
              {
                name: 'project',
                path: 'project',
                component: () => import('@views/management/plait/income/project.vue'),
                meta: {
                  title: '项目指标',
                  visible: false
                }
              },
              {
                name: 'houseMassage',
                path: 'houseMassage',
                component: () => import('@views/management/plait/income/houseMassage.vue'),
                meta: {
                  title: '住宅/写字楼',
                  visible: true
                }
              },
              {
                name: 'rentHouseMassage',
                path: 'rentHouseMassage',
                component: () => import('@views/management/plait/income/rentHouseMassage.vue'),
                meta: {
                  title: '物管费收入-住宅',
                  visible: true
                }
              },
              {
                name: 'rentXzl',
                path: 'rentXzl',
                component: () => import('@views/management/plait/income/rentHouseMassage.vue'),
                meta: {
                  title: '物管费收入-写字楼',
                  visible: true
                }
              },
              {
                name: 'wsnHouseMassage',
                path: 'wsnHouseMassage',
                component: () => import('@views/management/plait/income/wsnHouseMassage.vue'),
                meta: {
                  title: '多经收入-住宅',
                  visible: true
                }
              },
              {
                name: 'wsnXzl',
                path: 'wsnXzl',
                component: () => import('@views/management/plait/income/wsnHouseMassage.vue'),
                meta: {
                  title: '多经收入-写字楼',
                  visible: true
                }
              },
              {
                name: 'wsn',
                path: 'wsn',
                component: () => import('@views/management/plait/income/wsn.vue'),
                meta: {
                  title: '多经收入-商业',
                  visible: true
                }
              },

              {
                name: 'otherCommissionRevenue',
                path: 'otherCommissionRevenue',
                component: () => import('@views/management/plait/income/otherCommissionRevenue.vue'),
                meta: {
                  title: '委托管理收入',
                  visible: true
                }
              },
              {
                name: 'rentManagementFee',
                path: 'rentManagementFee',
                component: () => import('@views/management/plait/income/rentManagementFee.vue'),
                meta: {
                  title: '委托管理收入',
                  visible: true
                }
              }, {
                name: 'parkingRevenue',
                path: 'parkingRevenue',
                component: () => import('@views/management/plait/income/parkingRevenue.vue'),
                meta: {
                  title: '停车场收入',
                  visible: true
                }
              }, {
                name: 'otherRevenue',
                path: 'otherRevenue',
                component: () => import('@views/management/plait/income/otherRevenue.vue'),
                meta: {
                  title: '其他业务类型收入',
                  visible: true
                }
              }, {
                name: 'consortiumIncome',
                path: 'consortiumIncome',
                component: () => import('@views/management/plait/income/consortiumIncome.vue'),
                meta: {
                  title: '联营收支明细',
                  visible: true
                }
              }, {
                name: 'otherIncome',
                path: 'otherIncome',
                component: () => import('@views/management/plait/income/otherIncome.vue'),
                meta: {
                  title: '其他收入',
                  visible: true
                }
              },
              {
                name: 'rentClearMessage',
                path: 'rentClearMessage',
                component: () => import('@views/management/plait/income/rentClearMessage.vue'),
                meta: {
                  title: '租费明细清欠',
                  visible: true
                }
              },
            ]
          },
          {
            name: 'disburse',
            path: 'disburse',
            redirect: '/management/plait/disburse/index',
            component: () => import('@views/management/plait/index.vue'),
            meta: {
              title: '费用支出',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/plait/disburse.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
              {
                name: 'wageWelfareFee',
                path: 'wageWelfareFee',
                component: () => import('@views/management/plait/disburse/wageWelfareFee.vue'),
                meta: {
                  title: '工资福利费',
                  visible: true
                }
              },
              {
                name: 'trainingFee',
                path: 'trainingFee',
                component: () => import('@views/management/plait/disburse/trainingFee.vue'),
                meta: {
                  title: '培训费',
                  visible: true
                }
              },
              {
                name: 'recruitmentFee',
                path: 'recruitmentFee',
                component: () => import('@views/management/plait/disburse/recruitmentFee.vue'),
                meta: {
                  title: '招聘费',
                  visible: true
                }
              },
              {
                name: 'administrativeExpenseBudget',
                path: 'administrativeExpenseBudget',
                component: () => import('@views/management/plait/disburse/administrativeExpenseBudget.vue'),
                meta: {
                  title: '行政费用',
                  visible: true
                }
              },
              {
                name: 'travelFee',
                path: 'travelFee',
                component: () => import('@views/management/plait/disburse/travelFee.vue'),
                meta: {
                  title: '差旅费',
                  visible: true
                }
              },
              {
                name: 'businessEntertainFee',
                path: 'businessEntertainFee',
                component: () => import('@views/management/plait/disburse/businessEntertainFee.vue'),
                meta: {
                  title: '业务招待费',
                  visible: true
                }
              },
              {
                name: 'invalidPurchase',
                path: 'invalidPurchase',
                component: () => import('@views/management/plait/disburse/invalidPurchase.vue'),
                meta: {
                  title: '非生产性资产采购',
                  visible: true
                }
              },
              {
                name: 'planningCostBudget',
                path: 'planningCostBudget',
                component: () => import('@views/management/plait/disburse/planningCostBudget.vue'),
                meta: {
                  title: '企划费明细',
                  visible: true
                }
              },
              {
                name: 'cleanHygieneBudget',
                path: 'cleanHygieneBudget',
                component: () => import('@views/management/plait/disburse/cleanHygieneBudget.vue'),
                meta: {
                  title: '清洁卫生费',
                  visible: true
                }
              },
              {
                name: 'cleanHygieneBudgetDetail',
                path: 'cleanHygieneBudgetDetail',
                component: () => import('@views/management/plait/disburse/cleanHygieneBudgetDetail.vue'),
                meta: {
                  title: '清洁卫生费明细',
                  visible: true
                }
              },
              {
                name: 'securityBudget',
                path: 'securityBudget',
                component: () => import('@views/management/plait/disburse/securityBudget.vue'),
                meta: {
                  title: '安全保卫费',
                  visible: true
                }
              },
              {
                name: 'securityBudgetDetail',
                path: 'securityBudgetDetail',
                component: () => import('@views/management/plait/disburse/securityBudgetDetail.vue'),
                meta: {
                  title: '安全保卫费明细',
                  visible: true
                }
              },
              {
                name: 'greeningCostBudget',
                path: 'greeningCostBudget',
                component: () => import('@views/management/plait/disburse/greeningCostBudget.vue'),
                meta: {
                  title: '绿化养护费',
                  visible: true
                }
              },
              {
                name: 'greeningCostBudgetDetail',
                path: 'greeningCostBudgetDetail',
                component: () => import('@views/management/plait/disburse/greeningCostBudgetDetail.vue'),
                meta: {
                  title: '绿化养护费明细',
                  visible: true
                }
              },
              {
                name: 'engineeringCostBudget',
                path: 'engineeringCostBudget',
                component: () => import('@views/management/plait/disburse/engineeringCostBudget.vue'),
                meta: {
                  title: '工程维保费',
                  visible: true
                }
              },
              {
                name: 'engineeringCostBudgetDetail',
                path: 'engineeringCostBudgetDetail',
                component: () => import('@views/management/plait/disburse/engineeringCostBudgetDetail.vue'),
                meta: {
                  title: '工程维保费明细',
                  visible: true
                }
              },
              {
                name: 'commonEnergyDetail',
                path: 'commonEnergyDetail',
                component: () => import('@views/management/plait/disburse/commonEnergyDetail.vue'),
                meta: {
                  title: '能耗明细',
                  visible: true
                }
              },
              {
                name: 'commonEnergySummary',
                path: 'commonEnergySummary',
                component: () => import('@views/management/plait/disburse/commonEnergySummary.vue'),
                meta: {
                  title: '能源汇总',
                  visible: true
                }
              },
              {
                name: 'depreciationFee',
                path: 'depreciationFee',
                component: () => import('@views/management/plait/disburse/depreciationFee.vue'),
                meta: {
                  title: '折旧费',
                  visible: true
                }
              },
              {
                name: 'financeFee',
                path: 'financeFee',
                component: () => import('@views/management/plait/disburse/financeFee.vue'),
                meta: {
                  title: '财务费用',
                  visible: true
                }
              },
              {
                name: 'rentalCost',
                path: 'rentalCost',
                component: () => import('@views/management/plait/disburse/rentalCost.vue'),
                meta: {
                  title: '整租租赁成本',
                  visible: true
                }
              },
              {
                name: 'otherCostFee',
                path: 'otherCostFee',
                component: () => import('@views/management/plait/disburse/otherCostFee.vue'),
                meta: {
                  title: '其他成本费用',
                  visible: true
                }
              },
              {
                name: 'projectReform',
                path: 'projectReform',
                component: () => import('@views/management/plait/disburse/projectReform.vue'),
                meta: {
                  title: '工程改造费',
                  visible: true
                }
              },
              {
                name: 'leasebackPay',
                path: 'leasebackPay',
                component: () => import('@views/management/plait/disburse/leasebackPay.vue'),
                meta: {
                  title: '返租支出',
                  visible: true
                }
              },
              {
                name: 'otherDisburse',
                path: 'otherDisburse',
                component: () => import('@views/management/plait/disburse/otherDisburse.vue'),
                meta: {
                  title: '其他支出',
                  visible: true
                }
              }
            ]
          },
          {
            name: 'summary',
            path: 'summary',
            redirect: '/management/plait/summary/index',
            component: () => import('@views/management/plait/index.vue'),
            meta: {
              title: '汇总',
              visible: true
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/plait/summary.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },

              {
                name: 'fundPlan',
                path: 'fundPlan',
                component: () => import('@views/management/plait/summary/fundPlan.vue'),
                meta: {
                  title: '资金计划',
                  visible: true
                }
              },
              {
                name: 'areaInfo',
                path: 'areaInfo',
                component: () => import('@views/management/plait/summary/areaInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'projectInfo',
                path: 'projectInfo',
                component: () => import('@views/management/plait/summary/projectInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'personInfo',
                path: 'personInfo',
                component: () => import('@views/management/plait/summary/personInfo.vue'),
                meta: {
                  title: '基础信息',
                  visible: true
                }
              },
              {
                name: 'mainTarget',
                path: 'mainTarget',
                component: () => import('@views/management/plait/summary/mainTarget.vue'),
                meta: {
                  title: '主要指标',
                  visible: true
                }
              },
              {
                name: 'rentpoints',
                path: 'rentpoints',
                component: () => import('@views/management/plait/summary/rentpoints.vue'),
                meta: {
                  title: '租费概况',
                  visible: true
                }
              },
              {
                name: 'staffCost',
                path: 'staffCost',
                component: () => import('@views/management/plait/summary/staffCost.vue'),
                meta: {
                  title: '人事费用概况',
                  visible: true
                }
              },
              {
                name: 'personSurvey',
                path: 'personSurvey',
                component: () => import('@views/management/plait/summary/personSurvey.vue'),
                meta: {
                  title: '人事费用概况',
                  visible: true
                }
              },
              {
                name: 'administrativeExpenseSurvey',
                path: 'administrativeExpenseSurvey',
                component: () => import('@views/management/plait/summary/administrativeExpenseSurvey.vue'),
                meta: {
                  title: '行政费用概况',
                  visible: true
                }
              },
              {
                name: 'projectCost',
                path: 'projectCost',
                component: () => import('@views/management/plait/summary/projectCost.vue'),
                meta: {
                  title: '企划费',
                  visible: true
                }
              },
              {
                name: 'energySurvey',
                path: 'energySurvey',
                component: () => import('@views/management/plait/summary/energySurvey.vue'),
                meta: {
                  title: '能耗费概况',
                  visible: true
                }
              },
              {
                name: 'propertyPaymentStatistics',
                path: 'propertyPaymentStatistics',
                component: () => import('@views/management/plait/summary/propertyPaymentStatistics.vue'),
                meta: {
                  title: '地产支付物业款项统计',
                  visible: true
                }
              },
              {
                name: 'propertyDeliveryStatistics',
                path: 'propertyDeliveryStatistics',
                component: () => import('@views/management/plait/summary/propertyDeliveryStatistics.vue'),
                meta: {
                  title: '物业新增交房统计',
                  visible: true
                }
              },
              {
                name: 'wsngk',
                path: 'wsngk',
                component: () => import('@views/management/plait/summary/wsngk.vue'),
                meta: {
                  title: '多经概况',
                  visible: true
                }
              },
              {
                name: 'overviewPropertyManagement',
                path: 'overviewPropertyManagement',
                component: () => import('@views/management/plait/summary/overviewPropertyManagement.vue'),
                meta: {
                  title: '物业多经概况',
                  visible: true
                }
              },
            ]
          }
        ]
      },
      {
        name: 'read',
        path: 'read',
        redirect: '/management/read/shouru',
        component: () => import('@views/management/read/index.vue'),
        meta: {
          title: '预算执行',
          visible: true,
          breadcrumbVisible: false
        },
        children: [
          {
            name: 'shouru',
            path: 'shouru',
            redirect: '/management/read/shouru/index',
            component: () => import('@views/management/read/index.vue'),
            meta: {
              title: '总收入',
              visible: false
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/read/shouru.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
            ]
          },
          {
            name: 'feiyong',
            path: 'feiyong',
            redirect: '/management/read/feiyong/index',
            component: () => import('@views/management/read/index.vue'),
            meta: {
              title: '经营费用',
              visible: false
            },
            children: [
              {
                name: 'index',
                path: 'index',
                component: () => import('@views/management/read/feiyong.vue'),
                meta: {
                  title: '列表',
                  visible: false
                }
              },
            ]
          }
        ]
      }
    ]
  }
]
