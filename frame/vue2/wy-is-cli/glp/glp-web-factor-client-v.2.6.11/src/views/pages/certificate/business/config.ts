import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'claimType', label: '单据类型', options: { options: d('claim_bill_type'), placeholder: '请选择单据类型' } },
  { type: 'select', model: 'status', label: '流转状态', options: { options: d('claim_circulation_status'), placeholder: '请选择流转状态' } },
  { type: 'select', model: 'active', label: '有效状态', options: { options: d('active_status'), placeholder: '请选择有效状态' } },
  { type: 'text', model: 'batchNo', label: '批次号', options: { placeholder: '请输入批次号' } },
  { type: 'text', model: 'orderNumber', label: '融资订单号', options: { placeholder: '请输入融资订单号' } },
  { type: 'date', model: 'receiveTime', label: '单据接收日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'batchNo', label: '批次号', minWidth: '150px' },
  { prop: 'claimNumber', label: '单据号', minWidth: '150px' },
  { prop: 'channelType', label: '渠道系统', minWidth: '150px' },
  { prop: 'claimType', label: '单据类型', minWidth: '150px', formatter: formatter('transcode', 'claim_bill_type') },
  { prop: 'sellerCompanyName', label: '卖方名称', minWidth: '150px' },
  { prop: 'receiveTime', label: '单据接收日期', minWidth: '150px', formatter: formatter('date') },
  { prop: 'tradeAmount', label: '单据金额', minWidth: '150px', formatter: formatter('number') },
  { prop: 'effectiveTime', label: '基础债权生效时间', minWidth: '150px', formatter: formatter('date') },
  { prop: 'expirationTime', label: '基础债权失效时间', minWidth: '150px', formatter: formatter('date') },
  { prop: 'status', label: '流转状态', minWidth: '150px', formatter: formatter('transcode', 'claim_circulation_status') },
  { prop: 'active', label: '有效状态', minWidth: '150px', formatter: formatter('transcode', 'active_status') },
  { prop: 'projectName', label: '项目名称', minWidth: '150px' },
  { prop: 'orderNumber', label: '融资订单号', minWidth: '150px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '100px' }
]
