import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
export const defs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: '', label: '合同类型' },
  { type: 'plain', model: 'type', label: '合同名称' },
  { type: 'plain', model: 'channel', label: '合同文本' },
  { type: 'plain', model: 'seller', label: '版本号' },
  { type: 'plain', model: '', label: '说明' },
  { type: 'plain', model: 'amount', label: '签署方1' },
  { type: 'plain', model: '', label: '签署方2' },
  { type: 'plain', model: '', label: '本次调整点' }
]

export const columns1: TableColumnDef[] = [
  { prop: 'a', label: '合同名称', minWidth: '150px' },
  { prop: 'b', label: '版本号', minWidth: '150px' },
  { prop: 'c', label: '文件名', minWidth: '150px' },
  { prop: 'd', label: '本次调整点', minWidth: '150px' },
  { prop: 'e', label: '产生时间', minWidth: '150px' },
  { prop: 'f', label: '操作人', minWidth: '150px' },
  { prop: 'g', label: '操作', minWidth: '150px' }
]

export const columns2: TableColumnDef[] = [
  { prop: 'settlementNo', label: '操作类型', minWidth: '150px' },
  { prop: 'billingType', label: '合同名称', minWidth: '150px' },
  { prop: 'canInvoicingSum', label: '版本号', minWidth: '150px' },
  { prop: 'alreadyInvoicingSum', label: '文件名', minWidth: '150px' },
  { prop: 'invoicingSum', label: '说明', minWidth: '150px' },
  { prop: 'applyStatus', label: '操作时间', minWidth: '150px' },
  { prop: 'invoiceStatus', label: '操作人', minWidth: '150px' }
]
