import { FieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'bussnessType', label: '业务类型', options: { options: d('bussnessType'), defaultValue: d('bussnessType')[0] } },
  { type: 'text', model: 'bussnessNo', label: '业务单号' },
  { type: 'text', model: 'noticeName', label: '被通知人名称' },
  { type: 'select', model: 'noticeStyle', label: '通知方式', options: { options: d('noticeStyle'), defaultValue: d('noticeStyle')[0] } },
  { type: 'select', model: 'noteStatus', label: '通知状态', options: { options: d('noteStatus'), defaultValue: d('noteStatus')[0] } }
]

export const columns: TableColumnDef[] = [
  { prop: 'bussnessType', label: '业务类型', fixed: 'left', minWidth: '200px' },
  { prop: 'sendTime', label: '发送时间', minWidth: '200px' },
  { prop: 'bussnessNo', label: '业务单号', minWidth: '200px' },
  { prop: 'noticeStyle', label: '通知方式', minWidth: '200px' },
  { prop: 'noticeType', label: '被通知人类型', minWidth: '200px' },
  { prop: 'noticeName', label: '被通知人名称', minWidth: '200px' },
  { prop: 'emailPhone', label: '邮件地址/手机号码', minWidth: '200px' },
  { prop: 'noteStatus', label: '通知状态', minWidth: '200px' },
  { prop: 'noteTheme', label: '通知主题', minWidth: '200px' },
  { prop: 'noteContent', label: '通知内容', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
