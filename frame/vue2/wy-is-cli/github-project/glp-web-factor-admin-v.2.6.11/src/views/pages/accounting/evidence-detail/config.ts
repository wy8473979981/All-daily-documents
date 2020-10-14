import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') } },
  { type: 'text', model: 'debtNo', label: '借据编号' },
  { type: 'text', model: 'voucherName', label: '凭证名称' },
  { type: 'select', model: 'status', label: '凭证状态', options: { options: d('evidenceStatus') } },
  { type: 'select', model: 'syncJdeStatus', label: '同步JED状态', options: { options: d('syncJdeStatus') } },
  {
    type: 'select',
    model: 'dateType',
    label: '日期类型',
    options: {
      options: d('dateType')
    }
  },
  { type: 'date', model: 'dateTime', label: '日期', dependOn: 'form.dateType == 1 || form.dateType == 2 || form.dateType == 3', options: { type: 'daterange', format: 'yyyy-MM-dd' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'debtNo', label: '借据编号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'voucherName', label: '凭证名称', minWidth: '150px' },
  { prop: 'voucherNo', label: '凭证编号', minWidth: '170px' },
  { prop: 'amount', label: '金额(元)', minWidth: '250px', align: 'right', formatter: formatter('currency') },
  { prop: 'accountingDate', label: '记账日期', minWidth: '200px ' },
  { prop: 'createTime', label: '生成日期', minWidth: '200px', formatter: formatter('empty') },
  { prop: 'syncJdeDate', label: '同步日期', minWidth: '200px', formatter: formatter('empty') },
  { prop: 'syncJdeStatus', label: '同步JDE状态', minWidth: '170px', formatter: formatter('transcode', 'syncJdeStatus') },
  { prop: 'status', label: '凭证状态', minWidth: '170px', formatter: formatter('transcode', 'evidenceStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]
