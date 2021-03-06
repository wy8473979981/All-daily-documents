import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
const changeStatus = (row: any, column: any, cellValue: any, index: number) => {
  if (cellValue === null) {
    return '-'
  } else {
    return cellValue
  }
}
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'uploadBatchId', label: '上传批次号', options: { placeholder: '请输入上传批次号' } },
  { type: 'date', model: 'time', label: '发票上传时间', options: { type: 'daterange', format: datetime } },
  { type: 'select', model: 'status', label: '批次状态', options: { options: d('invoice_pczt'), placeholder: '请选择批次状态' } }
]
export function changeTime (params: any) {
  if (Object.keys(params).length) {
    const { time, ...other } = params
    other.beginTime = time[0]
    other.endTime = time[1]
    return other
  }
  return params
}
export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'uploadTime', label: '发票上传日期', minWidth: '150px', formatter: formatter('date') },
  { prop: 'uploadBatchId', label: '批次号', minWidth: '180px' },
  { prop: 'batchType', label: '批次类型', minWidth: '150px', formatter: (row: any, column: any, cellValue: string, index: number) => d('batchType')[cellValue] },
  { prop: 'status', label: '批次状态', minWidth: '150px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_pczt')[cellValue] },
  { prop: 'invoiceUploadNumber', label: '发票上传张数', minWidth: '150px', formatter: changeStatus },
  { prop: 'recognizeSuccessNumber', label: '识别成功张数', minWidth: '150px', formatter: changeStatus },
  { prop: 'recognizeFailNumber', label: '识别失败张数', minWidth: '150px', formatter: changeStatus },
  { prop: 'verifySuccessNumber', label: '验证成功张数', minWidth: '150px', formatter: changeStatus },
  { prop: 'verifyFailNumber', label: '验证失败张数', minWidth: '150px', formatter: changeStatus },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '150px' }
]
