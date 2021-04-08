import pages, { Page } from '@/config/page'
import options from './options'

export function getHomePage (roles: string[] = [], authorities: string[] = []): string | null {
  let url: string | null = null
  Object.entries(options).some(([k, v]) => {
    const has = roles.some(r => new RegExp(`^${k}$`).test(r))
    if (!has) return false
    const urls = typeof v === 'string' ? [v] : v
    const target = urls.find(u => authorities.some(a => a === u))
    if (!target) return false
    url = target
    return true
  })

  if (!url) {
    traverse(pages)
  }
  return url

  function traverse (list: Page[]): boolean {
    return list.some(v => {
      if (v.router && v.router.path.indexOf(':') === -1 && authorities.some(a => a === v.path)) {
        url = v.router.path
        return true
      }
      if (v.children) {
        return traverse(v.children)
      }
    })
  }
}
