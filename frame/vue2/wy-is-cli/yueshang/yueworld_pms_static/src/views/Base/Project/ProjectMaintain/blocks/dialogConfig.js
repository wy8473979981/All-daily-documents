import PUBFN from '@/utils/pubFn'
export const configDataTop = () => {
  return [
    {
      itemType: 'select',
      prop: 'programRegion',
      label: '区域名称',
      width: '206px',
      list: PUBFN.getOptionsList('areaList'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programCity',
      label: '城市名称',
      width: '206px',
      list: PUBFN.getOptionsList('cityList'),
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
      // required: true,
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
      list: PUBFN.getOptionsList('programPropertyType'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programOperateStatus',
      label: '营运状态',
      list: PUBFN.getOptionsList('operationStatus'),
      required: true,
    },
    {
      itemType: 'select',
      prop: 'programType',
      label: '经营类型',
      list: PUBFN.getOptionsList('businessType'),
      required: true,
    },
    {
      itemType: 'input',
      prop: 'programGrossArea',
      label: '建筑面积(m²)',
      disabled: true,
      // required: true,
    },
    {
      itemType: 'input',
      prop: 'programLeasableArea',
      label: '计租面积(m²)',
      disabled: true,
      // required: true,
    },
    {
      itemType: 'datePicker',
      prop: 'programOpeningDate',
      label: '开业日期',
      // required: true,
    },
    {
      itemType: 'select',
      prop: 'programEquityNature',
      label: '产权性质',
      list: PUBFN.getOptionsList('projectPropertyType'),
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
      infoText: "只能上传jpg/png文件，且不超过500kb",
      isSearch: true,
      actionUrl: '/mock/26/pms/file/upload',
      width: "423px",
      limitNum: 4,
      span: 2
    },
    {
      itemType: 'fileUpload',
      prop: 'programPic',
      label: '项目简图',
      infoText: "只能上传jpg/png文件，且不超过500kb",
      btnText: '上传',
      isSearch: true,
      actionUrl: '/mock/26/pms/file/upload',
      width: "423px",
      limitNum: 4,
      span: 2
    }
  ]
}
export const formTableConfig = () => {
  return [
    {
      itemType: 'input',
      prop: 'firstpartyName',
      label: '合同甲方抬头',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'firstpartyAddress',
      label: '合同甲方地址',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'firstpartyTel',
      label: '合同甲方电话',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'firstpartyUnifiedSocialCreditCode',
      label: '合同甲方社会信用代码',
      required: true,
    },
    {
      itemType: 'input',
      prop: 'firstpartyEmail',
      label: '合同甲方邮箱',
    },
    {
      itemType: 'input',
      prop: 'firstpartyMailAddress',
      label: '合同甲方邮寄地址',
    },
    {
      itemType: 'input',
      prop: 'firstpartyFax',
      label: '合同甲方传真',
    },
    {
      itemType: 'input',
      prop: 'firstpartyPostcode',
      label: '合同甲方邮编',
    },
    {
      itemType: 'input',
      prop: 'firstpartyLegalPerson',
      label: '合同甲方法定代表人',
      required: true
    },
  ]
}

export const tableForm = () => {
  return {
    firstpartyName: null,
    firstpartyAddress: null,
    firstpartyTel: null,
    firstpartyUnifiedSocialCreditCode: null,
    firstpartyEmail: null,
    firstpartyMailAddress: null,
    firstpartyFax: null,
    firstpartyPostcode: null,
    firstpartyLegalPerson: null
  }

}

export const formTableColumn = () => {
  return [
    { firstpartyAccountName: '开户名称', itemType: 'input', width: '200px', inputType: 'text', required: true },
    { firstpartyBankName: '开户行名称', itemType: 'input', width: '200px', inputType: 'text', required: true },
    { firstpartyBankAccount: '开户行账号', itemType: 'input', width: '380px', inputType: 'text', required: true },
  ]
}