export function TableConfig() {
  return [
    {
      key: "projectName",
      label: "项目",
      minWidth: 120,
      sortable: "custom",
      fixed: true,
    },
    {
      key: "storeNo",
      label: "铺位号",
      minWidth: 120,
      sortable: "custom",
    },
    {
      key: "insertType",
      label: "操作类型",
      width: 100,
      sortable: "custom",
    },
    {
      key: "a",
      label: "修改前",
      children: [
        {
          key: "oldDivisionName",
          label: "责任人",
          minWidth: 100,
          sortable: "custom",
        },
        {
          key: "oldCentName",
          label: "责任部门",
          minWidth: 120,
          sortable: "custom",
        },
      ],
    },
    {
      key: "b",
      label: "修改后",
      children: [
        {
          key: "newDivisionName",
          label: "责任人",
          minWidth: 100,
          sortable: "custom",
        },
        {
          key: "newCentName",
          label: "责任部门",
          minWidth: 120,
          sortable: "custom",
        },
      ],
    },
    {
      key: "creatorName",
      label: "操作人",
      minWidth: 100,
      sortable: "custom",
    },
    {
      key: "createdDate",
      label: "操作时间",
      minWidth: 140,
      sortable: "custom",
    },
  ]
}

export const TableData = [
  {
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "",
    newCentName: "苏皖区域",
    projectName: "",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "",
    newCentName: "苏皖区域",
    projectName: "永康商业公司",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "总部1",
    newCentName: "苏皖区域",
    projectName: "",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "",
    newCentName: "苏皖区域",
    projectName: "",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "总部12",
    newCentName: "苏皖区域",
    projectName: "永康商业公司",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "总部322",
    newCentName: "苏皖区域",
    projectName: "永康商业公司",
    insertType: "修改",
    creatorName: "PD问题反馈管理员",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "总部",
    newCentName: "苏皖区域",
    projectName: "永康商业公司",
    insertType: "修改",
    creatorName: "",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001"
  },{
    oldDivisionName: "念其炳Daniel Nian",
    newDivisionName: "温松江 Chris W",
    oldCentName: "总部",
    newCentName: "苏皖区域",
    projectName: "永康商业公司",
    insertType: "修改",
    creatorName: "",
    createdDate: "2021-05-25 19:16:10",
    storeNo: "M1-B1-001",
  }
];
