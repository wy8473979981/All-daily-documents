import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, uploadOptions, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const detailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'registerCertificateNo', label: '登记证明编号' },
  { type: 'plain', model: 'contractNumber', label: '保理合同编号' },
  { type: 'plain', model: 'debtReceivableNumber', label: '应收账款转让登记协议编号' },
  { type: 'plain', model: 'registerTypeName', label: '登记业务类型' },
  { type: 'plain', model: 'dueTime', label: '登记期限（月）' },
  { type: 'plain', model: 'registerDueTime', label: '登记到期日' },
  { type: 'plain', model: 'registerModifiedCode', label: '修改码' },
  { type: 'plain', model: 'buyerCompanyName', label: '买方企业' },
  { type: 'plain', model: 'sellerCompanyName', label: '卖方企业' },
  { type: 'plain', model: 'registerStatusName', label: '登记类型' },
  { type: 'plain', model: 'registerTime', label: '登记时间' },
  { type: 'plain', model: 'createUser', label: '登记人' },
  { type: 'file-link', model: 'files', label: '中登登记文件' },
  { type: 'plain', model: 'registerRemark', label: '备注' }
]
