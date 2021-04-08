import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d } from '@/config/form'
import { formatter } from '@/config/table'
const changeStatus = (row: any, column: any, cellValue: any, index: number) => {
  if (cellValue === null) {
    return '-'
  } else {
    return cellValue
  }
}
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'invoiceNo', label: '发票号码', options: { placeholder: '请输入发票号码' } },
  { type: 'text', model: 'buyerCompName', label: '购买方', options: { placeholder: '请输入购买方' } },
  { type: 'date', model: 'time', label: '开票日期', options: { type: 'daterange', format: datetime } }
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
export const columns1: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'invoiceNo', label: '发票号码', minWidth: '120px' },
  { prop: 'invoiceCode', label: '发票代码', minWidth: '120px' },
  { prop: 'buyerCompName', label: '购买方名称', minWidth: '300px' },
  { prop: 'sellerCompName', label: '销售方名称', minWidth: '180px' },
  { prop: 'invoicingTime', label: '开票日期', minWidth: '120px', formatter: formatter('date') },
  { prop: 'invoiceTaxExclusiveMoney', label: '发票不含税金额', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceTaxMoney', label: '发票税额', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceMoney', label: '发票价税合计', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceCheckCode', label: '发票验证码', minWidth: '180px', formatter: changeStatus },
  { prop: 'invoiceType', label: '发票类型', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoiceType')[cellValue] },
  { prop: 'remark', label: '备注', minWidth: '200px', formatter: changeStatus },
  { prop: 'isValid', label: '有效状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('active_status')[cellValue] },
  { prop: 'useStatus', label: '使用状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_syzt')[cellValue] },
  { prop: 'recentVerifyTime', label: '最近一次验证时间', minWidth: '140px', formatter: formatter('date') },
  { prop: 'verifyStatus', label: '验证状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_yzzt')[cellValue] },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '100px' }
]
export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, width: '64px', selectable: (row: any) => row.isValid === 1 && row.useStatus === 2 },
  ...columns1
]
