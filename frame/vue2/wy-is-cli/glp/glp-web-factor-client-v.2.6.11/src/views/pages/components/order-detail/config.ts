import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const financeDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'approvalAmount', label: '融资申请金额', options: { formatter: f('currency') } },
  { type: 'plain', model: 'repaymentType', label: '还款方式' },
  { type: 'plain', model: 'rate', label: '正常利率', options: { formatter: f('percent') } },
  { type: 'plain', model: 'breakRate', label: '违约期利率', options: { formatter: f('percent') } },
  { type: 'plain', model: 'createTime', label: '申请时间', options: { formatter: f('date') } },
  { type: 'plain', model: 'latestRepaymentDate', label: '最晚还款日', options: { formatter: f('date') } },
  { type: 'plain', model: 'sellerCompanyName', label: '卖方' },
  { type: 'plain', model: 'buyerCompanyName', label: '买方' },
  { type: 'plain', model: 'interestMethod', label: '计息方式' },
  { type: 'plain', model: 'interestTime', label: '起息日', options: { formatter: f('date') } },
  { type: 'plain', model: 'dueTime', label: '还款期限' },
  { type: 'plain', model: 'discountRate', label: '折扣率', options: { formatter: f('number') } }
]

export const accountDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'receiptAccountName', label: '收款人名称' },
  { type: 'plain', model: 'receiptBankNumber', label: '银行账号' },
  { type: 'plain', model: 'receiptBankFiliale', label: '开户支行' }
]

export const auditDetailDef: Array<FieldDef | GridFieldDef> = [
  { span: 8, xl: 6, def: { type: 'plain', model: 'approvalTime', label: '审批时间' } },
  { span: 8, xl: 6, def: { type: 'plain', model: 'approvalComments', label: '审核意见' } }
]

export const debtColumns: TableColumnDef[] = [
  { prop: 'debtReceivableNumber', label: '应收账款编号' },
  { prop: 'debtReceivableName', label: '应收账款名称' },
  { prop: 'amount', label: '（预估）应收账款金额', formatter: formatter('currency') },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'transferSubmitTime', label: '转让起始时间', formatter: formatter('date') },
  { prop: 'transferEndTime', label: '转让截止时间', formatter: formatter('date') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]

export const claimColumns: TableColumnDef[] = [
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'sellerCompanyName', label: '卖方名称' },
  { prop: 'claimType', label: '基础债权类型', formatter: formatter('transcode', 'project_jczqlx') },
  { prop: 'tradeAmount', label: '基础债权金额', formatter: formatter('currency') },
  { prop: 'effectiveTime', label: '基础债权生效时间', formatter: formatter('date') },
  { prop: 'expirationTime', label: '基础债权失效时间', formatter: formatter('date') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]
