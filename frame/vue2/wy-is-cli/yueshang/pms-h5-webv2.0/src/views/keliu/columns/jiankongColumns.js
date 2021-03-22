const columns = [
    {
        label: "日",
        key: "date",
        sortable: true,
        width: "2.6rem",
        align: "right"
    },
    {
        label: "实际客流",
        key: "actualFlow",
        sortable: true,
        width: "2.2rem",
        align: "right",
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        label: "指标",
        sortable: true,
        key: "budgetFlow",
        width: "1.6rem",
        align: "right",
        numberFormat: true,
        numberPrecision: 2,
    },
    {
        sortable: true,
        label: "达成率",
        key: "achievementRate",
        width: "1.9rem",
        align: "right",
        unit: "%",
        numberPrecision: 2,
    }
]

export { columns }