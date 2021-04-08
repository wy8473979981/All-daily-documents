import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
import { getCities, getCounties } from '@/config/region'

export const baseFormDefs: FieldDef[] = [
  { type: 'plain', model: 'name', label: '企业名称', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'certificateId', label: '统一社会信用代码', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'addressChar', label: '注册地址', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'enterpriseNature', label: '所属行业', /* rules: [{ required: true }], */ options: { disabled: true } },
  { type: 'plain', model: 'lawPersonName', label: '法定代表人', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'lawPersonMobile', label: '法人手机号', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'certificateId', label: '法人证件号', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'enterpriseFax', label: '企业传真', /* rules: [{ required: true }], */ options: { disabled: true } }
]

export const billingFormDefs: FieldDef[] = [
  { type: 'plain', model: 'invoiceName', label: '企业名称', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'taxpayerIdentificationNumber', label: '纳税人识别号', rules: [{ required: true }], options: { disabled: true } }
]

export const bankFormDefs: FieldDef[] = [
  { type: 'plain', model: 'bankAccountName', label: '账户名称', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'bankAccountNumber', label: '银行账号', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'bankName', label: '开户银行全称', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'bankBranchName', label: '开户支行全称', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'bankProvince', label: '省/自治区/直辖市', rules: [{ required: true }], options: { disabled: true } },
  { type: 'plain', model: 'bankCity', label: '市/地区/州', rules: [{ required: true }], options: { disabled: true } }
]

export const contactFormDefs: FieldDef[] = [
  { type: 'plain', model: 'contactName', label: '姓名', rules: [{ required: true }] },
  { type: 'plain', model: 'contactMobile', label: '电话', rules: [{ required: true }] },
  { type: 'plain', model: 'contactEmail', label: '邮箱', rules: [{ required: true }] },
  // { type: 'text', model: 'deliveryAddress', label: '法律文书送达地址', rules: [{ required: true, message: '必填' }] },
  // { type: 'plain', model: 'deliveryAddressProvince', label: '省', options: { options: d('_province') }, rules: [{ required: true, message: '必填' }] },
  // { type: 'plain', model: 'deliveryAddressCity', label: '市', rules: [{ required: true, message: '必填' }], options: { options: ({ form }) => Promise.resolve(getCities(form.deliveryAddressProvince)) } },
  // { type: 'plain', model: 'deliveryAddressCounty', label: '区', rules: [{ required: true, message: '必填' }], options: { options: ({ form }) => Promise.resolve(getCounties(form.deliveryAddressCity)) } },
  { type: 'plain', model: 'deliveryAddressChar', label: '法律文书送达地址', rules: [{ required: true, message: '必填' }] }
]
