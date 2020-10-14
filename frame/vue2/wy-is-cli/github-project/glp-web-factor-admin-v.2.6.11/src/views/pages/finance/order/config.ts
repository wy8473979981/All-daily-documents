import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称' },
  { type: 'text', model: 'buyerCompanyName', label: '买方名称' },
  { type: 'text', model: 'orderNumber', label: '订单号' },
  { type: 'select', model: 'productType', label: '产品模式', options: { options: d('product_type') } },
  { type: 'text', model: 'projectName', label: '项目名称' },
  { type: 'text', model: 'principal', label: '项目负责人' },
  { type: 'select', model: 'orderStatus', label: '订单状态', options: { options: d('yun_order_status') } },
  { type: 'date', model: 'submitTime', label: '订单申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '融资申请订单号', width: '180px' },
  { prop: 'amount', label: '应收账款金额', formatter: formatter('currency'), align: 'right', width: '120px' },
  { prop: 'amount', label: '保理金额', formatter: formatter('currency'), align: 'right', width: '120px' },
  { prop: 'handlingFee', label: '保理融资费', formatter: formatter('currency'), align: 'right', width: '120px' },
  { prop: 'productType', label: '产品模式', width: '100px', formatter: formatter('transcode', 'product_type') },
  { prop: 'projectName', label: '项目名称', width: '200px' },
  { prop: 'sellerCompanyName', label: '卖方名称', width: '200px' },
  { prop: 'buyerCompanyName', label: '买方名称', width: '200px' },
  { prop: 'principal', label: '项目负责人', width: '100px' },
  { prop: 'createUser', label: '创建人', width: '80px' },
  { prop: 'bankAccountName', label: '实际收款方', width: '180px' },
  { prop: 'status', label: '订单状态', width: '80px', formatter: formatter('transcode', 'yun_order_status') },
  // { prop: 'flowNode', label: '工单审批状态', width: '120px' },
  { prop: 'invoiceStatus', label: '发票上传状态', width: '120px', formatter: formatter('transcode', '_uploadStatus') },
  { prop: 'createTime', label: '申请时间', width: '160px' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '160px' }
]
