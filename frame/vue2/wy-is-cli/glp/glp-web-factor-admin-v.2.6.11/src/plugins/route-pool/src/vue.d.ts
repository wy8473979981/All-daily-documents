import RoutePool from './RoutePool'

declare module 'vue/types/vue' {
  interface Vue {
    $rp: RoutePool;
  }
}
