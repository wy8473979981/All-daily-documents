import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号' },
  { type: 'select', model: 'invoiceStatus', label: '开票状态', options: { options: d('invoice_kpzt') } },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export function changeTime(params: any) {
  if (params.time) {
    const { time, ...other } = params
    other.beginTime = time[0]
    other.endTime = time[1]
    return other
  }
  return params
}

export const columns: TableColumnDef[] = [
  { prop: 'orderNum', label: '序号' },
  { prop: 'paperNumber', label: '票据号码' },
  { prop: 'paperFrom', label: '出票人' },
  { prop: 'paperFromBank', label: '出票人开户行' },
  { prop: 'paperUsed', label: '承兑人' },
  { prop: 'paperUsedBank', label: '承兑人开户行' },
  { prop: 'paperUsedBank1', label: '票据类型' },
  { prop: 'paperAmount', label: '票据金额' },
  { prop: 'paperFromDate', label: '出票日' },
  { prop: 'paperExpiredDate', label: '票据到期日' },
  { prop: 'paperGuarantee', label: '承兑保证人 ' },
  { prop: 'attachment', label: '附件 ' }
]
