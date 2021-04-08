import { FieldDef, TableColumnDef } from '@/types'
import { d, a } from '@/config/form'
import { formatter } from '@/config/table'

const dependOn = () => {
  return ({ form }: any) => {
    return !form.appId
  }
}

export const formDefs: FieldDef[] = [
  {
    type: 'select',
    model: 'appId',
    label: '资金端名称',
    options: {
      options: d('channel'),
      onValueChange: ({ form, items, value }) => {
        const t = items.find((v: any) => v.__value === value)
        if (!t) form.jdeType = ''
      }
    }
  },
  { type: 'text', model: 'name', label: '凭证名称' },
  { type: 'select', model: 'jdeType', label: '凭证类型编码', options: { options: a('jdeType-name-by-appId'), disabled: dependOn() } },
  { type: 'select', model: 'senceCode', label: '场景', options: { options: a('sceneName-by-appId'), disabled: dependOn() } }
]

export const columns: TableColumnDef[] = [
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'jdeType', label: '凭证类型编码', minWidth: '150px', formatter: formatter('transcode', 'jdeType') },
  { prop: 'name', label: '凭证名称', minWidth: '150px' },
  { prop: 'sceneName', label: '场景', minWidth: '170px' },
  { prop: 'createTime', label: '创建时间', minWidth: '250px' },
  { prop: 'updateTime', label: '修改时间', minWidth: '250px' },
  { prop: 'status', label: '状态', minWidth: '170px', formatter: formatter('transcode', 'useStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]
