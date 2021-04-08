import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'

export const signColumns = [
  { prop: 'signerName', label: '签署方', minWidth: '180px' },
  { prop: 'signerMobile', label: '联系方式', minWidth: '120px' },
  { prop: 'status', label: '签署状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('signer_status')[cellValue] }
]
