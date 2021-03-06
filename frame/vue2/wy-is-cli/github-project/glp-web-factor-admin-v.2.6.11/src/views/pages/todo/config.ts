import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const approvalFormDefs: FieldDef[] = [
  { type: 'select', model: 'businessType', label: '业务类型', options: { options: d('business_type') } },
  { type: 'select', model: 'productType', label: '产品', options: { options: d('product_type') } },
  { type: 'text', model: 'oderNo', label: '业务单号' }
]

export const doneFormDefs: FieldDef[] = [
  { type: 'select', model: 'businessType', label: '业务类型', options: { options: d('business_type') } },
  { type: 'select', model: 'productType', label: '产品', options: { options: d('product_type') } },
  { type: 'text', model: 'oderNo', label: '业务单号' },
  { type: 'date', model: 'creatDate', label: '创建日期', options: { type: 'daterange', format: datetime } }
]

export const approvalColumns: TableColumnDef[] = [
  { prop: 'wfId', label: '工单编号', fixed: 'left', minWidth: '200px' },
  { prop: 'orderNo', label: '业务单号', minWidth: '200px' },
  { prop: 'orderTitle', label: '标题', minWidth: '200px' },
  { prop: 'procDefName', label: '流程名称', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px' },
  { prop: 'updateTime', label: '完成时间', minWidth: '200px' },
  { prop: 'currentNode', label: '当前节点', minWidth: '200px' },
  { prop: 'orderStatus', label: '状态', minWidth: '200px', formatter: formatter('transcode', 'orderStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]

export const doneColumns: TableColumnDef[] = [
  { prop: 'wfId', label: '工单编号', fixed: 'left', minWidth: '200px' },
  { prop: 'orderNo', label: '业务单号', minWidth: '200px' },
  { prop: 'orderTitle', label: '标题', minWidth: '200px' },
  { prop: 'procDefName', label: '流程名称', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px' },
  { prop: 'updateTime', label: '完成时间', minWidth: '200px' },
  { prop: 'currentNode', label: '当前节点', minWidth: '200px' },
  { prop: 'orderStatus', label: '状态', minWidth: '200px', formatter: formatter('transcode', 'orderStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]

export const routerMapping: any = {
  LC000071: {
    authUrl: '/customer/bank/actual/detail?processId=<businessNo>',
    detailUrl: '/customer/bank/actual/detail?processId=<businessNo>&isDetail=1'
  },
  LC000098: {
    authUrl: '/project/product/edit/<businessNo>?type=auth&queryParam=processId',
    detailUrl: '/project/product/edit/<businessNo>?type=auth&queryParam=processId'
  }
}
