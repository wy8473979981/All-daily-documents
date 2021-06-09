const yearColumns = [
    {
        key: "projectName",
    },
    {
        label: "客流密度",
        key: "passengerFlowDensity",
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "客流(万人)",
        key: "passengerFlow",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "growth",
        unit: "%",
        numberPrecision: 2,
    },
    {
        label: "达成率",
        key: "achievementRate",
        unit: "%",
        numberPrecision: 2,
    },
];
const monthColumns = [
    {
        key: "projectName",
    },
    {
        label: "客流密度",
        key: "passengerFlowDensity",
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "客流(万人)",
        key: "passengerFlow",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "同比",
        key: "growth",
        unit: "%",
        numberPrecision: 2,
    },
    {
        label: "达成率",
        key: "achievementRate",
        unit: "%",
        numberPrecision: 2,
    },
];
const dayColumns = [
    {
        key: "projectName",
    },
    {
        label: "当日客流(万)",
        key: "todayPassengerFlow",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "昨日客流(万)",
        key: "yesterdayPassengerFlow",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "昨日环比",
        key: "growth",
        unit: '%',
        numberFormat: true,
        numberPrecision: 2,
    },
];

export { yearColumns, monthColumns, dayColumns }