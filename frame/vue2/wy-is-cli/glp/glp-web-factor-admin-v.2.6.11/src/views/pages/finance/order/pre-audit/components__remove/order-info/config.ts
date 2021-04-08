import { validator } from '@/config/validator'
import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f, textareaOptions, textOptions } from '@/config/form'
import { formatter } from '@/config/table'

function orderFormDefFn (step?: number): Array<FieldDef | GridFieldDef> {
  let rules
  let disabled = true
  if (step === 2) {
    disabled = false
    rules = [requiredRule(), { validator: validator('credit-code') }]
  }
  return [
    { type: 'plain', model: 'sellerCompanyName', label: '卖方名称' },
    { type: 'custom', customType: 'edit', model: 'buyerCompName', label: '买方名称' },
    { type: 'text', model: 'buyerUnifiedcode', label: '买方统一社会信用代码', options: { disabled, labelWidth: '180px' }, rules },
    { type: 'plain', model: 'createTime', label: '融资申请日期', options: { formatter: f('date', 'T') } },
    { type: 'plain', model: 'amount', label: '申请保理金额', options: { formatter: f('currency') } },
    { type: 'plain', model: 'latestRepaymentDate', label: '最晚还款日', options: { formatter: f('date') } },
    { type: 'plain', model: 'pledgeAccount', label: '质押账户名' },
    { type: 'plain', model: 'pledgeAccountName', label: '质押账户开户行' },
    { type: 'plain', model: 'pledgeBankName', label: ' 质押账户' }
  ]
}

export const orderFormDef: Array<FieldDef | GridFieldDef> = orderFormDefFn()

export const orderStep2FormDef: Array<FieldDef | GridFieldDef> = orderFormDefFn(2)

export const debtColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '64px' },
  { prop: 'paperAmount', label: '转让金额明细', formatter: formatter('currency') },
  { prop: 'paperExpiredDate', label: '到期日明细', formatter: formatter('date') },
  { prop: 'paperNumber', label: '票据编号' }
]

function contractFormDefFn (step?: number): Array<FieldDef | GridFieldDef> {
  let rules
  if (step === 1) {
    rules = [requiredRule()]
  }
  return [
    { type: 'text', model: 'basicContractName', label: '基础合同名称', options: { ...textOptions }, rules },
    { type: 'text', model: 'basicContractNo', label: '基础合同编号', options: { ...textOptions }, rules },
    { type: 'date', model: 'basicContractSignDate', label: '基础合同签署日', options: { type: 'date', format: datetime }, rules },
    { type: 'date', model: 'basicContractExpireDate', label: '基础合同到期日', dependOn: 'form.noFixed === "0"', options: { type: 'date', format: datetime } },
    { type: 'radio', model: 'noFixed', label: '无固定期限', options: { options: d('_yesOrNo'), defaultValue: '0' } },
    { span: 24, xl: 24, def: { type: 'textarea', model: 'debtDesc', label: '应收账款描述', options: { ...textareaOptions }, rules } },
    { span: 24, xl: 24, def: { type: 'file-link', model: 'files', label: '基础合同附件', options: { props: { name: 'fullFileName', url: 'filePath' } } } }
  ]
}

export const contractFormDef12: Array<FieldDef | GridFieldDef> = contractFormDefFn(1)
export const contractFormDef34: Array<FieldDef | GridFieldDef> = contractFormDefFn(3)

export const invoiceColumns: TableColumnDef[] = [
  { prop: 'invoiceNo', label: '发票编号' },
  { prop: 'invoicingTime', label: '开票时间', formatter: formatter('date') },
  { prop: 'buyerCompName', label: '购买方名称' },
  { prop: 'sellerCompName', label: '销货方名称' },
  { prop: 'invoiceCode', label: '发票代码' },
  { prop: 'invoiceTaxExclusiveMoney', label: '不含税金额', formatter: formatter('currency'), align: 'right' },
  { prop: 'invoiceTaxMoney', label: '税额', formatter: formatter('currency'), align: 'right' },
  { prop: 'invoiceMoney', label: '价税合计', formatter: formatter('currency'), align: 'right' },
  { prop: 'invoiceCheckCode', label: '验证码后六位' },
  { prop: 'verifyStatus', label: '验真结果', formatter: formatter('transcode', 'invoice_yzzt') },
  { prop: 'isModify', label: '客户是否修改', formatter: formatter('transcode', '_yesOrNo') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '160px' }
]

export const quotaDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'file-link', model: 'materialList', label: '用信清单', options: { props: { url: 'fileUrl' } } },
  { type: 'custom', customType: 'link', model: 'quota', label: '额度明细', options: { text: '点击查看额度明细' } }
]
