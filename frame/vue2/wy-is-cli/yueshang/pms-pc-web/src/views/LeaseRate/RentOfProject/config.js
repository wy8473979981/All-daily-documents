import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
  {
    key: 'projectId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.projectDict,
      placeholder: '项目',
      filterable: true
    }
  },
  {
    key: 'chargeType',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.chargeTypeDict,
      placeholder: '物业类型'
    }
  },
  {
    label: '',
    type: 'dateRange',
    startKey: 'startDate',
    endKey: 'endDate',
    props: {
      valueFormat: 'yyyy-MM-dd',
      type: 'date'
    }
  },
  {
    key: 'squareFlag',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.squareFlagDict,
      placeholder: '面积类型'
    }
  },
]

export function TableConfig() {
  return [
    {
      key: "sortIndex",
      label: "序号",
      minWidth: 60,
      fixed: true,
    },
    {
      key: "projectName",
      label: "项目名",
      minWidth: 140,
    },
    {
      key: "cooperativeBrand",
      label: "品牌名",
      minWidth: 160,
    },
    {
      key: "contNo",
      label: "合同号",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contractNo",
      label: "合同文本库号",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "attachNum",
      label: "上传合同签署件",
      align: "right",
      minWidth: 140,
      sortable: "custom",
    },
    {
      key: "storeNo",
      label: "铺位号",
      minWidth: 150,
      sortable: "custom",
    },
    {
      key: "storeRentSquare",
      label: "计租面积(㎡)",
      type: "area",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "statusCd",
      label: "合同状态",
      minWidth: 120,
      sortable: "custom",
    },
    {
      key: "contStartDate",
      label: "合同开始时间",
      type: "date-d",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contEndDate",
      label: "合同结束时间",
      type: "date-d",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contToFailDate",
      label: "合同解约时间",
      type: "date-d",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contBalanceZj",
      label: "租金保证金(元)",
      type: "money",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contBalanceWg",
      label: "物管保证金(元)",
      type: "money",
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contOweFeeZj",
      label: "租金欠费(元)",
      type: "money",
      props: {
        style: {
          color: "red",
        },
      },
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "contOweFeeWg",
      label: "物管欠费(元)",
      type: "money",
      props: {
        style: {
          color: "red",
        },
      },
      minWidth: 160,
      sortable: "custom",
    },
    {
      key: "accumulatedDifference",
      label: "累计差额(元)",
      type: "money",
      minWidth: 160,
      sortable: "custom",
    },
  ];
}