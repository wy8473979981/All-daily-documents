import store from "@/store";

let enumList = store.getters.enumList;

export function FormConfig() {
  return [
    {
      key: "areaId",
      label: "",
      type: "select",
      props: {
        options: () => enumList.areaDict,
        placeholder: "项目区域",
      },
    },
    {
      key: "projectId",
      label: "",
      type: "select",
      props: {
        options: () => {
          return enumList.areaProjectDict.filter(
            (item) =>
              item.detailPy === this.formData.areaId ||
              this.formData.areaId === "empty" ||
              !this.formData.areaId
          );
        },
        placeholder: "项目",
        filterable: true,
        clearable: true,
      },
    },
    {
      label: "",
      type: "dateRange",
      startKey: "startDate",
      endKey: "endDate",
      props: {
        valueFormat: "yyyy-MM-dd",
        type: "date",
      },
    },
    {
      key: "storeNo",
      label: "",
      type: "input",
      props: {
        placeholder: "铺位号",
        suffixIcon: "el-icon-search",
      },
    },
    {
      key: "openStatus",
      label: "",
      type: "select",
      props: {
        options: () => enumList.operStatusDictAll,
        placeholder: "项目状态",
      },
    },
  ];
}

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
  ];
}
