import { Vue, Component, Provide, Prop, Watch, Emit } from 'vue-property-decorator'
import VueRouter, { Route, RawLocation } from 'vue-router'
import { ErrorHandler } from 'vue-router/types/router'

export interface Item {
  key: number;
  title: string;
  path: string;
  inst?: any;
}

export interface RoutePoolOptions {
  router: VueRouter;
}

let uid = 1

function normalizePath (route: Route): string {
  return route.fullPath
}

function normalizeTitle (route: Route) {
  const breadcrumb = route?.meta?.breadcrumb || []
  const text: string = breadcrumb.map((v: any) => v.title).join(' / ')
  const regex = /\{(\w+)\}/g
  const ctx = Object.assign({}, route.params || {}, route.query || {})
  return text.replace(regex, (_, c) => ctx[c] || '')
}

@Component
export default class RoutePool extends Vue {
  @Prop() options!: RoutePoolOptions

  @Emit() clear (items: Item[]) {}

  items: Item[] = []

  private removedItems: Item[] = []

  private cachedKey = 0

  get current (): Item | null {
    const route = this.options.router.currentRoute
    const path = normalizePath(route)
    return this.get(path) || null
  }

  add (route: Route) {
    const path = normalizePath(route)
    const item = this.get(path)
    if (item && item.key === this.cachedKey) {
      this.cachedKey = 0
      return
    }
    if (item) {
      this.remove(item)
    }
    const ret: Item = {
      key: uid++,
      path: normalizePath(route),
      title: normalizeTitle(route)
    }
    this.items.push(ret)
    this.cachedKey = 0
  }

  close (item?: Item, cached = true) {
    const ret = item || this.current
    if (!ret) return
    if (ret === this.current) this.next(ret, cached)
    this.$nextTick(() => this.remove(ret))
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: ErrorHandler) {
    const item = this.current
    const completeFn = () => {
      setTimeout(() => {
        if (item) this.close(item, false)
      }, 0)
      if (onComplete) onComplete()
    }
    this.options.router.replace(location, completeFn, onAbort)
  }

  select (item: Item, cached = true) {
    if (item === this.current) return
    if (!item) return
    if (cached) this.cachedKey = item.key
    this.go(item.path)
  }

  private go (path: string) {
    this.options.router.push(path)
  }

  private get (path: string): Item | undefined {
    return this.items.find(v => v.path === path)
  }

  private remove (item: Item) {
    const idx = this.items.findIndex(v => item === v)
    if (idx >= 0) this.items.splice(idx, 1)
    this.removedItems.push(item)
  }

  private next (item: Item, cached = true) {
    if (this.items.length <= 1) {
      this.go('/')
      return
    }
    const idx = this.items.findIndex(v => v === item)
    const len = this.items.length - 1
    let ret
    if (idx === len) ret = this.items[idx - 1]
    else ret = this.items[idx + 1]
    this.select(ret, cached)
  }

  @Watch('removedItems') removedItemsChange () {
    if (this.removedItems.length >= 5) {
      const rows = this.removedItems.slice()
      this.removedItems = []
      this.clear(rows)
    }
  }
}
