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
      itemType: 'select',
      prop: 'buildingName',
      label: '所属楼栋',
      list: PUBFN.getOptionsList('allFlo'),
      required: true
    },
    {
      itemType: 'select',
      prop: 'floorName',
      label: '所属楼层',
      list: PUBFN.getOptionsList('allFlos'),
      required: true
    },
    {
      itemType: 'input',
      prop: 'diverseName',
      label: '多经名称',
      required: true
    },
    {
      itemType: 'input',
      prop: 'diverseId',
      inputType: 'autoValue',
      disabled: true,
      label: '多经编码'
    },
    {
      itemType: 'select',
      prop: 'diverseType',
      label: '多经类型',
      list: PUBFN.getOptionsList('diverseType'),
      required: true
    },
    {
      itemType: 'input',
      prop: 'leasableArea',
      label: '计租面积(m²)',
      required: true,
      inputType: 'Number',
      type: 'number'
    },
    {
      itemType: 'select',
      prop: 'diverseIsOpenAir',
      label: '是否露天',
      list: PUBFN.getOptionsList('distributionType'),
      required: true
    },
    {
      itemType: 'select',
      prop: 'diverseStatus',
      label: '多经状态',
      disabled: true,
      list: PUBFN.getOptionsList('diverseStatus')
    },
    {
      itemType: 'datePicker',
      prop: 'effectiveDate',
      label: '生效起始日期',
      required: true

    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: 'remark',
      label: '备注',
      span: 2,
      rows: 1
    }

  ]
}
