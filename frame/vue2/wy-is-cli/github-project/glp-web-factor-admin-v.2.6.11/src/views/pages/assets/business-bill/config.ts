import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称' },
  { type: 'select', model: 'claimType', label: '单据类型', options: { options: d('claim_bill_type') } },
  { type: 'select', model: 'status', label: '流转状态', options: { options: d('claim_circulation_status') } },
  { type: 'select', model: 'active', label: '有效状态', options: { options: d('active_status') } },
  { type: 'select', model: 'projectId', label: '项目名称', options: { ...remote('project-name') } },
  { type: 'text', model: 'batchNo', label: '批次号' },
  { type: 'select', model: 'isRisk', label: '是否触碰', options: { options: d('_yesOrNo') } },
  { type: 'text', model: 'orderNumber', label: '融资订单号' },
  { type: 'date', model: 'receiveTime', label: '单据接收日期', options: { type: 'daterange', format: datetime } }
]

const selectable = (row: any, index: any) => {
  if (row.active === 0) {
    return false
  }

  if (row.status === 3) {
    return false
  }

  if (row.status === 2) {
    return false
  }

  if (row.status === 4) {
    return false
  }

  return true
}

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, width: '64px', selectable: selectable },
  { prop: 'claimNumber', label: '单据号', width: '180px' },
  { prop: 'channelType', label: '渠道系统', minWidth: '150px' },
  { prop: 'claimType', label: '单据类型', minWidth: '150px', formatter: formatter('transcode', 'claim_bill_type') },
  { prop: 'sellerCompanyName', label: '卖方名称', minWidth: '150px' },
  { prop: 'batchNo', label: '批次号', minWidth: '150px' },
  { prop: 'receiveTime', label: '单据接收日期', width: '180px' },
  { prop: 'tradeAmount', label: '单据金额', align: 'right', width: '150px', formatter: formatter('currency') },
  { prop: 'effectTime', label: '基础债权生效时间', width: '180px' },
  { prop: 'expirationTime', label: '基础债权失效时间', width: '180px' },
  { prop: 'status', label: '流转状态', minWidth: '150px', formatter: formatter('transcode', 'claim_circulation_status') },
  { prop: 'active', label: '有效状态', minWidth: '150px', formatter: formatter('transcode', 'active_status') },
  { prop: 'projectName', label: '项目名称', minWidth: '150px' },
  { prop: 'orderNumber', label: '融资订单号', minWidth: '150px' },
  { prop: 'isRisk', label: '是否触碰', minWidth: '150px', formatter: formatter('transcode', '_yesOrNo') },
  { prop: 'invalidReason', label: '触碰说明', minWidth: '150px' },
  { prop: 'opt', label: '操作', fixed: 'right', align: 'left', minWidth: '100px' }
]
