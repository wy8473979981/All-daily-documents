import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
import { filter, FilterName } from '@/filters'
const formatter1 = (filterName: any, ...args: any[]) => {
  return (row: any, column: any, cellValue: string, index: number) => {
    if (cellValue === null || cellValue === '') {
      return '-'
    } else {
      if (filterName === 'text') {
        return cellValue
      } else {
        return filter(filterName, cellValue, ...args)
      }
    }
  }
}

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号', options: { placeholder: '请输入结算单号' } },
  { type: 'select', model: 'invoiceStatus', label: '开票状态', options: { options: d('invoice_kpzt'), placeholder: '请选择开票状态' } },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px', selectable: (row: any) => row.isApply },
  { prop: 'settlementNo', label: '结算单号', minWidth: '120px' },
  { prop: 'billingType', label: '开票类目', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_kplm')[cellValue] },
  { prop: 'canInvoicingSum', label: '可开票金额(元)', minWidth: '100px', formatter: formatter1('number') },
  { prop: 'alreadyInvoicingSum', label: '已开票金额(元)', minWidth: '100px', formatter: formatter1('number') },
  { prop: 'invoicingSum', label: '开票中金额(元)', minWidth: '100px', formatter: formatter1('number') },
  { prop: 'invoiceStatus', label: '开票状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_kpzt')[cellValue] },
  { prop: 'failingReason', label: '失败原因', minWidth: '150px', formatter: formatter1('text') },
  { prop: 'createTime', label: '申请时间', minWidth: '180px', formatter: formatter1('date', 'T') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '80px' }
]
