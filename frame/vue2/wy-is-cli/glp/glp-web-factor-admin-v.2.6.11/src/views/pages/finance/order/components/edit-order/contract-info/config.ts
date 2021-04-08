import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'contractName', label: '合同模板名称' },
  { prop: 'signMethod', label: '签署方式', formatter: formatter('transcode', 'sign_method') },
  { prop: 'signStatus', label: '签署状态', formatter: formatter('transcode', 'ht_signer_status') },
  { prop: 'signTime', label: '签署完成时间', formatter: formatter('date', 'T') },
  { prop: 'signedContractUrl', label: '合同内容查看' }
]
