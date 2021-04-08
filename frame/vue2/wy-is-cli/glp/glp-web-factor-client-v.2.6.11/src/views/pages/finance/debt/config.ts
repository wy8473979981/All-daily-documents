import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, date, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称' },
  { type: 'text', model: 'buyerCompanyName', label: '买方名称' },
  { type: 'select', model: 'status', label: '应收账款状态', options: { options: d('debt_status_cust') } },
  { type: 'select', model: 'projectId', label: '授信项目', options: { ...remote('project-name') } },
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款编号' },
  { type: 'date', model: 'submitTime', label: '提交时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '64px', fixed: 'left' },
  { prop: 'projectName', label: '授信项目', width: '220px' },
  { prop: 'debtType', label: '产品模式', width: '120px', formatter: formatter('transcode', 'product_type') },
  { prop: 'debtReceivableNumber', label: '应收账款编号', width: '180px' },
  { prop: 'debtReceivableName', label: '应收账款名称', width: '180px' },
  { prop: 'buyerCompanyName', label: '买方名称', width: '180px' },
  { prop: 'sellerCompanyName', label: '卖方名称', width: '180px' },
  { prop: 'amount', label: '（预估）应收账款金额', formatter: formatter('currency'), width: '160px' },
  { prop: 'transferSubmitTime', label: '提交时间', width: '160px', sortable: 'custom' },
  { prop: 'transferEndTime', label: '应收账款截止时间', width: '160px', sortable: 'custom' },
  { prop: 'status', label: '应收账款审批状态', formatter: formatter('transcode', 'debt_status_cust'), width: '80px' },
  { prop: 'useStatus', label: '应收账款使用状态', formatter: formatter('transcode', 'use_status'), width: '80px' },
  { prop: 'contractStatus', label: '是否生成融资合同', formatter: formatter('transcode', 'contract_status'), width: '120px' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '200px', align: 'left' }
]
