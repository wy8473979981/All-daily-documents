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
  { prop: 'name', label: '文件名称', minWidth: '150px' },
  { prop: 'code', label: '文件编号', minWidth: '150px' },
  { prop: 'path', label: '附件', minWidth: '150px' }
]
