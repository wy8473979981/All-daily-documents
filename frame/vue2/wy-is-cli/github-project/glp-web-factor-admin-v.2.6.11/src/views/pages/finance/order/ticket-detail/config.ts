import { GridFieldDef, FieldDef, TableColumnDef, TableDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const baseDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'cpNo', label: '票据号' },
  { type: 'plain', model: 'acptDt', label: '出票日' },
  { type: 'plain', model: 'dueDt', label: '到期日' },
  { type: 'plain', model: 'cpMoney', label: '票面金额' },
  { type: 'plain', model: 'remitterName', label: '出票人名称' },
  { type: 'plain', model: 'remitterOpenBankName', label: '出票人开户行名称' },
  { type: 'plain', model: 'payeeName', label: '收款人名称' },
  { type: 'plain', model: 'remitterAssurerName', label: '出票保证人名称' },
  { type: 'plain', model: 'acceptor', label: '承兑人名称' },
  { type: 'plain', model: 'acceptorOpenBankName', label: '承兑人开户行名称' },
  { type: 'plain', model: 'acceptorAssurerName', label: '承兑保证人名称' },
  { type: 'plain', model: 'aaa', label: '票据附件' }
]

export const frontDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'acptDt', label: '出票日' },
  { type: 'plain', model: 'dueDt', label: '到期日' },
  { type: 'plain', model: 'cpType', label: '票据类型' },
  { type: 'plain', model: 'cpNo', label: '票号' },
  { type: 'plain', model: 'remitterOpenBankNo', label: '出票人开户行行号' },
  { type: 'plain', model: 'remitterName', label: '出票人名称' },
  { type: 'plain', model: 'remitterAcct', label: '出票人账号' },
  { type: 'plain', model: 'remitterOpenBankName', label: '出票人开户行' },
  { type: 'plain', model: 'payeeOpenBankNo', label: '收款人开户行行号' },
  { type: 'plain', model: 'payeeName', label: '收款人名称' },
  { type: 'plain', model: 'payeeAcct', label: '收款人账号' },
  { type: 'plain', model: 'payeeOpenBankName', label: '收款人开户行' },
  { type: 'plain', model: 'acceptorOpenBankName', label: '承兑人开户行名' },
  { type: 'plain', model: 'acceptorName', label: '承兑人名称' },
  { type: 'plain', model: 'acceptorAcct', label: '承兑人账号' },
  { type: 'plain', model: 'acceptorOpenBankNo', label: '承兑人开户行号' },
  { type: 'plain', model: 'acceptorCreditLevelOverdue', label: '承兑人评级到期日' },
  { type: 'plain', model: 'acceptorAppraiser', label: '承兑人评级主体名称' },
  { type: 'plain', model: 'acceptorCreditLevel', label: '承兑人信用等级' },
  { type: 'plain', model: 'acceptDate', label: '承兑日期' },
  { type: 'plain', model: 'acceptorAssurerName', label: '承兑保证人名称' },
  { type: 'plain', model: 'acceptorAssurerAddr', label: '承兑保证人地址' },
  { type: 'plain', model: 'acceptorAssurerDate', label: '承兑保证日期' },
  { type: 'plain', model: 'remitterAssurerName', label: '出票保证人名称' },
  { type: 'plain', model: 'remitterAssurerAddr', label: '出票保证人地址' },
  { type: 'plain', model: 'remitterAssurerDate', label: '出票保证日期' },
  { type: 'plain', model: 'status', label: '交易状态' },
  { type: 'plain', model: 'remitterCreditLevelOverdue', label: '出票人评级到期日' },
  { type: 'plain', model: 'remitterCreditLevel', label: '出票人信用等级' },
  { type: 'plain', model: 'remitterAppraiser', label: '出票人评级主体名称' },
  { type: 'plain', model: 'cpMoney', label: '票面金额' },
  { type: 'plain', model: 'canTransfer', label: '转让标记' },
  { type: 'plain', model: 'remarks1', label: '备注信息' },
  { type: 'plain', model: 'aaaa', label: '票据附件' }
]

const transfers: TableDef = {
  type: 'table',
  model: 'transfers',
  label: '列表',
  options: { disabled: true },
  controls: [
    {
      type: 'grid',
      columns: [
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'endorseType', label: '背书类型' }] },
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'tranferFrom', label: '背书人名称' }] },
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'tranferTo', label: '被背书人名称' }] },
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'transferDate', label: '背书时间' }] },
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'redeemDateFrom', label: '赎回开放日' }] },
        { span: 6, xl: 6, controls: [{ type: 'plain', model: 'redeemDateTo', label: '赎回截止日' }] }
      ]
    }
  ]
}

export const backDetailDef: Array<FieldDef | GridFieldDef> = [
  { span: 24, xl: 24, def: transfers }
]
