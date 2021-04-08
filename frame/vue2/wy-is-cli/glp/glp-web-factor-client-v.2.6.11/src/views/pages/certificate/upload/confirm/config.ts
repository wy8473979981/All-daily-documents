import { FieldDef, TableColumnDef } from '@/types'
import { d, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'
const codeValidator = ({ form }: any, value: any, callback: any) => {
  const vali = form.invoiceType === '1' || form.invoiceType === '4'
  if (vali && value === '') {
    callback(new Error('当发票类型为普通发票时,发票验证码不能为空'))
  } else {
    callback()
  }
}
export const baseFormDefs: FieldDef[] = [
  { type: 'text', model: 'invoiceNo', label: '发票号码', rules: [{ required: true, message: '请输入发票号码' }] },
  { type: 'text', model: 'invoiceCode', label: '发票代码', rules: [{ required: true, message: '请输入发票代码' }] },
  { type: 'select', model: 'invoiceType', label: '发票类型', options: { options: d('invoiceType') } },
  { type: 'text', model: 'sellerCompName', label: '销售方名称' },
  { type: 'text', model: 'buyerCompName', label: '购买方名称' },
  { type: 'date', model: 'invoicingTime', label: '开票日期', rules: [{ required: true, message: '请选择开票日期', type: 'date' }], options: { type: 'date' } },
  { type: 'number', model: 'invoiceMoney', label: '发票价税合计' },
  { type: 'number', model: 'invoiceTaxExclusiveMoney', label: '发票不含税金额', rules: [{ required: true, message: '请输入发票不含税金额', type: 'number' }] },
  { type: 'text', model: 'invoiceCheckCode', label: '发票验证码', rules: [{ validator: codeValidator, trigger: 'blur', sep: ',' }] },
  { type: 'number', model: 'invoiceTaxMoney', label: '发票税额' },
  { type: 'text', model: 'remark', label: '备注' }
]

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'invoiceNo', label: '发票号码', minWidth: '120px' },
  { prop: 'invoiceCode', label: '发票代码', minWidth: '120px' },
  { prop: 'buyerCompName', label: '购买方名称', minWidth: '200px' },
  { prop: 'sellerCompName', label: '销售方名称', minWidth: '200px' },
  { prop: 'invoicingTime', label: '开票日期', minWidth: '110px', formatter: formatter('date') },
  { prop: 'invoiceTaxExclusiveMoney', label: '发票不含税金额', width: '120px', formatter: formatter('number') },
  { prop: 'invoiceTaxMoney', label: '发票税额', minWidth: '80px', formatter: formatter('number') },
  { prop: 'invoiceMoney', label: '发票价税合计', minWidth: '120px', formatter: formatter('number') },
  { prop: 'invoiceCheckCode', label: '发票验证码', minWidth: '200px' },
  { prop: 'invoiceType', label: '发票类型', minWidth: '150px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoiceType')[cellValue] },
  { prop: 'remark', label: '备注', minWidth: '300px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue || '-' }
]
