import { AppRouteConfig, AppRouteConfigMetaBreadcrumb } from './type'
import pages, { Page } from '@/config/page'

const routes = buildRoutes(pages)
export default routes

function buildRoutes (pages: Page[], parent: AppRouteConfig | null = null): AppRouteConfig[] {
  const ret: AppRouteConfig[] = []
  pages.forEach(v => {
    const item = buildRoute(v, parent)
    if (item) ret.push(item)
    if (Array.isArray(v.children)) {
      const subs = buildRoutes(v.children, item)
      subs.forEach(w => {
        const nested = !!w.meta?.nested
        if (item && nested) (item.children || (item.children = [])).push(w)
        else ret.push(w)
      })
    }
  })
  return ret

  function buildRoute (page: Page, parent: AppRouteConfig | null): AppRouteConfig | null {
    if (!page.router) return null
    const { path } = page
    const nested = page.router.nested
    const fullPath = page.router.path
    const breadcrumb = genBreadcrumb()
    return {
      path: fullPath,
      name: path,
      component: () => import(`@/views/pages${path}/index.vue`),
      props: ({ params = {}, query = {} }) => ({ ...params, ...query }),
      meta: { pid: path, breadcrumb, nested }
    }

    function genBreadcrumb (): AppRouteConfigMetaBreadcrumb[] {
      let lastBreadcrumb = parent?.meta?.breadcrumb
      if (!Array.isArray(lastBreadcrumb)) {
        const ret: AppRouteConfigMetaBreadcrumb[] = []
        let current = page.parent
        while (current) {
          const item = { title: current.title, path: current.path, active: !!current.router }
          ret.push(item)
          current = current.parent
        }
        lastBreadcrumb = ret.reverse()
      }
      return [...lastBreadcrumb, { title: page.title, path: fullPath, active: !!page.router }]
    }
  }
}
