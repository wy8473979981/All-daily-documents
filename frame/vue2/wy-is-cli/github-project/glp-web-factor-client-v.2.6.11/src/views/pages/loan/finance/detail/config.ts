import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { formatter as f, d } from '@/config/form'
import { formatter } from '@/config/table'
export const financeDefs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'amount', label: '融资申请金额' },
  { type: 'plain', model: 'repaymentType', label: '还款方式' },
  { type: 'plain', model: 'rate', label: '正常利率' },
  { type: 'plain', model: 'breakRate', label: '违约期利率' },
  { type: 'plain', model: 'submitTime', label: '申请时间', options: { formatter: f('date', 'latestRepaymentDate') } },
  { type: 'plain', model: 'latestRepaymentDate', label: '最晚还款日', options: { formatter: f('date', 'latestRepaymentDate') } },
  { type: 'plain', model: 'sellerCompanyName', label: '卖方' },
  { type: 'plain', model: 'buyerCompanyName', label: '买方' },
  { type: 'plain', model: 'interestCalculationMethod', label: '计息方式' }, // 计息方式 1-按日计息 2-未知
  { type: 'plain', model: 'interestTime', label: '起息日' },
  { type: 'plain', model: 'dueTime', label: '还款期限' },
  { type: 'plain', model: 'discountRate', label: '折扣率' }
]
export const payeeDefs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'receiptAccountName', label: '收款人名称' },
  { type: 'plain', model: 'receiptBankNumber', label: '银行账号' },
  { type: 'plain', model: 'receiptBankFiliale', label: '开户支行' }
]

export const accountsDefs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'debtReceivableNumber', label: '应收账款编号' },
  { type: 'plain', model: 'debtReceivableName', label: '应收账款名称' },
  { type: 'plain', model: 'amount', label: '（预估）应收账款金额' },
  { type: 'plain', model: 'buyerCompanyName', label: '买方名称' },
  { type: 'plain', model: 'submitTimeBegin', label: '转让起始时间' },
  { type: 'plain', model: 'transferEndTime', label: '转让截止时间' },
  { type: 'plain', model: 'opt', label: '查看' }
]
export const columns: TableColumnDef[] = [
  { prop: 'buyerCompanyName', label: '买方名称', minWidth: '120px' },
  { prop: 'sellerCompanyName', label: '卖方名称', minWidth: '120px' },
  { prop: 'claimType', label: '基础债权类型', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('claim_bill_type')[cellValue] },
  { prop: 'tradeAmount', label: '基础债权金额', minWidth: '120px' },
  { prop: 'effectiveTime', label: '基础债权生效时间', minWidth: '120px', formatter: formatter('date') },
  { prop: 'expirationTime', label: '基础债权失效时间', minWidth: '120px', formatter: formatter('date') },
  { prop: 'opt', label: '操作', minWidth: '120px' }
]
