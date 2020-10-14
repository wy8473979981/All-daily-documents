type CloneFn = (row: any, parent: any) => any | null
export function toArray (list: any[] = [], cloneFn: CloneFn, childrenKey = 'children') {
  const ret: any[] = []
  traverse(list, null)
  return ret

  function traverse (rows: any[], parent: any = null) {
    if (!rows) return
    rows.forEach(v => {
      const children = v[childrenKey] || []
      const row = cloneFn ? cloneFn(v, parent) : clone(v)
      ret.push(row)
      traverse(children, row)
    })
  }

  function clone (row: any) {
    delete row[childrenKey]
    return Object.assign({}, row)
  }
}
