import { validator } from '@/config/validator'
import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, multiEmailOptions, emailSep, requiredRule } from '@/config/form'
import { formatter } from '@/config/table'
import { getCities, getCounties, cascadeRegions } from '@/config/region'

export const baseFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'customerType', label: '客户类型', options: { disabled: true, options: d('charCustomerType') } },
  { type: 'text', model: 'name', label: '客户名称', rules: [{ required: true, message: '请输入客户名称' }, { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }] },
  { type: 'select', model: 'certificateType', label: '证件类型', options: { disabled: true, options: d('bank_dsfzjlx') } },
  // { type: 'text', model: 'certificateId1', label: '证件号', options: { disabled: true }, dependOn: 'form.certificateType == 1', rules: [{ validator: validator('id-card'), trigger: 'blur' }] },
  { type: 'text', model: 'certificateId', label: '证件号', options: { disabled: true } },
  { type: 'select', model: 'addressProvince', label: '通讯地省', options: { options: d('_province') } },
  { type: 'select', model: 'addressCity', label: '通讯地市', options: { options: ({ form }) => Promise.resolve(getCities(form.addressProvince)) } },
  { type: 'select', model: 'addressCounty', label: '通讯地区/县', options: { options: ({ form }) => Promise.resolve(getCounties(form.addressCity)) } },
  { type: 'text', model: 'addressDetail', label: '通讯地详细地址' },
  { type: 'select', model: 'enterpriseNature', label: '所属行业', options: { options: d('enterpriseNature') } },
  { type: 'text', model: 'personalMobile', label: '手机号', rules: [{ validator: validator('tel'), trigger: 'blur' }] },
  { type: 'text', model: 'personalEmail', label: '邮箱', options: { ...multiEmailOptions }, rules: [{ validator: validator('email'), sep: emailSep }] },
  { span: 24, def: { type: 'checkbox', model: 'customerRole', label: '客户角色', options: { options: d('customerRole') } } }
]

export const contractFormDefs: FieldDef[] = [
  {
    type: 'text',
    model: 'contactName',
    label: '联系人姓名',
    rules: [{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }]
  },
  { type: 'text', model: 'contactMobile', label: '联系人手机号', rules: [{ validator: validator('tel'), trigger: 'blur' }] },
  { type: 'cascader', model: 'contactAddr', label: '联系人地址', options: { options: cascadeRegions }, rules: [{ type: 'array' }] },
  { type: 'text', model: 'contactAddress', label: '详细地址' },
  { type: 'text', model: 'contactEmail', label: '联系人邮箱', options: { ...multiEmailOptions }, rules: [{ validator: validator('email'), sep: emailSep }] }
]

export const columns: TableColumnDef[] = [
  { prop: 'proxyerType', label: '代理人类型', fixed: 'left', minWidth: '200px' },
  { prop: 'proxyerName', label: '姓名', minWidth: '200px' },
  { prop: 'proxyerMobile', label: '手机号', minWidth: '200px' },
  { prop: 'proxyerStatus', label: '状态', formatter: formatter('transcode', 'khdl'), minWidth: '200px' },
  { prop: 'file', label: '附件', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]

export const materialTypeMapping: Record<string, string> = {

}
