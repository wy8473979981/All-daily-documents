import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { formatter } from '@/config/table'
import { d, datetime } from '@/config/form'
export const columns: TableColumnDef[] = [
  { prop: 'contractTypeId', label: '合同类型', minWidth: '200px', formatter: (row: any, column: any, cellValue: string, index: number) => d('contract_type')[cellValue] },
  { prop: 'versionNumber', label: '版本号', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => `v${cellValue}.0` },
  { prop: 'fileName', label: '文件名', minWidth: '300px' },
  { prop: 'updatedContent', label: '本次调整点', minWidth: '300px' },
  { prop: 'createTime', label: '产生时间', minWidth: '150px', formatter: formatter('date', 'T') },
  { prop: 'operatorName', label: '操作人', minWidth: '150px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '100px' }
]
