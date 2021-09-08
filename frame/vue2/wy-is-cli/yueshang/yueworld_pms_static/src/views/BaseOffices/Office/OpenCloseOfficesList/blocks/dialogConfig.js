export const configDataTop = () => {
  return [
    {
      itemType: 'select',
      prop: 'programRegion',
      label: '区域名称',
      width: '206px',
      list: [],
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programCity',
      label: '城市名称',
      width: '206px',
      list: [],
      required: true,
    },
  ]


}
export const configData = () => {
  return [
    {
      itemType: 'input',
      prop: 'programName',
      label: '项目名称',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programId',
      label: '项目编码',
      disabled: true,
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programNameShort',
      label: '项目简称',
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programPropertyType',
      label: '物业管理类型',
      list: [],
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programOperateStatus',
      label: '营业状态',
      list: [],
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programType',
      label: '经营类型',
      list: [],
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programGrossArea',
      label: '建筑面积(m²)',
      disabled: true,
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programLeasableArea',
      label: '计租面积(m²)',
      disabled: true,
      required: true,
    },
    {
      itemType: 'datePicker',
      prop: 'programOpeningDate',
      label: '开业日期',
    },
    {
      itemType: 'select',
      prop: 'programEquityNature',
      label: '产权性质',
      list: [],
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programManager',
      label: '负责人',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programManagerTel',
      label: '联系电话',
      required: true,
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: 'programAddress',
      label: '项目地址',
      span: 2,
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: "remark",
      label: '备注',
      span: 2,
    },
    {
      itemType: 'fileUpload',
      prop: 'attachment',
      label: '附件',
      btnText: '上传',
      isSearch: true,
      actionUrl: 'xxx',
      width: "423px",
      limitNum: 4,
      span: 2
    },
    {
      itemType: 'fileUpload',
      prop: 'programPic',
      label: '项目简图',
      btnText: '上传',
      isSearch: true,
      actionUrl: 'xxx',
      width: "423px",
      limitNum: 4,
      span: 2
    }
  ]
}
export const formTableConfig = [
  {
    itemType: 'input',
    prop: 'programName',
    label: '项目名称',
    required: true,
  },
  {
    itemType: 'select',
    prop: 'programRegion',
    label: '区域名称',
    width: '206px',
    list: [],
    required: true,
  },
  {
    itemType: 'select',
    prop: 'programCity',
    label: '城市名称',
    width: '206px',
    list: [],
    required: true,
  },
]
export const configDataList = () => {
  return [
    {
      label: '合同甲方一',
      name: 'n1',
      formTableConfig: formTableConfig,
    }
  ]
}
