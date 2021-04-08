import { validator } from '@/config/validator'
import { format } from '@/utils/date'
import { FieldDef, TableColumnDef, GridFieldDef, TableDef } from '@/types'
import { d, date, datetime, uploadOptions, remote, a, amountOptions, requiredRule, textareaOptions, textOptions, multiEmailOptions, emailSep, dateDisabledFn } from '@/config/form'

import { store } from './store'
import { http } from '@/api/http'

function loadContactInfo (id: any) {
  return http().post('/backend/client/updateCustomerContactInformation', id)
}

const onSellerChange = ({ form, value }: any) => {
  if (!value) {
    store.clearSellerContact()
  } else {
    loadContactInfo(value).then(data => {
      if (!data) store.clearSellerContact()
      else {
        store.sellerContact = {
          sellerContact: data?.contactName || '',
          sellerLawAddress: data?.contactAddress || '',
          sellerNoticeMobile: data?.contactMobile || '',
          sellerNoticeEmail: data?.contactEmail || ''
        }
      }
    })
  }
}

const onBuyerChange = ({ form, value }: any) => {
  if (!value) {
    store.clearBuyerContact()
  } else {
    loadContactInfo(value).then(data => {
      if (!data) store.clearSellerContact()
      else {
        store.sellerContact = {
          buyerContact: data?.contactName || '',
          buyerLawAddress: data?.contactAddress || '',
          buyerNoticeMobile: data?.contactMobile || '',
          buyerNoticeEmail: data?.contactEmail || ''
        }
      }
    })
  }
}

export const transFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'projectId', label: '授信项目', options: { ...remote('project-name'), disabled: true }, rules: [requiredRule('number')] },
  { type: 'select', model: 'sellerCompanyId', label: '卖方（债权方）', options: { options: a('seller-by-project'), onValueChange: onSellerChange, disabled: true }, rules: [requiredRule('number')] },
  // { type: 'select', model: 'sellerArea', label: '卖方所在区域', options: { options: d('_province') }, rules: [{ required: true }] },
  { type: 'select', model: 'buyerCompanyId', label: '买方（债务方）', options: { options: a('buyer-by-project'), onValueChange: onBuyerChange }, rules: [requiredRule('number')] }
  // { type: 'select', model: 'buyerArea', label: '买方所在区域', options: { options: d('_province') }, rules: [requiredRule()] }
]

export const receiveFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'sellerContact', label: '卖方联系人', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'text', model: 'sellerLawAddress', label: '卖方法律文书送达地址', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'text', model: 'sellerNoticeMobile', label: '卖方联系电话', options: { ...textOptions, maxlength: 11 }, rules: [requiredRule(), { validator: validator('tel') }] },
  { type: 'text', model: 'sellerNoticeEmail', label: '卖方邮箱', options: { ...multiEmailOptions }, rules: [requiredRule(), { validator: validator('email'), sep: emailSep }] },
  { type: 'text', model: 'buyerContact', label: '买方联系人', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'text', model: 'buyerLawAddress', label: '买方法律文书送达地址', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'text', model: 'buyerNoticeMobile', label: '买方联系电话', options: { ...textOptions, maxlength: 11 }, rules: [requiredRule(), { validator: validator('tel') }] },
  { type: 'text', model: 'buyerNoticeEmail', label: '买方邮箱', options: { ...multiEmailOptions }, rules: [requiredRule(), { validator: validator('email'), sep: emailSep }] }
]

const onContractNameChange = ({ form, value }: any) => {
  if (form?.debtReceivableName) return
  if (form) form.debtReceivableName = value
}

const contracts: TableDef = {
  type: 'table',
  model: 'contracts',
  label: '合同列表',
  options: { min: 1 },
  controls: [
    {
      type: 'grid',
      columns: [
        { span: 12, xl: 5, controls: [{ type: 'text', model: 'contractName', label: '交易合同/订单名称', options: { ...textOptions, onChange: onContractNameChange }, rules: [requiredRule()] }] },
        { span: 12, xl: 5, controls: [{ type: 'text', model: 'contractCode', label: '交易合同/订单编号', options: { ...textOptions } }] },
        { span: 8, xl: 5, controls: [{ type: 'date', model: 'startTime', label: '交易合同起始日', options: { format: datetime, disabledDate: ({ rowForm }) => dateDisabledFn(rowForm?.expireTime, 'lt') }, rules: [requiredRule(), { validator: validator('date'), format: datetime, end: 'expireTime', range: '1D|100Y' }] }] },
        { span: 8, xl: 5, controls: [{ type: 'date', model: 'expireTime', label: '交易合同到期日', dependOn: 'rowForm.fixDate === "0"', options: { format: datetime, disabledDate: ({ rowForm }) => dateDisabledFn(rowForm?.startTime, 'gt') }, rules: [requiredRule(), { validator: validator('date'), format: datetime, start: 'startTime', range: '1D|100Y' }] }] },
        { span: 8, xl: 4, controls: [{ type: 'radio', model: 'fixDate', label: '无固定期限', options: { options: d('_yesOrNo'), defaultValue: '0' } }] },
        { span: 24, controls: [{ type: 'upload', model: 'files', label: '交易合同/订单附件', options: { ...uploadOptions }, rules: [requiredRule('array')] }] }
      ]
    }
  ]
}

export const baseFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款编号', options: { ...textOptions, disabled: true }, rules: [requiredRule()] },
  { type: 'text', model: 'debtReceivableName', label: '应收账款名称', options: { ...textOptions, placeholder: '取第一个合同订单名称, 可修改' }, rules: [requiredRule()] },
  { type: 'number', model: 'amount', label: '（预估）应收账款金额', options: { ...amountOptions }, rules: [requiredRule('number')] },
  { type: 'date', model: 'transferStartTime', label: '转让起始时间', options: { type: 'date', format: datetime, disabledDate: ({ form }) => dateDisabledFn(form?.transferEndTime, 'lt') }, rules: [requiredRule(), { validator: validator('date'), format: datetime, end: 'transferEndTime', range: '1D|100Y' }] },
  { type: 'date', model: 'transferEndTime', label: '转让截止时间', options: { type: 'date', format: datetime, disabledDate: ({ form }) => dateDisabledFn(form?.transferStartTime, 'gt') }, rules: [requiredRule(), { validator: validator('date'), format: datetime, start: 'transferStartTime', range: '1D|100Y' }] },
  { type: 'select', model: 'transferType', label: '应收账款转让类型', options: { options: d('project_yszkzrlx'), disabled: true }, rules: [requiredRule()] },
  { span: 24, def: { type: 'textarea', model: 'contentDescription', label: '应收账款描述', options: { ...textareaOptions } } },
  { span: 24, def: contracts },
  { span: 24, def: { type: 'upload', model: 'files', label: '应收账款凭证', options: { ...uploadOptions } } },
  { span: 24, def: { type: 'textarea', model: 'remark', label: '其他说明', options: { ...textareaOptions } } }
]
