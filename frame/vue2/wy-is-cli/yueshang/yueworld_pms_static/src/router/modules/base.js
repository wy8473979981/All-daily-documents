/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
const baseRouter = {
  name: 'Base',
  title: '基础数据',
  children: [
    {
      name: 'Project',
      title: '项目信息',
      children: [
        {
          name: 'RegionMaintain',
          title: '区域维护'
        },
        {
          name: 'CityMaintain',
          title: '城市维护'
        },
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
          name: 'ShopsMaintain',
          title: '商铺维护'
        },
        {
          name: 'ShopsModifyMaintain',
          title: '商铺面积变更列表'
        },
        {
          name: 'OpenCloseShopsList',
          title: '拆合铺'
        },
        {
          name: 'OpenCloseShopsAdd',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          parentName: 'OpenCloseShopsList',
          title: '拆合铺新增'
        },
        {
          name: 'OpenCloseShopsDetail',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          parentName: 'OpenCloseShopsList',
          title: '拆合铺详情'
        },
        {
          name: 'ShopOnePrice',
          title: '一铺一价'
        },
        {
          name: 'ShopOnePriceAuditList',
          title: '一铺一价审批'
        },
        {
          name: 'ShopOnePriceAuditDetail',
          parentName: 'ShopOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '一铺一价详情'
        },
        {
          name: 'ShopOnePriceAuditEdit',
          parentName: 'ShopOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '一铺一价编辑'
        }
      ]
    },
    {
      name: 'MoreBusiness',
      title: '多经信息',
      children: [
        {
          name: 'PointInfoList',
          title: '点位信息'
        },
        {
          name: 'BusinessShopOnePrice',
          title: '多经一铺一价'
        },
        {
          name: 'BusinessShopOnePriceAuditList',
          title: '多经一铺一价审批'
        },
        {
          name: 'BusinessShopOnePriceAuditDetail',
          parentName: 'BusinessShopOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '多经一铺一价审批详情'
        },
        {
          name: 'BusinessShopOnePriceAuditEdit',
          parentName: 'BusinessShopOnePriceAuditList',
          hidden: true, // 是否在左侧菜单显示，子页面用过true
          title: '多经一铺一价审批编辑'
        }

      ]
    },
    {
      name: 'BrandTenant',
      title: '品牌商家',
      children: [
        {
          name: 'BrandLibrary',
          title: '品牌库'
        },
        {
          name: 'BrandLibraryChange',
          title: '品牌变更列表'
        },
        {
          name: 'TenantLibrary',
          title: '商家库'
        },
        {
          name: 'TenantLibraryChange',
          title: '商家变更列表'
        }
      ]
    },
    {
      name: 'BgConfig',
      title: '后台配置',
      children: [
        {
          name: 'ConfigCode',
          title: '编码规则配置'
        }
      ]
    },
    {
      name: 'HolidayCalendar',
      title: '节假日日历',
      children: [
        {
          name: 'HolidayCalendar',
          title: '节假日日历'
        }
      ]
    },
    {
      name: 'AttractInvestmentConfig',
      title: '招商配置',
      children: [
        {
          name: 'FormatConfig',
          title: '业态配置'
        }
      ]
    }
  ]
}
export default baseRouter
