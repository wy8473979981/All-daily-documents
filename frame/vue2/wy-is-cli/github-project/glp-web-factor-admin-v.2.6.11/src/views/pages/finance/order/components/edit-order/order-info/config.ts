import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const quotaDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'file-link', model: 'materialList', label: '用信清单', options: { props: { url: 'fileUrl' } } },
  { type: 'custom', customType: 'link', model: 'quota', label: '额度明细', options: { text: '点击查看额度明细' } }
]

export const debtColumns: TableColumnDef[] = [
  { prop: 'debtReceivableNumber', label: '应收账款编号' },
  { prop: 'debtReceivableName', label: '应收账款名称' },
  { prop: 'amount', label: '应收账款金额', formatter: formatter('currency'), align: 'right' },
  { prop: 'transferStartTime', label: '转让起始时间', formatter: formatter('date') },
  { prop: 'transferEndTime', label: '转让截止时间', formatter: formatter('date') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]

export const invoiceColumns: TableColumnDef[] = [
  { prop: 'invoiceNo', label: '发票编号' },
  { prop: 'invoicingTime', label: '开票时间', formatter: formatter('date') },
  { prop: 'buyerCompName', label: '购买方名称' },
  { prop: 'sellerCompName', label: '销售方名称' },
  { prop: 'invoiceTaxExclusiveMoney', label: '不含税金额', formatter: formatter('currency'), align: 'right' },
  { prop: 'invoiceTaxMoney', label: '税额', formatter: formatter('currency'), align: 'right' },
  { prop: 'invoiceMoney', label: '价税合计', formatter: formatter('currency'), align: 'right' },
  { prop: 'isModify', label: '客户是否修改', formatter: formatter('transcode', '_yesOrNo') },
  { prop: 'verifyStatus', label: '验真结果', formatter: formatter('transcode', 'invoice_yzzt') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '160px' }
]

export const loanFileColumns: TableColumnDef[] = [
  { prop: 'fileName', label: '文件名称' },
  { prop: 'fileType', label: '文件类型', formatter: (row: any, column: any, cellValue: string) => String(cellValue) === '7' ? '中登文件' : '' },
  { prop: 'uploader', label: '上传人' },
  { prop: 'uploadTime', label: '上传时间', formatter: formatter('date', 'T') },
  { prop: 'desc', label: '附件说明' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]

export const loanDetailsColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'amount', label: '审核保理金额明细', formatter: formatter('currency'), align: 'right' },
  { prop: 'endDate', label: '最晚还款日明细', formatter: formatter('date') },
  { prop: 'expectedFactoringFinancingFee', label: '预计保理融资费明细', formatter: formatter('currency'), align: 'right' },
  { prop: 'expectedLoanMoney', label: '预计放款金额明细', formatter: formatter('currency'), align: 'right' },
  { prop: 'billNo', label: '对应票据号码' }
]

export const logColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'operatorName', label: '操作人' },
  { prop: 'createTime', label: '操作时间', formatter: formatter('date', 'T') },
  { prop: 'auditNode', label: '处理环节' },
  { prop: 'auditStatus', label: '处理动作' },
  { prop: 'remark', label: '处理意见' }
]

export const accountDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'bankAccountName', label: '收款人名称' },
  { type: 'plain', model: 'bankAccountNumber', label: '银行账号' },
  { type: 'plain', model: 'bankBranchName', label: '开户支行' }
]

export const loanDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'rate', label: '利率（年化）', options: { formatter: f('percent') } },
  { type: 'plain', model: 'interestType', label: '计息方式', options: { formatter: f('transcode', 'jxfs') } },
  { type: 'date', model: 'latestRepaymentDate', label: '最晚还款日', options: { type: 'date', format: datetime }, rules: [requiredRule()] },
  { type: 'plain', model: 'debtMoney', label: '应收账款金额', options: { formatter: f('currency') } },
  { type: 'number', model: 'amount', label: '审核保理金额', options: { ...amountOptions }, rules: [requiredRule('number')] },
  { type: 'plain', model: 'expectedFactoringFinancingFee', label: '预计保理融资费', options: { formatter: f('currency') } },
  { type: 'plain', model: 'expectedLoanMoney', label: '预计放款金额', options: { formatter: f('currency') } }
]
