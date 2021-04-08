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
      key: 'key1',
      label: '序号',
      minWidth: 80,
      fixed: true
    },
    {
      key: 'key2',
      label: '项目名',
      minWidth: 140
    },
    {
      key: 'key3',
      label: '合同号',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key5',
      label: '合同文本库号',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key3',
      label: '上传合同签署件',
      type: 'link',
      props: {
        click: (scope) => {
          console.log('line', scope)
        }
      },
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key8',
      label: '铺位号',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'key9',
      label: '计租面积(㎡)',
      type: 'area',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key10',
      label: '合同状态',
      minWidth: 120,
      sortable: 'custom'
    },
    {
      key: 'key11',
      label: '合同开始时间',
      type: 'date-d',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key12',
      label: '合同结束时间',
      type: 'date-d',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key13',
      label: '合同解约时间',
      type: 'date-d',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key14',
      label: '租金保证金(元)',
      type: 'money',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key14',
      label: '物管保证金(元)',
      type: 'money',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key14',
      label: '租金欠费(元)',
      type: 'money',
      props: {
        style: {
          color: 'red'
        }
      },
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key3',
      label: '物管欠费(元)',
      type: 'money',
      props: {
        style: {
          color: 'red'
        }
      },
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'key14',
      label: '累计差额(元)',
      type: 'money',
      minWidth: 160,
      sortable: 'custom'
    }
  ]
}