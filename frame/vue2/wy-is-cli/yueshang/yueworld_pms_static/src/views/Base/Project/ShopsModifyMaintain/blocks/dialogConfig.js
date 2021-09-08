import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    {
      itemType: 'select',
      prop: 'programName',
      label: '所属项目',
      list: PUBFN.getOptionsList('projectName'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'buildingName',
      label: '所属楼栋',
      list: PUBFN.getOptionsList('allFlo'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'floorName',
      label: '所属楼层',
      list: PUBFN.getOptionsList('allFlos'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'spaceId',
      label: '商铺编码',
      // disabled: true,
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'spaceName',
      label: '铺位号',
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'spaceType',
      label: '商业类型',
      list: PUBFN.getOptionsList('spaceType'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'spaceEquityNature',
      label: '产权性质',
      list: PUBFN.getOptionsList('propertyType'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'spaceLocation',
      label: '商铺属性',
      list: PUBFN.getOptionsList('shopsType'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'areaType',
      label: '计租面积类型',
      list: PUBFN.getOptionsList('rentaType'),
      // required: true,
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'leasableArea',
      label: '计租面积(m²)',
      disabled: true,
      // required: true,
    },
    {
      itemType: 'input',
      prop: 'spaceGrossArea',
      label: '建筑面积(m²)',
      disabled: true,
      // required: true,
    },
    {
      itemType: 'input',
      prop: 'spaceNetArea',
      label: '套内面积(m²)',
      disabled: true,
      // required: true,
    },
    {
      itemType: 'select',
      prop: 'spaceStatus',
      label: '商铺状态',
      disabled: true,
    },
    {
      itemType: 'datePicker',
      prop: 'effectiveDate',
      label: '生效起始日期',
      // required: true,
      disabled: true,
    },
    {
      itemType: 'radio',
      prop: 'vacancyRatio', //出租率vacancyRatio,开业率openingRatio
      label: '计入统计',
      list: [{ label: '出租率', value: '1' },
      { label: '开业率', value: '2' }],
      // required: true,
      disabled: true,
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: "remark",
      label: '备注',
      disabled: true,
      span: 2,
    },
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
      label: '新套内面积(m²)',
      inputType: "Number",
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
      // required: true,
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'brandFormatName',
      label: '签约业态',
      disabled: true,
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
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'ownerContactsName',
      label: '业主联系人',
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'ownerContactsTel',
      label: '业主电话',
      disabled: true,
    },
  ]
}

