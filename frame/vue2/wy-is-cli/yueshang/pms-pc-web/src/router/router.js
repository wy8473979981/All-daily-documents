const RouterList = [
  {
    title: "运营管理",
    show: false,
    children: [
      // 开业率 模块开始
      {
        title: "开业率",
        show: false,
        path: "OpeningRate",
        children: [
          {
            name: "RankingOfHeadquarters",
            path: "or-ranking-headquarters",
            title: "开业率排名(总部)",
            sortIndex: 1,
          },
          {
            name: "SummaryOfHeadquarters",
            path: "or-summary-headquarters",
            title: "开业率汇总排名(总部)",
            sortIndex: 2,
          },
          {
            name: "RankingOfProject",
            path: "or-ranking-project",
            title: "开业率排名(项目)",
            sortIndex: 3,
          },
          {
            name: "SummaryOfProject",
            path: "or-summary-project",
            title: "开业率汇总排名(项目)",
            sortIndex: 4,
          },
          {
            name: "FloorOfProject",
            path: "or-floor-project",
            title: "开业率楼层明细(项目)",
            sortIndex: 5,
          },
          {
            name: "AreaOfProject",
            path: "or-area-project",
            title: "开业率面积明细(项目)",
            sortIndex: 6,
          },
          {
            name: "CheckOfProject",
            path: "or-check-project",
            title: "考核开业面积明细(项目)",
            sortIndex: 7,
          },
          {
            name: "RentOfProject",
            path: "or-rent-project",
            title: "押不低租面积明细(项目)",
            sortIndex: 8,
          },
        ],
      },
      // 开业率 模块开始

      // 出租率 模块开始
      {
        title: "出租率",
        show: false,
        path: "LeaseRate",
        children: [
          {
            title: "出租率排名(总部)",
            name: "LeaseOfHeadquarters",
            path: "lr-lease-headquarters",
            sortIndex: 1,
          },
          {
            title: "出租率排名(项目汇总)",
            name: "ReportOfProject",
            path: "lr-report-project",
            sortIndex: 2,
          },
          {
            title: "项目总面积明细",
            name: "AreaOfProject",
            path: "lr-area-project",
            sortIndex: 3,
          },
          {
            title: "项目出租面积明细",
            name: "RealseareaOfProject",
            path: "lr-realsearea-project",
            sortIndex: 4,
          },
          {
            title: "项目考核出租面积明细",
            name: "CheckOfProject",
            path: "lr-check-project",
            sortIndex: 5,
          },
          {
            title: "项目押不抵租面积明细",
            name: "RentOfProject",
            path: "lr-rent-project",
            sortIndex: 6,
          },
        ],
      },
      // 出租率 模块结束

      // 销售额 模块开始
      {
        title: "销售额",
        show: false,
        path: "SalesVolume",
        children: [
          {
            title: "销售排名(总部)",
            name: "RankingOfHeadquarters",
            path: "sv-ranking-headquarters",
            sortIndex: 1,
          },
          {
            title: "销售分析(项目)",
            name: "AnalysisOfProject",
            path: "sv-analysis-project",
            sortIndex: 2,
          },
        ],
      },
      // 销售额 模块结束

      // 客流 模块开始
      {
        title: "客流",
        show: false,
        path: "PassengerFlow",
        children: [
          {
            title: "客流排名(总部)",
            name: "RankingOfHeadquarters",
            path: "pf-ranking-headquarters",
            sortIndex: 1,
          },
          {
            title: "客流分析(项目)",
            name: "AnalysisOfProject",
            path: "pf-analysis-project",
            sortIndex: 2,
          },
          {
            title: "日客流(项目)",
            name: "DailyOfProject",
            path: "pf-daily-project",
            sortIndex: 3,
          },
        ],
      },
      // 客流 模块结束

      // 收入 模块开始
      {
        title: "收入",
        show: false,
        path: "Income",
        children: [
          {
            title: "租金收缴率(总部)",
            name: "RentOfHeadquarters",
            path: "income-rent-headquarters",
            sortIndex: 1,
          },
          {
            title: "物管收缴率(总部)",
            name: "PropertyManagementOfHeadquarters",
            path: "income-properymanagement-headquarters",
            sortIndex: 2,
          },
          {
            title: "租金收缴率(项目)",
            name: "RentOfProject",
            path: "income-rent-project",
            sortIndex: 3,
          },
          {
            title: "物管收缴率(项目)",
            name: "PropertyManagementOfProject",
            path: "income-properymanagement-project",
            sortIndex: 4,
          },
          {
            title: "欠费查询",
            name: "ArrearsOfProject",
            path: "income-arrears-project",
            sortIndex: 5,
          },
        ],
      },
      // 收入 模块结束

      // 平均租金 模块开始
      {
        title: "平均租金",
        show: false,
        path: "AverageRent",
        children: [
          {
            title: "平均租金(总部)",
            name: "AverageOfHeadquarters",
            path: "ar-average-headquarters",
            sortIndex: 1,
          },
          {
            title: "平均租金(项目)",
            name: "AverageOfProject",
            path: "ar-average-project",
            sortIndex: 2,
          },
        ],
      },
      // 平均租金 模块结束

      // 责任铺分工 模块开始
      {
        title: "责任铺",
        show: false,
        path: "DutyShop",
        children: [
          {
            title: "责任铺分工更新报表",
            name: "DutyShopDivisionOfLabor",
            path: "ds-division-labor",
            sortIndex: 1,
          },
        ],
      },
      // 责任铺分工 模块结束

      // 租赁平台 模块开始
      {
        title: "租赁平台",
        show: false,
        path: "RentalPlatform",
        children: [
          {
            title: "租赁平台",
            name: "RentalPlatformOfMain",
            path: "rp-rental-platform-main",
            sortIndex: 1,
          },
          {
            title: "租赁平台",
            name: "RentalPlatformOfMainDetail",
            path: "rp-rental-platform-main-detail",
            sortIndex: 2,
          },
        ],
      },
      // 租赁平台 模块结束

      // 招商报表 模块开始
      {
        title: "招商报表",
        show: false,
        path: "BusinessReportForm",
        children: [
          {
            title: "招商报表",
            name: "BusinessReportFormList",
            path: "brf-list",
            sortIndex: 1,
          },
        ],
      },
      // 招商报表 模块结束

      // 在线签约 模块开始
      {
        title: "在线签约",
        show: false,
        path: "OnlineSigning",
        children: [
          {
            title: "在线签约",
            name: "OnlineSigningOfLaunch",
            path: "os-online-signing-launch",
            sortIndex: 1,
          },
          {
            title: "指定签署位置",
            name: "OnlineSigningOfPosition",
            path: "os-online-signing-position",
            sortIndex: 2,
          },
        ],
      },
      // 在线签约 模块结束
    ],
  },
];

export default RouterList;
