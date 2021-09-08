
import store from '@/store'

let enumList = store.getters.enumList;

export const RateConfig = [
  {
    key: 'fixedContCollectionRateYtd',
    label: '累计物管收缴率(合同口径)',
    type: 'rate'
  },
  {
    key: 'fixedQzCollectionRateYtd',
    label: '累计物管收缴率(权责口径)',
    type: 'rate'
  },
]

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
    label: '',
    type: 'date',
    key: 'yearMonth',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
]

export const X = new Array(12).fill(1).map((i, idx) => `${idx + 1}月`)

export const TableConfig = [
  {
    key: 'name',
    label: '项目',
    minWidth: 120,
    fixed: true
  },
  {
    key: 'a1',
    label: '合同口径(跨月显示多月)',
    children: [
      {
        key: 'a11',
        // label: '2020-1~2021-1',
        renderHeader: (h, scope) => {
          return scope && scope._self && scope._self.data[0] && scope._self.data[0].htStart
        },
        children: [
          {
            key: 'contMustMoney',
            label: '应收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedFactMoney',
            label: '实收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedContCollectionRate',
            label: '收缴率',
            type: 'rate',
            minWidth: 120,
          },
          // {
          //   key: 'contCollectionRateTb',
          //   label: '同比',
          //   type: 'rate',
          //   minWidth: 120,
          // },
        ]
      },
      {
        key: 'a12',
        renderHeader: (h, scope) => {
          return scope && scope._self && scope._self.data[0] && scope._self.data[0].htRange
        },
        children: [
          {
            key: 'contMustMoneyYtd',
            label: '应收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedFactMoneyYtd',
            label: '实收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedContCollectionRateYtd',
            label: '收缴率',
            type: 'rate',
            minWidth: 120,
          },
          // {
          //   key: 'contCollectionRateTbYtd',
          //   label: '同比',
          //   type: 'rate',
          //   minWidth: 120,
          // },
        ]
      }
    ]
  },
  {
    key: 'a1',
    label: '权责口径(跨月显示多月)',
    children: [
      {
        key: 'a11',
        renderHeader: (h, scope) => {
          return scope && scope._self && scope._self.data[0] && scope._self.data[0].qzStart
        },
        children: [
          {
            key: 'qzMustMoney',
            label: '应收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedQzFactMoney',
            label: '实收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedQzCollectionRate',
            label: '收缴率',
            type: 'rate',
            minWidth: 120,
          },
          {
            key: 'fixedQzCollectionRateTb',
            label: '同比',
            type: 'rate',
            minWidth: 120,
          },
        ]
      },
      {
        key: 'a12',
        renderHeader: (h, scope) => {
          return scope && scope._self && scope._self.data[0] && scope._self.data[0].qzRange
        },
        children: [
          {
            key: 'qzMustMoneyYtd',
            label: '应收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedQzFactMoneyYtd',
            label: '实收金额(元)',
            type: 'money',
            minWidth: 140,
          },
          {
            key: 'fixedQzCollectionRateYtd',
            label: '收缴率',
            type: 'rate',
            minWidth: 120,
          },
          {
            key: 'fixedQzCollectionRateTbYtd',
            label: '同比',
            type: 'rate',
            minWidth: 120,
          },
        ]
      }
    ]
  },
]