import Http from './Http'

declare module 'vue/types/vue' {
  interface Vue {
    $http: Http;
  }
}
