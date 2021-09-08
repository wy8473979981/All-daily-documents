/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    {
      itemType: 'select',
      prop: 'programName',
      label: '所属项目',
      list: PUBFN.getOptionsList('projectName'),
      required: true
    },
    {
      itemType: 'input',
      prop: 'buildingId',
      label: '楼栋编码',
      disabled: true
    },
    {
      itemType: 'input',
      prop: 'buildingName',
      label: '楼栋名称',
      required: true
    },
    {
      itemType: 'select',
      prop: 'buildingStatus',
      label: '楼栋状态',
      list: PUBFN.getOptionsList('floorStatus'),
      required: true
    },
    {
      itemType: 'input',
      prop: 'buildingGrossArea',
      label: '建筑面积(m²)',
      disabled: true
    },
    {
      itemType: 'input',
      prop: 'buildingLeasableArea',
      label: '计租面积(m²)',
      disabled: true
    },
    {
      itemType: 'input',
      inputType: 'Number',
      prop: 'buildingFloorAboveGround',
      label: '地上层数',
      required: true
    },
    {
      itemType: 'input',
      inputType: 'Number',
      prop: 'buildingFloorUnderground',
      label: '地下层数',
      required: true
    },
    {
      itemType: 'fileUpload',
      prop: 'buildingPic',
      label: '楼栋图',
      btnText: '上传',
      infoText: '只能上传jpg/png文件，且不超过500kb',
      isSearch: true,
      actionUrl: '/mock/26/pms/file/upload',
      width: '423px',
      limitNum: 4,
      span: 2
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: 'remark',
      label: '备注',
      span: 2
    }

  ]
}
