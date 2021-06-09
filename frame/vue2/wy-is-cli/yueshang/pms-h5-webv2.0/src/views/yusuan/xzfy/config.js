export const columns = [
  {
    label: "类别",
    key: "category",
    width: "2.67rem",
    align: "left",
  },
  {
    label: "费项",
    key: "costItem",
    width: "2.6667rem",
    align: "left",
  },
  {
    label: "2020年度预计发生额",
    key: "estimateQuota",
    width: "3.77777rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: "2021年度预算合计",
    key: "expectTotal",
    width: "3.66666rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: "增长率",
    key: "growthRate",
    width: "2.6667rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
    unit: "%",
  },
];