import options from './options'

export function getHomePage (roles: string[] = [], authorities: string[] = []): string | null {
  // let url: string | null = null
  // Object.entries(options).some(([k, v]) => {
  //   const has = roles.some(r => new RegExp(`^${k}$`).test(r))
  //   if (!has) return false
  //   const urls = typeof v === 'string' ? [v] : v
  //   const target = urls.find(u => authorities.some(a => a === u))
  //   if (!target) return false
  //   url = target
  //   return true
  // })
  // return url
  return '/dashboard'
}
