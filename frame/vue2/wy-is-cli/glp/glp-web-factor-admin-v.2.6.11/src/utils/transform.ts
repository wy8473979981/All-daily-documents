export class Builder {
  constructor (source: Record<string, any>) {
    this.source = this.__clone(source)
  }

  source!: Record<string, any>

  pick (...fields: string[] | Array<string[]>): Builder {
    const ret: any = {}
    fields.forEach((v: any) => {
      if (Array.isArray(v)) {
        const value = this.source[v[0]]
        ret[v[0]] = value === undefined ? v[1] : value
      } else {
        ret[v] = this.source[v]
      }
    })
    return this
  }

  exclude (...fields: string[]): Builder {
    fields.forEach(v => {
      delete this.source[v]
    })
    return this
  }

  extend (defs: Record<string, any>): Builder {
    Object.entries(defs).forEach(([k, v]) => {
      this.source[k] = v
    })
    return this
  }

  rename (defs: Record<string, string>): Builder {
    Object.entries(defs).forEach(([k, v]) => {
      this.source[v] = this.source[k]
      delete this.source[k]
    })
    return this
  }

  format (defs: Record<string, (value: any, row: any) => any>): Builder {
    Object.entries(defs).forEach(([k, v]) => {
      this.source[k] = v(this.source[k], this.source)
    })
    return this
  }

  array (field: string, fn: (row: Record<string, any>) => Record<string, any>): Builder {
    if (Array.isArray(this.source[field])) {
      this.source[field] = this.source[field].map((v: any) => {
        return fn(v)
      })
    }
    return this
  }

  unfold (field: string, defs: Record<string, string> = {}): Builder {
    const target = this.source[field] || {}
    Object.entries(target).forEach(([k, v]) => {
      const key = defs[k] || k
      this.source[key] = v
    })
    delete this.source[field]
    return this
  }

  fold (field: string, ...keys: string[]) {
    const ret: any = {}
    keys.forEach(v => {
      ret[v] = this.source[v]
      delete this.source[v]
    })
    this.source[field] = ret
    return this
  }

  end (): Record<string, any> {
    return this.source
  }

  __clone<T> (source: T): T {
    return Object.assign({}, source) as T
  }
}

// const source = {
//   cname: 'zhangsan',
//   desc: 'r3242324',
//   status: 1,
//   list: [
//       {
//           fileName: 'abc.xls',
//           path: 'www.baidu.com'
//       }
//   ]
// }

// const ret =
// transform(source)
//   .exclude('desc')
//   .rename({ 'cname': 'name' })
//   .format({ 'status': v => String(v) })
//   .array('list', row => {
//       return transform(row)
//               .rename({ 'fileName': 'name', 'path': 'url' })
//               .end()
//     }).end()

export function transform (source: Record<string, any>) {
  return new Builder(source)
}
