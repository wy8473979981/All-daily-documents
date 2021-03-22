// 租金欠费、物管欠费 - 月、年 - 表头
const listColumns = [
    {
        label: "序号",
        width: "1.2rem",
    },
    {
        label: "项目",
        key: "name",
        color: "#3992BA",
        align: "left",
        width: "2rem",
    },
    {
        label: "历史欠费(权责)",
        key: "historyOweFeeQz",
        width: "3.4rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "历史欠费(合同)",
        key: "historyOweFeeCont",
        width: "3.4rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "欠费(权责)",
        key: "oweFeeQz",
        width: "2.6rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "欠费(合同)",
        key: "oweFeeCont",
        width: "2.6rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "清欠率(权责)",
        key: "debtQzClearRate",
        width: "3rem",
        sortable: true,
        align: "right",
        unit: '%',
        numberPrecision: 2,
    },
    {
        label: "清欠率(合同)",
        key: "debtContClearRate",
        width: "3rem",
        sortable: true,
        align: "right",
        unit: '%',
        numberPrecision: 2,
    },
]


// 租金欠费、物管欠费--详情 - 月、年 - 表头
const detailColumns = [
    {
        label: "序号",
        width: "1.2rem",
    },
    {
        label: "商家名",
        key: "name",
        color: "#3992BA",
        align: "left",
        width: "2.9333rem",
    },
    {
        label: "历史欠费(权责)",
        key: "historyOweFeeQz",
        width: "3.4rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "历史欠费(合同)",
        key: "historyOweFeeCont",
        width: "3.4rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "欠费(权责)",
        key: "oweFeeQz",
        width: "2.6rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "欠费(合同)",
        key: "oweFeeCont",
        width: "2.6rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
		color:"#FF4954"
    },
    {
        label: "清欠率(权责)",
        key: "debtQzClearRate",
        width: "3rem",
        sortable: true,
        align: "right",
        unit: '%',
        numberPrecision: 2,
    },
    {
        label: "清欠率(合同)",
        key: "debtContClearRate",
        width: "3rem",
        sortable: true,
        align: "right",
        unit: '%',
        numberPrecision: 2,
    },
]



export { listColumns, detailColumns };