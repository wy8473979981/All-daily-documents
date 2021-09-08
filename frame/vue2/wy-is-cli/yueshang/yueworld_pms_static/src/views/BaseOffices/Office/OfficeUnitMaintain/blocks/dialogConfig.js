import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    {
      itemType: 'select',
      prop: 'programName',
      label: '所属项目',
      list: PUBFN.getOptionsList('projectName'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'buildingName',
      label: '所属楼栋',
      list: PUBFN.getOptionsList('allFlo'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'floorName',
      label: '所属楼层',
      list: PUBFN.getOptionsList('allFlos'),
      required: true,
    },
    {
      itemType: 'input',
      prop: 'officeId',
      label: '单元编码',
      disabled: true,
      placeholder: "—自动带入—"
    },
    {
      itemType: 'input',
      prop: 'officeName',
      label: '单元号',
      required: true,
    },
    {
      itemType: 'select',
      prop: 'officeType',
      label: '营运类型',
      list: PUBFN.getOptionsList('businessType'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'officeEquityNature',
      label: '产权性质',
      list: PUBFN.getOptionsList('propertyType'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'areaType',
      label: '计租面积类型',
      list: PUBFN.getOptionsList('rentaType'),
      required: true,
    },
    {
      itemType: 'input',
      prop: 'leasableArea',
      label: '计租面积(m²)',
      disabled: true,
      placeholder: "—自动带入—",
      inputType: "Number",
      required: true,
    },
    {
      itemType: 'input',
      prop: 'officeGrossArea',
      label: '建筑面积(m²)',
      inputType: "Number",
      required: true,
    },
    {
      itemType: 'input',
      prop: 'officeNetArea',
      label: '套内面积(m²)',
      inputType: "Number",
      required: true,
    },
    {
      itemType: 'select',
      prop: 'officeStatus',
      label: '单元状态',
      disabled: true,
      placeholder: "—自动带入—"
    },
    {
      itemType: 'datePicker',
      prop: 'effectiveDate',
      label: '生效起始日期',
      required: true,
    },
    {
      itemType: 'radio',
      prop: 'vacancyRatio', //出租率vacancyRatio,开业率openingRatio
      label: '计入统计',
      list: [
        { label: '出租率', value: '1' },
        { label: '开业率', value: '2' }],
      // required: true,
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: "remark",
      label: '备注',
      span: 2,
    },

  ]
}
export const configDataNew = () => {
  return [
    {
      itemType: 'input',
      prop: 'officeGrossAreaNew',
      label: '新建筑面积(m²)',
      inputType: "Number",
      required: true,
    },
    {
      itemType: 'input',
      prop: 'officeNetAreaNew',
      inputType: "Number",
      label: '新套内面积(m²)',
      required: true,
    },
  ]
}

// 业主信息
export const configDataOwner = () => {
  return [
    {
      itemType: 'input',
      prop: 'ownerName',
      label: '业主名称',
    },
    {
      itemType: 'input',
      prop: 'ownerContactsName',
      label: '业主联系人',
    },
    {
      itemType: 'input',
      prop: 'ownerContactsTel',
      label: '业主电话',
    },
  ]
}

// 状态日志
export const tableData = () => {
  return [
    {
      name: '张三12313123123',
      sex: '男',
      age: '18',
      birthYear: '2010',
      birthMonth: '10',
      birthDay: '7',
      id: 1,
      disName: '你好',
    },
  ]
}

// 状态日志
export const tableConfig = () => {
  return [
    { status: '原状态', width: '100px' },
    { checkStatus: '变更后状态', width: '150px' },
    { reason: '状态变更原因', width: '150px' },
    { version: '版本号', width: '100px' },
    { commentId: '审批号', width: '150px' },
    { commentName: '发起人', width: '80px' },
    { changeTime: '状态变化时间', width: '120px' },
  ]
}

// 一铺一价信息

export const tableConfigPrice = () => {
  return [
    { standardYear: '标准年度', width: '100px' },
    // { standardDeposit: '租赁保证金标准(元)', width: '150px', type: "money" },
    // { standardDecorationDeposit: '装修保证金标准(元)', width: '150px', type: "money" },
    // { standardRentFreePeriod: '免租期(天)', width: '100px' },
    { feeName1: '租金', width: '150px' },
    { feeName2: '物管费', width: '160px' },
  ]
}