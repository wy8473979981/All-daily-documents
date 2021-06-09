const columns = [
    {
        label: "排名",
        width: "1.3rem",
        align: "left"
    },
    {
        label: "项目",
        key: "projectName",
        color: "#3992BA",
        align: "left",
        width: "2rem",
    },
    {
        label: "新增会员数(万人)",
        key: "registerMemberNum",
        width: "3.2667rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "消费会员数(万人)",
        key: "consumeMemberNum",
        width: "3.2667rem",
        sortable: true,
        align: "right",
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
    {
        label: "消费金额(万元)",
        key: "consumeMoneyNum",
        width: "3.2667rem",
        sortable: true,
        align: "right",
        // unit: '%',
        numberFormat: true,
        changeNum: 1000000,
        numberPrecision: 2,
    },
    {
        label: "活跃会员数(万人)",
        key: "activeMemberNum",
        width: "3.2667rem",
        sortable: true,
        align: "right",
        // unit: '%',
        numberFormat: true,
        changeNum: 10000,
        numberPrecision: 2,
    },
]



export { columns };