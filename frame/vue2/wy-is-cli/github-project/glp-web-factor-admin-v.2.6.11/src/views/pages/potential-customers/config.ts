import { FieldDef, TableColumnDef } from '@/types'
import { d, a, p, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'createTime', label: '申请时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'loginName', label: '客户登录账号', minWidth: '200px' },
  { prop: 'customerName', label: '企业名称', minWidth: '200px' },
  { prop: 'status', label: '企业实名状态', minWidth: '200px', formatter: formatter('transcode', 'smzt_ed') }
]
