import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const saleCompanyDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'name', label: '名称' },
  { type: 'plain', model: 'certificateId', label: '统一社会信用代码' },
  { type: 'plain', model: 'enterpriseNature', label: '所属行业', options: { formatter: f('transcode', 'enterpriseNature') } },
  { type: 'plain', model: 'lawPersonName', label: '法人代表姓名' },
  { type: 'plain', model: 'addr', label: '注册地所在的省份/自治区/直辖市' },
  { type: 'plain', model: 'detail', label: '注册地址' }
]

export const buyCompanyDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'name', label: '名称' },
  { type: 'plain', model: 'certificateId', label: '统一社会信用代码' },
  { type: 'plain', model: 'enterpriseNature', label: '所属行业', options: { formatter: f('transcode', 'enterpriseNature') } },
  { type: 'plain', model: 'lawPersonName', label: '法人代表姓名' },
  { type: 'plain', model: 'addr', label: '注册地所在的省份/自治区/直辖市' },
  { type: 'plain', model: 'detail', label: '注册地址' }
]

export const contractDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'code', label: '融资合同号码' },
  { type: 'plain', model: 'contractAmount', label: '融资合同金额', options: { formatter: f('currency') } },
  { type: 'plain', model: 'debtAmount', label: '转让财产价值', options: { formatter: f('currency') } }
]

export const describeDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'describe', label: '转让信息描述' }
]
