import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'sellerCompId', label: '卖方企业', options: { ...remote('seller-account') } },
  { type: 'text', model: 'settlementNo', label: '结算单号' },
  { type: 'date', model: 'Time', label: '结算起止日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'settlementNo', label: '结算单号', minWidth: '250px' },
  { prop: 'sellerCompName', label: '卖方企业名称', minWidth: '250px' },
  { prop: 'settlementTime', label: '结算时间', minWidth: '170px', formatter: formatter('date', 'T') },
  { prop: 'principal', label: '冲减本金合计', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'normalInterest', label: '冲减利息合计', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'graceInterest', label: '冲减宽限期利息合计', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'breakInterest', label: '冲减罚息合计', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'invoiceNos', label: '发票号码', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'status', label: '结算单状态', fixed: 'right', minWidth: '170px', formatter: formatter('transcode', 'settlement_status') }
]
