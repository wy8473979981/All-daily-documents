
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
      filterable: true,
      clearable: false
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
    key: 'shopNameOrStoreNo',
    label: '',
    type: 'input',
    props: {
      placeholder: '品牌/铺位号',
      suffixIcon: 'el-icon-search'
    }
  },
  {
    key: 'caliberType',
    label: '',
    type: 'radioGroup',
    props: {
      options: [
        { key: '1', label: '按权责' },
        { key: '2', label: '按合同' },
      ]
    }
  },
  {
    key: 'accountAgeType',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.oweTimeDict,
      placeholder: '选择账龄'
    }
  },
  {
    key: 'feeTypeList',
    label: '',
    type: 'checkboxGroup',
    props: {
      options: [
        { key: '1', label: '租金' },
        { key: '2', label: '物管费' },
      ]
    }
  },
]


export function TableConfig() {
  let dateConfig = {
    key: 'qzMonth',
    label: '权责月',
    minWidth: 140,
    sortable: 'custom'
  }
  if (this.currentFormData.caliberType === '2') {
    dateConfig = {
      key: 'mustDate',
      label: '应缴日期',
      minWidth: 140,
      sortable: 'custom'
    }
  }
  return [
    {
      key: "shopName",
      label: "商户品牌",
      minWidth: 140,
      fixed: true,
    },
    {
      key: "contNo",
      label: "合同号",
      minWidth: 160,
    },
    {
      key: "storeNo",
      label: "商铺号",
      minWidth: 160,
    },
    {
      key: "statusCd",
      label: "经营转态",
      minWidth: 120,
    },
    {
      key: "mustType",
      label: "费用类型",
      minWidth: 120,
    },
    dateConfig,
    {
      key: "oweFee",
      label: "欠费金额(元)",
      minWidth: 140,
      type: "money",
      props: {
        style: {
          color: "red",
        },
      },
      sortable: "custom",
    },
    {
      key: "oweFeeDayNum",
      label: "欠费日期(天)",
      minWidth: 140,
      align: "right",
      sortable: "custom",
    },
  ];
}