import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号', options: { placeholder: '请输入结算单号' } },
  { type: 'date', model: 'time', label: '结算时间', options: { type: 'daterange', format: datetime } }
]
export const columns: TableColumnDef[] = [
  { prop: 'settlementNo', label: '结算单号', minWidth: '120px' },
  { prop: 'sellerCompName', label: '卖方企业名称', minWidth: '120px' },
  { prop: 'settlementTime', label: '结算时间', minWidth: '120px', formatter: formatter('date') },
  { prop: 'principal', label: '冲减本金合计(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'normalInterest', label: '冲减利息合计(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'graceInterest', label: '冲减宽限期利息合计(元)', minWidth: '130px', formatter: formatter('number') },
  { prop: 'breakInterest', label: '冲减罚息合计(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceNos', label: '发票号码', minWidth: '120px' },
  { prop: 'status', label: '结算单状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('settlement_status')[cellValue] }
]
export function changeTime (params: any) {
  if (params.time) {
    const { time, ...other } = params
    other.beginTime = time[0]
    other.endTime = time[1]
    return other
  }
  return params
}
