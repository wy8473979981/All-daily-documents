import { TableColumnDef } from '@/types'
import { d } from '@/config/form'
import { formatter } from '@/config/table'
const changeStatus = (row: any, column: any, cellValue: any, index: number) => {
  if (cellValue === null) {
    return '-'
  } else if (cellValue === 1) {
    return '成功'
  } else {
    return '失败'
  }
}
const failReason = (row: any, column: any, cellValue: any, index: number) => {
  if (cellValue === null) {
    return '-'
  } else {
    return cellValue
  }
}
export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'uploadTime', label: '发票上传日期', minWidth: '110px', formatter: formatter('date') },
  { prop: 'invoiceNo', label: '发票号码', minWidth: '120px' },
  { prop: 'buyerCompName', label: '购买方名称', minWidth: '220px' },
  { prop: 'sellerCompName', label: '销售方名称', minWidth: '220px' },
  { prop: 'invoicingTime', label: '开票日期', minWidth: '110px', formatter: formatter('date') },
  { prop: 'invoiceTaxExclusiveMoney', label: '发票不含税金额', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceTaxMoney', label: '发票税额', minWidth: '80px', formatter: formatter('number') },
  { prop: 'invoiceMoney', label: '发票价税合计', minWidth: '110px', formatter: formatter('number') },
  { prop: 'invoiceCheckCode', label: '发票验证码', minWidth: '200px' },
  { prop: 'invoiceType', label: '发票类型', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoiceType')[cellValue] },
  { prop: 'remark', label: '备注', minWidth: '120px' },
  { prop: 'recognizeStatus', label: '识别状态', minWidth: '80px', formatter: changeStatus },
  { prop: 'recognizeFailCause', label: '识别失败原因', minWidth: '110px' },
  { prop: 'verifyStatus', label: '验证状态', minWidth: '80px', formatter: changeStatus },
  { prop: 'verifyFailCause', label: '验证失败原因', minWidth: '200px', formatter: failReason },
  { prop: 'fileName', label: '文件名', minWidth: '110px' },
  { prop: 'opt', label: '发票文件', minWidth: '80px', fixed: 'right' }
]
