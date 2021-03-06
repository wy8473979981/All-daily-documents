import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { formatter as f, d } from '@/config/form'
const dependOn = ({ form }: any) => {
  return form.signMethod === '3'
}

export const defs = [
  { def: { type: 'plain', model: 'projectName', label: '项目名称', options: { labelWidth: '90px' } }, span: 24 },
  { def: { type: 'plain', model: 'contractTypeId', label: '合同类型', options: { formatter: f('transcode', 'contract_type'), labelWidth: '90px' } }, span: 12 },
  { def: { type: 'plain', model: 'contractName', label: '合同名称', options: { labelWidth: '90px' } }, span: 12 },
  { def: { type: 'custom', model: 'fileName', label: '合同文本', customType: 'link', options: { labelWidth: '90px' } }, span: 12 },
  { def: { type: 'plain', model: 'versionNumber', label: '版本号', options: { labelWidth: '90px', formatter: (x: any) => `v${x}.0` } }, span: 12 },
  { def: { type: 'plain', model: 'signMethod', label: '签署方式', options: { formatter: f('transcode', 'sign_method'), labelWidth: '90px' } }, span: 24 }
]
export const emailConfig: Array<FieldDef | GridFieldDef> = [
  { def: { type: 'plain', model: 'enableEmailNotify', label: '是否发送邮件通知', options: { labelWidth: '140px', formatter: (x: any) => x ? '是' : '否' }, dependOn: dependOn }, span: 24 },
  { def: { type: 'plain', model: 'emailNotifyAddress', label: '邮箱', options: { labelWidth: '140px' }, dependOn: dependOn }, span: 24 },
  { def: { type: 'custom', model: 'emailNotifyStatus', label: '邮件发送状态', customType: 'emailNotifyStatus', options: { labelWidth: '140px' }, dependOn: dependOn }, span: 24 }
]
