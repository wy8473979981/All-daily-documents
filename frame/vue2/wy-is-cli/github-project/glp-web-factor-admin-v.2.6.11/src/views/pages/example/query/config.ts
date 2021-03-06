import { FieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'
import { formatter } from '@/config/table'
import { getCities, getCounties, cascadeRegions } from '@/config/region'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'id', label: '编号' },
  { type: 'text', model: 'name', label: '姓名' },
  { type: 'text', model: 'age', label: '年龄', rules: [{ min: 1, max: 2, message: '年龄在1到100之间' }] },
  { type: 'select', model: 'status', label: '状态', options: { options: d('status') } },
  { type: 'text', model: 'address', label: '地址', dependOn: 'form.status == 1' },
  { type: 'select', model: 'province', label: '省', options: { options: d('_province') } },
  { type: 'select', model: 'city', label: '市', options: { options: ({ form }) => Promise.resolve(getCities(form.province)) } },
  { type: 'select', model: 'county', label: '区', options: { options: ({ form }) => Promise.resolve(getCounties(form.city)) } },
  { type: 'cascader', model: 'regions', label: '级联省市区', options: { options: cascadeRegions } }
]

export const columns: TableColumnDef[] = [
  { prop: 'id', label: '编号' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'status', label: '状态', formatter: formatter('transcode', 'status') },
  { prop: 'address', label: '地址' },
  { prop: 'opt', label: '操作', fixed: 'right' }
]
