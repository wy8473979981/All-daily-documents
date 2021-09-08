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
      itemType: 'input',
      prop: 'floorId',
      label: '楼层编码',
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'floorName',
      label: '楼层名称',
      required: true,
    },
    {
      itemType: 'select',
      prop: 'floorRelationship',
      label: '楼层关系',
      list: PUBFN.getOptionsList('floorRelationship'),
      // required: true,
    },
    {
      itemType: 'input',
      prop: 'floorGrossArea',
      label: '建筑面积(m²)',
      disabled: true,
    },
    {
      itemType: 'input',
      prop: 'floorLeasableArea',
      label: '计租面积(m²)',
      disabled: true,
    },
    {
      itemType: 'select',
      prop: 'floorStatus',
      label: '楼层状态',
      list: PUBFN.getOptionsList('floorStatus'),
      required: true,
    },
    {
      itemType: 'fileUpload',
      prop: 'floorPic',
      label: '楼栋图',
      btnText: '上传',
      infoText: "只能上传jpg/png文件，且不超过500kb",
      isSearch: true,
      actionUrl: '/mock/26/pms/file/upload',
      width: "423px",
      limitNum: 4,
      span: 2
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
