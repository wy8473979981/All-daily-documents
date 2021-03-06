import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'
const remindRealNameFn = (row: any, column: any, cellValue: string, index: number) => {
  if (row.signerName.includes('普洛斯')) {
    return '--'
  }
  return cellValue ? '已实名' : '未实名'
}
const contact = (row: any, column: any, cellValue: string, index: number) => row.signerName.includes('普洛斯') ? '--' : cellValue
const signColumns = [
  { prop: 'signerName', label: '签署方', minWidth: '240px' },
  { prop: 'signerType', label: '角色', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('signer_type')[cellValue] !== '自定义' ? d('signer_type')[cellValue] : '--' },
  { prop: 'signerMobile', label: '联系方式', minWidth: '120px', formatter: contact },
  { prop: 'isRealname', label: '实名状态', minWidth: '120px', formatter: remindRealNameFn }
]
export const signColumns1: TableColumnDef[] = [
  ...signColumns,
  { prop: 'autoSign', label: '签署类型', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue ? '自动签' : '手动签' },
  { prop: 'opt', label: '操作', minWidth: '80px' }
]

export const ledgerColumns1: TableColumnDef[] = [
  ...signColumns,
  { prop: 'status', label: '签署状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('signer_status')[cellValue] },
  { prop: 'opt', label: '操作', minWidth: '120px' }
]

export const signColumns2: TableColumnDef[] = [
  { prop: 'signerName', label: '签署方', minWidth: '240px' },
  { prop: 'signerType', label: '角色', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('signer_type')[cellValue] !== '自定义' ? d('signer_type')[cellValue] : '--' },
  { prop: 'signerMobile', label: '联系方式', minWidth: '120px', formatter: contact },
  { prop: 'isRealname', label: '实名状态', minWidth: '120px', formatter: remindRealNameFn }
]

export const ledgerColumns2: TableColumnDef[] = [
  ...signColumns2,
  { prop: 'status', label: '签署状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('signer_status')[cellValue] }
]
