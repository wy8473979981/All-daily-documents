import { TableColumnDef } from '@/types'

export const columns: TableColumnDef[] = [
  { prop: 'id', label: '模板编码', fixed: 'left', minWidth: '200px' },
  { prop: 'templateName', label: '模板名称', minWidth: '200px' },
  { prop: 'bussnessType', label: '业务类型', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px' },
  { prop: 'modifyTime', label: '最新修改时间', minWidth: '200px' },
  { prop: 'information', label: '说明', minWidth: '200px' },
  { prop: 'noteType', label: '通知方式', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '100px' }
]
