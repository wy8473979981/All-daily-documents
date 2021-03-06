import Auth from './Auth'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth;
  }
}
