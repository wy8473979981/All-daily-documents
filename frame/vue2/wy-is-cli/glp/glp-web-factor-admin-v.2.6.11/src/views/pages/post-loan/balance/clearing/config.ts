import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'status', label: '卖方企业', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '买方企业', options: { options: d('status') } },
  { type: 'date', model: 'address', label: '结算起止日期', options: { type: 'daterange', format: datetime } },
  { type: 'date', model: 'address', label: '当前系统日期' }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, width: '64px' },
  { prop: 'repayment', label: '回款单号', minWidth: '170px' },
  { prop: 'repaymentAmount', label: '流水金额', minWidth: '150px', formatter: formatter('currency') },
  { prop: 'availableAmount', label: '未核销金额', minWidth: '150px', formatter: formatter('currency') },
  { prop: 'accountName', label: '付款方名称', minWidth: '250px' },
  { prop: 'tradeTime', label: '银行交易日期', minWidth: '170px' }
]

export const financeColumns: TableColumnDef[] = [
  { prop: 'finacneNo', label: '融资单号', minWidth: '170px' },
  { prop: 'loanTime', label: '放款日期', minWidth: '170px' },
  { prop: 'repayTime', label: '还款到期日', minWidth: '170px' },
  { prop: 'loanAmount', label: '放款金额', minWidth: '170px' },
  { prop: 'toReapyTotalAmount', label: '未还合计', minWidth: '170px' },
  { prop: 'toRepayCapital', label: '未还本金', minWidth: '170px' },
  { prop: 'toRepayInterest', label: '未还利息', minWidth: '170px' },
  { prop: 'toRepayPenalty', label: '未还罚息', minWidth: '170px' },
  { prop: 'expectRepayCapital', label: '预还本金', minWidth: '170px' },
  { prop: 'expectRepayInterest', label: '预计利息', minWidth: '170px' },
  { prop: 'expectRepayPenalty', label: '预还罚息', minWidth: '170px' }
]

export const summaryformDefs: FieldDef[] = [
  { type: 'plain', model: 'project', label: '项目名称' },
  { type: 'plain', model: 'saleCompany', label: '卖方企业' },
  { type: 'plain', model: 'currentTime', label: '当前系统日期' }
]

export const mapping: any = {
  preGracePeriod: 'gracePeriod',
  preInterest: 'interest',
  prePrincipal: 'principal',
  prePenalty: 'penalty'
}
