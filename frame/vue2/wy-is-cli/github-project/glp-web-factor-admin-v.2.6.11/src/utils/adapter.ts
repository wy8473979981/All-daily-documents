export function fileListAdapter (list: Array<any>, nameKey: string, pathKey: string) {
  const mapping: Record<number | string, any> = {
    2011: '身份证正面',
    2022: '身份证反面',
    2021: '营业执照'
  }
  list && list.map((item, index) => {
    item.name = mapping[item[nameKey]] || 'name.png'
    item.url = item[pathKey]
    item.path = item[pathKey]
  })
}

export function customerRoleAdapter (data: any) {
  const _customerRole: any[] = []
  if (!data) {
    return _customerRole
  }

  if (data.ifSeller) {
    _customerRole.push('0')
  }
  if (data.ifBuyer) {
    _customerRole.push('1')
  }
  if (data.ifGuarantor) {
    _customerRole.push('2')
  }
  return _customerRole
}
