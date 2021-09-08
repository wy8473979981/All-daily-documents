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
      prop: 'spaceId',
      label: '商铺编码',
      disabled: true,
      placeholder: "—自动带入—"
    },
    {
      itemType: 'input',
      prop: 'spaceName',
      label: '铺位号',
      required: true,
    },
    {
      itemType: 'select',
      prop: 'spaceType',
      label: '商业类型',
      list: PUBFN.getOptionsList('spaceTypeOpenClose'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'spaceEquityNature',
      label: '产权性质',
      list: PUBFN.getOptionsList('projectPropertyType'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'spaceLocation',
      label: '商铺属性',
      list: PUBFN.getOptionsList('shopsType'),
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
      inputType: "Number",
      placeholder: "—自动带入—",
      disabled: true,
      // required: true,
    },
    {
      itemType: 'input',
      prop: 'spaceGrossArea',
      label: '建筑面积(m²)',
      inputType: "Number",
      // disabled: true,
      required: true,
    },
    {
      itemType: 'input',
      prop: 'spaceNetArea',
      label: '套内面积(m²)',
      inputType: "Number",
      // disabled: true,
      required: true,
    },
    {
      itemType: 'select',
      prop: 'spaceStatus',
      label: '商铺状态',
      list: PUBFN.getOptionsList('shopsStatus'),
      placeholder: "—自动带入—",
      disabled: true,
    },
    {
      itemType: 'datePicker',
      prop: 'effectiveDate',
      label: '生效日期',
      required: true,
    },
    {
      itemType: 'radio',
      prop: 'vacancyRatio', //出租率vacancyRatio,开业率openingRatio
      label: '计入统计',
      list: [
        { label: '出租率', value: '1' },
        { label: '开业率', value: '2' }
      ],
      // required: true,
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: "remark",
      label: '备注',
      span: 2,
    }
  ]
}

export const configDataNew = () => {
  return [
    {
      itemType: 'input',
      prop: 'spaceGrossAreaNew',
      label: '新建筑面积(m²)',
      inputType: "Number",
      required: true,
    },
    {
      itemType: 'input',
      prop: 'spaceNetAreaNew',
      inputType: "Number",
      label: '新套内面积(m²)',
      required: true,
    },
  ]
}
// 业态信息
export const configDataBusiness = () => {
  return [
    {
      itemType: 'select',
      prop: 'spaceFormatNamePlan',
      label: '规划业态',
      list: PUBFN.getOptionsList('shopsMenu'),
      required: true,
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'brandFormatName',
      label: '签约业态',
      // disabled: true,
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
    { commentName: '发起人', width: '100px' },
    { changeTime: '状态变化时间' },
  ]
}

// 一铺一价信息

export const tableConfigPrice = () => {
  return [
    { standardYear: '标准年度' },
    // { standardDeposit: '租赁保证金标准(元)', width: '150px', type: 'money' },
    // { standardDecorationDeposit: '装修保证金标准(元)', width: '150px', type: 'money' },
    // { standardRentFreePeriod: '免租期(天)', width: '100px' },
    { feeName1: '租金' },
    { feeName2: '物管费' },
  ]
}