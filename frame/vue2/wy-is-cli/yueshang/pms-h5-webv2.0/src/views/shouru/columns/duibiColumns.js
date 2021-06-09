// 租金收入、物管收入 - 月 - 表头
const yueColumns = [
    {
        key: "name",
    },
    {
        label: "应收(万)",
        key: "contMustMoney",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "收入(万)",
        key: "fixedFactMoney",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "收缴率(合同)",
        key: "fixedContCollectionRate",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "环比",
        key: "contCollectionRateHb",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "contCollectionRateTb",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "收缴率(权责)",
        key: "fixedQzCollectionRate",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "环比",
        key: "fixedQzCollectionRateHb",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "fixedQzCollectionRateTb",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "月预算完成进度",
        key: "fixedQzCompletionRate",
        numberFormat: true,
        numberPrecision: 2,
    },
]
// 租金收入、物管收入 - 年 - 表头
const nianColumns = [
    {
        key: "name",
    },
    {
        label: "应收(万)",
        key: "contMustMoneyYtd",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "收入(万)",
        key: "fixedFactMoneyYtd",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "收缴率(合同)",
        key: "fixedContCollectionRateYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "环比",
        key: "contCollectionRateHbYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "qcontCollectionRateHbYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "收缴率(权责)",
        key: "fixedQzCollectionRateYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "环比",
        key: "fixedQzCollectionRateHbYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "fixedQzCollectionRateTbYtd",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "年预算完成进度",
        key: "fixedQzCompletionRateYtd",
        numberFormat: true,
        numberPrecision: 2,
    },
]

export { yueColumns, nianColumns };