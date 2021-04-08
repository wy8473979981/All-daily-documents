import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
import options from '@/config/region/options'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerName', label: '账户所属企业', options: { disabled: true } },
  { type: 'text', model: 'projectName', label: '项目名称', options: { disabled: true } },
  { type: 'select', model: 'clearWay', label: '清分方式', options: { options: d('invoice_cleartype'), disabled: true } },
  { type: 'text', model: 'repaymentOrderNo', label: '回款单号' },
  { type: 'select', model: 'repaymentStatus', label: '回款状态', options: { options: d('repay_hkzt') } },
  { type: 'date', model: 'Time', label: '回款起止日期', options: { type: 'daterange', format: datetime } }
]

const selectable = (row: any) => {
  return row.creditNotAmount > 0
}
export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, width: '64px', selectable: selectable },
  { prop: 'waterSerialNo', label: '回款单号', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'creditAmount', label: '流水金额', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'creditNotAmount', label: '未核销金额', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'tradeDate', label: '银行交易时间', minWidth: '170px', formatter: formatter('date', 'T') },
  { prop: 'oppositeAcctName', label: '付款方名称', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'oppositeAcctBankName', label: '付款方开户行', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'oppositeAcctNumber', label: '付款方账号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'note', label: '银行流水摘要', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'repaymentStatus', label: '回款状态', fixed: 'right', formatter: formatter('transcode', 'repay_hkzt') }
]
