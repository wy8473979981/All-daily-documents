import { Page, PageOption, PageRouter, PageOptionRouter } from './type'
import options from './options'

export { Page }

const pages = toPages(options)
export default pages

function toPages (options: PageOption[], parent: Page | null = null): Page[] {
  const ret: Page[] = []
  options.forEach(v => {
    const item = genPage(v, parent)
    if (Array.isArray(v.children)) item.children = toPages(v.children, item)
    ret.push(item)
  })
  return ret

  function genPage (option: PageOption, parent: Page | null): Page {
    const sep = '/'
    const { name, title } = option
    const path = !parent ? `${sep}${option.name}` : `${parent.path}${sep}${option.name}`
    return {
      name,
      title,
      menu: !parent || (!parent.router),
      router: normalizeRouter(option, parent, path),
      parent,
      path
    }

    function normalizeRouter (option: PageOption, parent: Page | null, path: string): PageRouter | undefined {
      let router = option.router
      if (!router) {
        if (parent?.router) router = true
        else return
      }
      const normalizeRouter: PageOptionRouter = Object.assign({}, router === true ? { nested: true } : router)
      const nested = !!parent?.router && normalizeRouter.nested !== false
      return {
        nested,
        path: genPath()
      }
      function genPath (): string {
        const customPath = normalizeRouter.customPath || ''
        const pathSuffix = normalizeRouter.pathSuffix || ''
        if (nested) {
          if (customPath) return customPath
          return `${option.name}${pathSuffix}`
        } else {
          if (customPath) return customPath
          if (parent?.router) return `${parent.router.path}/${option.name}${pathSuffix}`
          return `${path}${pathSuffix}`
        }
      }
    }
  }
}
