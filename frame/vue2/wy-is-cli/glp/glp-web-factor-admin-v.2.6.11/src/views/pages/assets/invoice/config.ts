import { FieldDef, TableColumnDef } from '@/types'
import { d, p, remote, datetime, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'
const onValueChange = ({ form, items }: any) => {
  const project = items.find((x: any) => x.projectId === form.projectId)
  form.projectName = project.projectName
}
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'invoiceNo', label: '发票号码', options: { placeholder: '请输入发票号码' } },
  { type: 'select', model: 'projectId', label: '项目名称', options: { ...remote('project-name'), placeholder: '请输入项目名称', onValueChange: onValueChange } },
  { type: 'text', model: 'orderNumber', label: '融资订单号', options: { placeholder: '请输入融资订单号' } },
  { type: 'text', model: 'sellerCompName', label: '销售方', options: { placeholder: '请输入销售方' } },
  { type: 'text', model: 'buyerCompName', label: '购买方', options: { placeholder: '请输入购买方' } },
  { type: 'select', model: 'useStatus', label: '使用状态', options: { options: d('invoice_syzt'), placeholder: '请选择使用状态' } },
  { type: 'select', model: 'isValid', label: '有效状态', options: { options: d('active_status'), placeholder: '请选择有效状态' } },
  { type: 'select', model: 'verifyStatus', label: '验证状态', options: { options: d('invoice_yzzt'), placeholder: '请选择验证状态' } },
  { type: 'date', model: 'time', label: '开票日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px', selectable: (row: any) => row.useStatus === 2 },
  { prop: 'invoiceNo', label: '发票号码', minWidth: '120px' },
  { prop: 'invoiceCode', label: '发票代码', minWidth: '120px' },
  { prop: 'buyerCompName', label: '购买方名称', minWidth: '300px' },
  { prop: 'sellerCompName', label: '销售方名称', minWidth: '180px' },
  { prop: 'invoicingTime', label: '开票日期', minWidth: '120px', formatter: formatter('date') },
  { prop: 'invoiceTaxExclusiveMoney', label: '发票不含税金额(元)', width: '160px', align: 'right', formatter: formatter('currency') },
  { prop: 'invoiceTaxMoney', label: '税额(元)', width: '140px', align: 'right', formatter: formatter('currency') },
  { prop: 'invoiceMoney', label: '发票价税合计(元)', width: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'invoiceCheckCode', label: '发票验证码', minWidth: '200px' },
  { prop: 'invoiceType', label: '发票类型', minWidth: '160px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoiceType')[cellValue] },
  { prop: 'remark', label: '备注', minWidth: '200px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue || '-' },
  { prop: 'projectName', label: '项目名称', minWidth: '180px' },
  { prop: 'orderNumber', label: '融资订单号', minWidth: '180px' },
  { prop: 'isModify', label: '客户是否修改', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue ? '是' : '否' },
  { prop: 'isValid', label: '有效状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('active_status')[cellValue] },
  { prop: 'useStatus', label: '使用状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_syzt')[cellValue] },
  { prop: 'recentVerifyTime', label: '最近一次验证时间', minWidth: '140px', formatter: formatter('date') },
  { prop: 'verifyStatus', label: '验证状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_yzzt')[cellValue] },
  { prop: 'verifyFailCause', label: '验证失败原因', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
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
