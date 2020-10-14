import { FieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'

export const companyFormDefs: FieldDef[] = [
  { type: 'text', model: 'companyName', label: '企业名称', rules: [{ required: true, message: '请输入账户名称' }], options: { disabled: true } },
  { type: 'text', model: 'invoiceTitle', label: '发票抬头', options: { disabled: true } },
  { type: 'text', model: 'dutyParagraph', label: '税号', options: { disabled: true } },
  { type: 'text', model: 'companyAddr', label: '公司地址', options: { disabled: true } },
  { type: 'text', model: 'contactPhone ', label: '联系人手机号', options: { disabled: true } },
  { type: 'text', model: 'contactEmail', label: '联系人电子邮箱', options: { disabled: true } },
  { type: 'select', model: 'isCombination ', label: '是否三证合一', options: { options: d('isCombination'), disabled: true } },
  { type: 'text', model: 'socialCreditCode', label: '统一社会信用代码', options: { disabled: true } },
  { type: 'text', model: 'businessLicensePhoto', label: '营业执照照片', options: { disabled: true } },
  { type: 'text', model: 'legalName', label: '法人代表姓名', options: { disabled: true } },
  { type: 'select', model: 'legalCardType', label: '法人代表证件类型', options: { options: d('legalCardType'), disabled: true } },
  { type: 'text', model: 'legalCardNo', label: '法人代表证件号码', options: { disabled: true } },
  { type: 'text', model: 'legalCardFace', label: '法人代表证件正面', options: { disabled: true } },
  { type: 'text', model: 'legalCardBack', label: '法人代表证件背面', options: { disabled: true } },
  { type: 'text', model: 'legalCardPhone', label: '法人代表手机号码', options: { disabled: true } }
]

export const individFormDefs: FieldDef[] = [
  { type: 'text', model: 'contactName', label: '姓名', rules: [{ required: true, message: '请输入账户名称' }], options: { disabled: true } },
  { type: 'text', model: 'contactPhone', label: '联系人手机号', rules: [{ required: true }], options: { disabled: true } },
  { type: 'text', model: 'contactEmail', label: '联系人电子邮箱', rules: [{ required: true }], options: { disabled: true } },
  { type: 'text', model: 'contactAddr', label: '联系地址', options: { disabled: true } },
  { type: 'select', model: 'contactCardType', label: '证件类型', rules: [{ required: true }], options: { options: d('legalCardType'), disabled: true } },
  { type: 'text', model: 'contactCardNo', label: '证件号码', rules: [{ required: true }], options: { disabled: true } },
  { type: 'text', model: 'contactCardFace', label: '证件正面', options: { disabled: true } },
  { type: 'text', model: 'contactCardBack', label: '证件背面', options: { disabled: true } }
]

export const baseFormDefs: FieldDef[] = [
  { type: 'text', model: 'accountName', label: '账户名称', rules: [{ required: true, message: '请输入账户名称' }] },
  { type: 'select', model: 'province', label: '省/自治区/直辖市', rules: [{ required: true }], options: { options: d('province') } },
  { type: 'select', model: 'city', label: '市/地区/州', rules: [{ required: true }], options: { options: d('province') } },
  { type: 'text', model: 'accountNo', label: '银行账号', rules: [{ required: true }] },
  { type: 'select', model: 'openBank', label: '开户行', rules: [{ required: true }] },
  { type: 'select', model: 'openBranchBank', label: '开户支行 ', rules: [{ required: true }] }
]
