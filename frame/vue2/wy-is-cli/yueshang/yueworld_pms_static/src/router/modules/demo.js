/*
 * @Author: xyb
 * @Description: Demo 迁移 iframe嵌套
 */

const demoRouter = [
  {
    name: 'ServiceManage',
    title: '服务管理',
    redirect: '/Acceptance/Confirm',
    children: [
      {
        title: '服务受理',
        name: 'Acceptance',
        redirect: '/Acceptance/Confirm',
        children: [
          {
            title: '日常确认',
            name: 'Confirm'
          }
        ]
      },
      {
        title: '工程报修',
        name: 'EngineeringRepairReport',
        redirect: '/EngineeringRepairReport/Engineering',
        children: [
          {
            title: '工程报修',
            name: 'Engineering'
          }
        ]
      },
      {
        title: '投诉管理',
        name: 'ComplaintManage',
        redirect: '/ComplaintManage/Complaint',
        children: [
          {
            title: '投诉管理',
            name: 'Complaint'
          }
        ]
      },
      {
        title: '活动报名',
        name: 'ActivityRegistration',
        redirect: '/ActivityRegistration/Activity',
        children: [
          {
            title: '活动报名',
            name: 'Activity'
          }
        ]
      },
      {
        title: '消息公告',
        name: 'MessageAnnouncement',
        redirect: '/MessageAnnouncement/MessageList',
        children: [
          {
            title: '消息列表',
            name: 'MessageList'
          }
        ]
      },
      {
        title: '租户员工',
        name: 'TenantStaff',
        redirect: '/TenantStaff/Tenant',
        children: [
          {
            title: '租户员工',
            name: 'Tenant'
          }
        ]
      },
      {
        title: '服务配置',
        name: 'ServiceConfiguration',
        redirect: '/EngineeringRepairReport/EngineeringRepairReport',
        children: [
          {
            title: '审核配置',
            name: 'AuditConfiguration'
          },
          {
            title: '投诉配置',
            name: 'ComplaintConfiguration'
          },
          {
            title: '参数配置',
            name: 'ParameterConfiguration'
          }
        ]
      }
    ]
  },
  {
    title: '工程物业',
    name: 'EngineeringProperty',
    redirect: '/EngineeringManage/MaintenancePlan',
    children: [
      {
        title: '工程管理',
        name: 'EngineeringManage',
        redirect: '/EngineeringManage/MaintenancePlan',
        children: [
          {
            title: '维保计划',
            name: 'MaintenancePlan'
          },
          {
            title: '设备',
            name: 'Equipment'
          }
        ]
      },
      {
        title: '水电表录入',
        name: 'Hydropower',
        redirect: '/Hydropower/HydropowerEnter',
        children: [
          {
            title: '水电表录入',
            name: 'HydropowerEnter'
          }
        ]
      },
      {
        title: '水电费录入',
        name: 'Electricity',
        redirect: '/Electricity/ElectricityEnter',
        children: [
          {
            title: '水电费录入',
            name: 'ElectricityEnter'
          }
        ]
      },
      {
        title: '物料管理',
        name: 'MaterialManage',
        redirect: '/MaterialManage/WarehouseData',
        children: [
          {
            title: '仓库资料',
            name: 'WarehouseData'
          },
          {
            title: '物料资料',
            name: 'MaterialData'
          },
          {
            title: '入库单',
            name: 'WarehousingOrder'
          },
          {
            title: '出库单',
            name: 'OutboundOrder'
          }
        ]
      }
    ]
  },
  {
    title: 'SVG管理',
    name: 'SVG',
    redirect: '/SVGPlan/Plan',
    children: [
      {
        title: 'SVG平面图',
        name: 'SVGPlan',
        redirect: '/SVGPlan/Plan',
        children: [
          {
            title: 'SVG平面图',
            name: 'Plan'
          }
        ]
      },
      {
        title: 'SVG管理',
        name: 'SVGManage',
        redirect: '/SVGManage/Manage',
        children: [
          {
            title: 'SVG管理',
            name: 'Manage'
          }
        ]
      }
    ]
  }
]

export default demoRouter

