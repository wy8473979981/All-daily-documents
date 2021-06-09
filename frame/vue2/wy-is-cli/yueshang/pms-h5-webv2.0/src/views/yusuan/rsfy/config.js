
export const columns = [
  {
    label: "类别",
    key: "feeType",
    width: "1.6rem",
    align: "left",
  },
  {
    label: "2020年度预计发生额",
    key: "currentYearFee",
    width: "4rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: "2021年度预算合计",
    key: "nextYearBudget",
    width: "4rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
  },
  {
    label: "增长率",
    key: "increase",
    width: "2.6667rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
    unit: "%",
  },
  {
    label: "与利润表核对",
    key: "profitCompare",
    width: "4rem",
    align: "right",
    numberPrecision: 2,
    numberFormat: true,
  },
];
