import { FieldDef, TableColumnDef } from '@/types'
import { d, a, datetime } from '@/config/form'
import { formatter } from '@/config/table'

const dependOn = () => {
  return ({ form }: any) => {
    return !form.appId
  }
}

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') } },
  { type: 'select', model: 'companyCode', label: '主体名称', options: { options: a('fae-companies'), disabled: dependOn() } },
  { type: 'text', model: 'debtNo', label: '借据编号' },
  { type: 'select', model: 'tradeType', label: '交易类型', options: { options: d('tradeType') } },
  { type: 'select', model: 'fundType', label: '款项类型', options: { options: d('fundType') } },
  { type: 'select', model: 'reverseFlag', label: '反冲标志', options: { options: d('reverseFlag') } },
  { type: 'select', model: 'status', label: '生成凭证状态', options: { options: d('transactionVouvherType') } },
  { type: 'date', model: 'dateTime', label: '交易日期', options: { type: 'daterange', format: 'yyyy-MM-dd' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'companyName', label: '主体名称', minWidth: '150px' },
  { prop: 'merchantNo', label: '商户号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'linkMerchantNo', label: '关联商户号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'debtNo', label: '借据编号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'paymentNo', label: '收/付款编号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'tradeNo', label: '核销流水编号', minWidth: '150px' },
  { prop: 'tradeDate', label: '交易日期', minWidth: '200px' },
  { prop: 'amount', label: '核销金额(元)', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'countEndDate', label: '计算结束日', minWidth: '200px', formatter: formatter('empty') },
  { prop: 'tradeType', label: '交易类型', minWidth: '100px', formatter: formatter('transcode', 'tradeType') },
  { prop: 'fundType', label: '款项类型', minWidth: '150px', formatter: formatter('transcode', 'fundType') },
  { prop: 'reverseFlag', label: '反冲标志', minWidth: '150px', formatter: formatter('transcode', 'reverseFlag') },
  { prop: 'createTime', label: '接收时间', minWidth: '200px' },
  { prop: 'status', label: '生成凭证状态', minWidth: '150px', formatter: formatter('transcode', 'transactionVouvherType') }
]
