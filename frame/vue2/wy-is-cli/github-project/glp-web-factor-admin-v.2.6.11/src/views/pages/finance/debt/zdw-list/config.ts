import { FieldDef, TableColumnDef } from '@/types'
import { d, p, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'registerCertificateNo', label: '登记证明编号' },
  { prop: 'projectName', label: '项目名称' },
  { prop: 'contractNumber', label: '保理合同' },
  { prop: 'debtReceivableNumber', label: '应收账款转让登记协议' },
  { prop: 'buyerCompanyName', label: '买方企业' },
  { prop: 'sellerCompanyName', label: '卖方企业' },
  { prop: 'registerTypeName', label: '登记类型' },
  { prop: 'registerTime', label: '登记日期' },
  { prop: 'dueTime', label: '登记期限（月）' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]
