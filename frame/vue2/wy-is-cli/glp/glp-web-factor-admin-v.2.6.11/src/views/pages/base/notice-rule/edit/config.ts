import { FieldDef, TableColumnDef } from '@/types'
import { d, date, datetime } from '@/config/form'

// import { messageTpl, normalEmailTpl, bussnessEmailTpl, clientEmailTpl } from '@/config/content-tpl'

export const baseFormDefs: FieldDef[] = [
  { type: 'text', model: 'id', label: '模板编码', options: { disabled: true } },
  { type: 'text', model: 'bussnessType', label: '业务类型', options: { disabled: true } },
  { type: 'text', model: 'createTime', label: '创建时间', options: { disabled: true } },
  { type: 'text', model: 'modifyTime', label: '最新修改时间', options: { disabled: true } },
  { type: 'text', model: 'information', label: '说明', options: { disabled: true } },
  { type: 'textarea', model: 'noteType', label: '参数说明', options: { disabled: true, rows: 2, autosize: { minRows: 2, maxRows: 6 } } }
]

export const messageNotice: FieldDef[] = [
  { type: 'select', model: 'messageNoticeStatus', label: '短信提醒状态', options: { options: d('controlStatus'), defaultValue: d('controlStatus')[0] } },
  { type: 'time', model: 'messageNoticeTime', label: '短信提醒时间', options: { type: 'timerange' } },
  { type: 'select', model: 'messageNoticeStep', label: '短信提醒频率', options: { options: d('noticeStep'), defaultValue: d('noticeStep')[0] } },
  { type: 'textarea', model: 'messageContent', label: '短信内容', options: { rows: 2, autosize: { minRows: 2, maxRows: 6 } } }
]

export const emailNotice: FieldDef[] = [
  { type: 'select', model: 'emailNoticeStatus', label: '邮件提醒状态', options: { options: d('controlStatus'), defaultValue: d('controlStatus')[0] } },
  { type: 'time', model: 'emailNoticeTime', label: '邮件提醒时间', options: { type: 'timerange' } },
  { type: 'select', model: 'emailNoticeStep', label: '邮件提醒频率', options: { options: d('noticeStep'), defaultValue: d('noticeStep')[0] } },
  { type: 'text', model: 'emailTheme', label: '邮件主题' },
  { type: 'textarea', model: 'emailContent', label: '邮件正文', options: { rows: 2, autosize: { minRows: 2, maxRows: 6 } } }
]

export const bussnessMessage: FieldDef[] = [
  { type: 'select', model: 'bussnessNoticeStatus', label: '站内信提醒状态', options: { options: d('controlStatus'), defaultValue: d('controlStatus')[0] } },
  { type: 'text', model: 'bussnessTheme', label: '站内信主题' },
  { type: 'textarea', model: 'bussnessContent', label: '短信内容', options: { rows: 2, autosize: { minRows: 2, maxRows: 6 } } }
]

export const clientMessage: FieldDef[] = [
  { type: 'select', model: 'clientNoticeStatus', label: '站内信提醒状态', options: { options: d('controlStatus'), defaultValue: d('controlStatus')[0] } },
  { type: 'text', model: 'clientTheme', label: '站内信主题' },
  { type: 'textarea', model: 'clientContent', label: '短信内容', options: { rows: 2, autosize: { minRows: 2, maxRows: 6 } } }
]
