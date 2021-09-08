/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
const baseRouter = {
  name: 'BaseOffices',
  title: '基础数据写字楼',
  children: [
    {
      name: 'Office',
      title: '写字楼管理',
      children: [
        {
          name: 'ProjectMaintain',
          title: '项目维护'
        },
        {
          name: 'BuildingMaintain',
          title: '楼栋维护'
        },
        {
          name: 'FloorMaintain',
          title: '楼层维护'
        },
        {
          name: 'OfficeUnitMaintain',
          title: '租赁单元'
        },
        {
          name: 'OfficeUnitModifyMaintain',
          title: '租赁单元面积变更列表'
        },
        {
          name: 'OpenCloseOfficesList',
          title: '拆合铺'
        },
        {
          name: 'OpenCloseOfficesAdd',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          parentName: 'OpenCloseOfficesList',
          title: '拆合铺新增'
        },
        {
          name: 'OpenCloseOfficesDetail',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          parentName: 'OpenCloseOfficesList',
          title: '拆合铺详情'
        },
        {
          name: 'OfficesOnePrice',
          title: '一铺一价'
        },
        {
          name: 'OfficesOnePriceAuditList',
          title: '一铺一价审批'
        },
        {
          name: 'OfficesOnePriceAuditDetail',
          parentName: 'OfficesOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '一铺一价审批详情'
        },
        {
          name: 'OfficesOnePriceAuditEdit',
          parentName: 'OfficesOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '一铺一价审批编辑'
        },
        {
          name: 'EnterpriseLibrary',
          title: '企业库'
        },
        {
          name: 'EnterpriseLibraryChange',
          title: '企业库变更列表'
        }
      ]
    }
  ]
}
export default baseRouter
