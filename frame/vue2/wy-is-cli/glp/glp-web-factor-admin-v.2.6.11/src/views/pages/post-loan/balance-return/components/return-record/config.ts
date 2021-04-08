import { FieldDef, TableColumnDef } from '@/types'
import { a, d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'plain', model: 'saleCompany', label: '融资企业' },
  { type: 'plain', model: 'payTime', label: '拨付记录生成时间' },
  { type: 'plain', model: 'applyAmount', label: '拨出总金额' },
  { type: 'plain', model: 'bankSerialNo', label: '拨出银行流水' }
]
