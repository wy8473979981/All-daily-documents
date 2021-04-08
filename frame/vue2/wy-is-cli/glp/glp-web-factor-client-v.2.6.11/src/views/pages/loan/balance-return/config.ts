import { FieldDef, TableColumnDef } from '@/types'
import { datetime, remote, d, p } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs = [
  { type: 'text', model: 'repaymentAcctNumber', label: '回款账号', options: { placeholder: '请输入回款账号' } },
  { type: 'select', model: 'oppositeAcctName', label: '付款方名称', options: { placeholder: '请输入付款方名称', options: p('opposite-acct-name'), filterable: true } },
  { type: 'text', model: 'repaymentOrderNo', label: '回款单号', options: { placeholder: '请输入回款单号' } },
  { type: 'select', model: 'repaymentStatus', label: '回款状态', options: { options: d('repay_hkzt'), placeholder: '请选择回款状态' } },
  { type: 'date', model: 'time', label: '回款日期', options: { type: 'daterange', format: datetime, placeholder: '请选择回款日期' } }
]
export const columns: TableColumnDef[] = [
  { prop: 'waterSerialNo', label: '回款单号', minWidth: '120px' },
  { prop: 'repaymentAcctUsername', label: '回款账户', minWidth: '120px' },
  { prop: 'repaymentAcctBankName', label: '回款帐号开户行', minWidth: '120px' },
  { prop: 'repaymentAcctNumber', label: '回款帐号', minWidth: '120px' },
  { prop: 'creditAmount', label: '流水金额(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'creditNotAmount', label: '未核销余额(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'tradeDate', label: '银行交易日期', minWidth: '120px', formatter: formatter('date') },
  { prop: 'oppositeAcctName', label: '付款方名称', minWidth: '200px' },
  { prop: 'oppositeAcctBankName', label: '付款方开户行', minWidth: '120px' },
  { prop: 'oppositeAcctNumber', label: '付款方帐号', minWidth: '120px' },
  { prop: 'note', label: '银行流水摘要', minWidth: '120px' },
  { prop: 'repaymentStatus', label: '回款状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('repay_hkzt')[cellValue] }
]
