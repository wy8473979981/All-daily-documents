const operateManagementRouter = {
  name: 'OperationManagement',
  title: '营运管理',
  redirect: '/ContractManage/StandingBook',
  children: [
    {
      title: '合同管理',
      name: 'ContractManage',
      redirect: '/ContractManage/StandingBook',
      children: [
        {
          name: 'StandingBook',
          title: '合同台账'
        },
        {
          name: 'StandingBookDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '合同台账详情',
          parentName: 'StandingBook'
        },
        {
          name: 'ContractChange',
          title: '合同变更'
        },
        {
          name: 'ContractChangeTermAdd',
          hidden: true, // 是否在左侧菜单显示
          title: '合同条款变更新增',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangeReceivableAdd',
          hidden: true, // 是否在左侧菜单显示
          title: '合同应收调整新增',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangeReceivableDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '合同应收调整详情',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangeAdditionTermAdd',
          hidden: true, // 是否在左侧菜单显示
          title: '补充条款变更新增',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangeAdditionTermDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '补充条款变更详情',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangeDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '合同变更详情',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractChangePreview',
          hidden: true, // 是否在左侧菜单显示
          title: '合同变更预览',
          parentName: 'ContractChange'
        },
        {
          name: 'ContractTermination',
          title: '合同解约'
        },
        {
          name: 'ContractTerminationAdd',
          hidden: true, // 是否在左侧菜单显示
          title: '合同解约新增',
          parentName: 'ContractTermination'
        },
        {
          name: 'ContractTerminationDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '合同解约详情',
          parentName: 'ContractTermination'
        },
        {
          name: 'Withdraw',
          title: '撤场清算'
        },
        {
          name: 'WithdrawAdd',
          hidden: true, // 是否在左侧菜单显示
          title: '撤场清算新增',
          parentName: 'Withdraw'
        },
        {
          name: 'WithdrawDetail',
          hidden: true, // 是否在左侧菜单显示
          title: '撤场清算详情',
          parentName: 'Withdraw'
        }
      ]
    },
    {
      title: '销售额管理',
      name: 'SalesVolume',
      redirect: '/SalesVolume/SalesVolumeBook',
      children: [
        {
          name: 'SalesVolumeBook',
          title: '销售额填报'
        },
        {
          name: 'SalesTargetImport',
          title: '销售目标录入'
        },
        {
          name: 'SalesVolumeBookByDay',
          title: '销售额填报按日',
          hidden: true,
          parentName: 'SalesVolumeBook'
        }
      ]
    },
    {
      title: '客流管理',
      name: 'PassengerFlowManage',
      redirect: '/PassengerFlowManage/PassengerFlowBook',
      children: [
        {
          name: 'PassengerFlowBook',
          title: '客流数据填报'
        },
        {
          name: 'PassengerFlowTarget',
          title: '客流目标录入'
        }
      ]
    },
    {
      title: '车流管理',
      name: 'TrafficFlowManagement',
      redirect: '/TrafficFlowManagement/TrafficFlowData',
      children: [
        {
          name: 'TrafficFlowData',
          title: '车流数据填报'
        },
        {
          name: 'TrafficFlowTarget',
          title: '车流目标录入'
        }
      ]
    },
    {
      name: 'Operation',
      title: '营运报表',
      redirect: '/Operation/TurnoverOfDaily',
      children: [
        {
          title: '营业额日报',
          name: 'TurnoverOfDaily'
        },
        {
          title: '商铺经营情况',
          name: 'ShopOperation'
        },
        {
          title: '客流销售日报',
          name: 'PassengerFlowSalesOfDaily'
        },
        {
          title: '营业额周报',
          name: 'TurnoverOfWeekly'
        },
        {
          title: '营业额月报',
          name: 'TurnoverOfMonthly'
        },
        {
          title: '月客流',
          name: 'PassengerFlowOfMonthly'
        },
        {
          title: '日客流',
          name: 'PassengerFlowOfDaily'
        },
        {
          title: '客流销售汇总',
          name: 'SaleOfSummary'
        }
      ]
    }
  ]
}

export default operateManagementRouter
