import store from "@/store";
import { formatNumber } from "utils/utils";

let enumList = store.getters.enumList;

// 项目
export const ProjectOptions = enumList.projectDict;
//  tabs 切换
export const TabsConfig = [
  { key: "existingBussinessInfoVoList", label: "现有合同" },
  { key: "zsPlanMerchantVoList", label: "招商中" },
  { key: "histroyBussinessInfoVoList", label: "历史合同" },
];
// 合同信息
export function getContractConfig() {
  return [
    {
      key: "contNo",
      label: "合同编号",
      type: "custom",
      isLink: true,
      click: (...props) => {
        this.handleContractCode(...props);
      },
      width: 15,
    },
    { key: "cooperativeBrand", label: "品牌", type: "custom", width: 20 },
    { key: "contPeriod", label: "合同起止日期", type: "custom", width: 25 },
    { key: "rentYears", label: "租期", type: "custom", width: 15 },
    { key: "payWay", label: "租金方式", type: "custom", width: 10 },
    { key: "payCycleCd", label: "租金支付周期", type: "custom", width: 15 },

    {
      key: "paymentCycleCd",
      label: "物管费支付周期",
      type: "custom",
      width: 15,
    },
    {
      key: "rentAchievementRate",
      label: "租金达成率(标准)",
      type: "rate",
      width: 20,
      autoChangeColor: true,
    },
    {
      key: "propertyManagementFeeAchievementRate",
      label: "物管费达成率(标准)",
      type: "rate",
      width: 25,
      autoChangeColor: true,
    },
    {
      key: "totalSales",
      label: "销售总额(万元)",
      type: "ten-thousand",
      width: 15,
      isLink: true,
      click: (...props) => {
        this.handleContractSale(...props);
      },
    },
    {
      key: "rentToSale",
      label: "租售比",
      type: "rate",
      width: 10,
      autoChangeColor: true,
    },
    { key: "arrears", label: "欠费金额(元)", width: 15, status: "error" },
  ];
}

// 对比信息
export function getTableConfig() {
  return [
    {
      key: "key1",
      label: "",
      type: "custom",
      render: (h, scope) => {
        return <span style="font-weight: bold;">{scope.row.key1}</span>;
      },
    },
    {
      key: "key2",
      label: "标准",
      type: "custom",
      render: (h, scope) => {
        if (scope.$index === 0 || scope.$index === 5) {
          return <div>{scope.row.key2}</div>;
        } else {
          return (
            <el-link
              underline={false}
              type="primary"
              onClick={() => this.handleTableClick(scope)}
            >
              {formatNumber(scope.row.key2)}
            </el-link>
          );
        }
      },
    },
    {
      key: "key3",
      label: "实际",
      type: "custom",
      render: (h, scope) => {
        if (scope.$index === 0 || scope.$index === 5) {
          return <div>{scope.row.key3}</div>;
        } else {
          return (
            <el-link
              underline={false}
              type="primary"
              onClick={() => this.handleTableClick(scope)}
            >
              {formatNumber(scope.row.key3)}
            </el-link>
          );
        }
      },
    },
  ];
}

// 进度信息
export function getProgressConfig() {
  return [
    { label: "意向", key: "key1", time: "2021-09-01" },
    { label: "商务", key: "key2", time: "2021-09-01" },
    { label: "合同", key: "key3", time: "2021-09-01" },
    { label: "双签", key: "key4", time: "2021-09-01" },
    { label: "一店一色", key: "key5", time: "2021-09-01" },
    { label: "装修", key: "key6", time: "2021-09-01" },
    { label: "开业", key: "key7", time: "2021-09-01" },
    {
      label: "解约",
      key: "key8",
      click: (data) => this.handleProgressClick(data),
      time: "2021-09-01",
    },
  ];
}

// 操作
export const ButtonArr = [
  { label: "商户管理", key: 1, include: [1, 3] },
  { label: "服务管理", key: 2, include: [1, 3] },
  { label: "财务操作", key: 3, include: [1, 2, 3] },
  { label: "收款管理", key: 4, include: [1, 2, 3] },
  { label: "付款管理", key: 5, include: [1, 2, 3] },
  { label: "付款核销", key: 6, include: [1, 3] },
];

const formatTableCell = (h, scope) => {
  const curYear = new Date().getFullYear();
  if (curYear == scope.row.year && scope.row[scope.column.property] === null) {
    return "";
  } else {
    return formatNumber(scope.row[scope.column.property], "ten-thousand");
  }
};

// 合同信息  销售总额
export const SaleTableConfig = [
  {
    key: "year",
    label: "年份",
    width: "60px",
  },
  {
    key: "total",
    label: "合计",
    type: "ten-thousand",
    props: {
      style: {
        fontWeight: "bold",
      },
    },
  },
  {
    key: "january",
    label: "1月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "february",
    label: "2月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "march",
    label: "3月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "april",
    label: "4月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "may",
    label: "5月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "june",
    label: "6月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "july",
    label: "7月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "august",
    label: "8月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "september",
    label: "9月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "october",
    label: "10月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "november",
    label: "11月",
    type: "custom",
    render: formatTableCell,
  },
  {
    key: "december",
    label: "12月",
    type: "custom",
    render: formatTableCell,
  },
];

// 对比信息 租金单价 弹窗
export const RentTableConfig = [
  { key: "period", label: "", width: "200" },
  { key: "standardPrice", label: "标准", type: "money" },
  { key: "actualPrice", label: "实际", type: "money" },
];
// 对比信息 租金合计 弹窗
export const RentTotalTableConfig = [
  { key: "period", label: "账期（权责口径）", width: "280px" },
  { key: "rentLastPayDate", label: "应付日期" },
  { key: "standardMoney", label: "标准", type: "money" },
  { key: "actualMoney", label: "实际", type: "money" },
  {
    key: "payStatus",
    label: "支付状态",
    type: 'custom',
    render: (h, scope) => {
      let color = "#050101";
      if (scope.row.payStatus == "未支付") color = "#6f120c";
      return <span style={{'color': color}}>{scope.row.payStatus}</span>;
    },
  },
];
