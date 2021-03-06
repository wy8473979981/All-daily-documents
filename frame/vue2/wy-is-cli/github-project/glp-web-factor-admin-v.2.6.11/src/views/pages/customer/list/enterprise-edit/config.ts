import { validator } from '@/config/validator'
import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, multiEmailOptions, emailSep } from '@/config/form'
import { getCities, getCounties, cascadeRegions } from '@/config/region'
import { formatter } from '@/config/table'

export const changeLowId = ({ form, value }: any) => {
  if (form) form.lawPersonCertificateType = value
}

export const baseFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'customerType', label: '客户类型', options: { disabled: true, options: d('charCustomerType') } },
  { type: 'text', model: 'name', label: '客户名称', rules: [{ required: true, message: '请输入客户名称' }, { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }] },
  { type: 'select', model: 'certificateType', label: '证件类型', options: { disabled: true, options: d('bank_dsfzjlx') } },
  { type: 'text', model: 'certificateId', label: '证件号', options: { disabled: true } },
  {
    type: 'text',
    model: 'lawPersonName',
    label: '法人',
    rules: [{ min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }]
  },
  { type: 'select', model: 'lawPersonCertificateType', label: '证件类型', options: { options: d('bank_dsfzjlx'), onValueChange: changeLowId } },
  { type: 'text', model: 'lawPersonCertificateId1', label: '法人证件号', dependOn: 'form.lawPersonCertificateType == 1', rules: [{ validator: validator('id-card'), trigger: 'blur' }] },
  { type: 'text', model: 'lawPersonCertificateId', label: '法人证件号', dependOn: 'form.lawPersonCertificateType == 3 || form.lawPersonCertificateType == ""', rules: [{ validator: validator('credit-code'), trigger: 'blur' }] },
  { type: 'text', model: 'lawPersonMobile', label: '法人手机号', rules: [{ validator: validator('tel'), trigger: 'blur' }] },
  {
    type: 'text',
    model: 'actualControllerName',
    label: '实际控制人',
    rules: [{ min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }]
  },
  { type: 'select', model: 'actualControllerCertificateType', label: '证件类型', options: { options: d('bank_dsfzjlx') } },
  {
    type: 'text',
    model: 'actualControllerCertificateId1',
    label: '实控人证件号',
    dependOn: 'form.actualControllerCertificateType == 1',
    rules: [{ validator: validator('id-card'), trigger: 'blur' }]
  },
  {
    type: 'text',
    model: 'actualControllerCertificateId',
    label: '实控人证件号',
    dependOn: 'form.actualControllerCertificateType == 3 || form.actualControllerCertificateType == ""',
    rules: [{ validator: validator('credit-code'), trigger: 'blur' }]
  },
  { type: 'text', model: 'actualControllerMobile', label: '实控人手机号', rules: [{ validator: validator('tel'), trigger: 'blur' }] },
  { type: 'select', model: 'addressProvince', label: '注册地省', options: { options: d('_province') } },
  { type: 'select', model: 'addressCity', label: '注册地市', options: { options: ({ form }) => Promise.resolve(getCities(form.addressProvince)) } },
  { type: 'select', model: 'addressCounty', label: '注册地区/县', options: { options: ({ form }) => Promise.resolve(getCounties(form.addressCity)) } },
  { type: 'text', model: 'addressDetail', label: '注册地详细地址' },
  { type: 'select', model: 'businessAddressProvince', label: '经营地省', options: { options: d('_province') } },
  { type: 'select', model: 'businessAddressCity', label: '经营地市', options: { options: ({ form }) => Promise.resolve(getCities(form.businessAddressProvince)) } },
  { type: 'select', model: 'businessAddressCounty', label: '经营地区/县', options: { options: ({ form }) => Promise.resolve(getCounties(form.businessAddressCity)) } },
  { type: 'text', model: 'businessAddressDetail', label: '经营地详细地址' },
  { type: 'select', model: 'enterpriseNature', label: '所属行业', options: { options: d('enterpriseNature') } },
  { type: 'text', model: 'enterpriseEmail', label: '邮箱', options: { placeholder: '多个邮箱用逗号分隔' }, rules: [{ validator: validator('email'), trigger: 'blur', sep: ',', message: '多个邮箱用逗号分隔' }] },
  { type: 'text', model: 'enterpriseFax', label: '传真', rules: [{ validator: validator('phone'), trigger: 'blur' }] },
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
