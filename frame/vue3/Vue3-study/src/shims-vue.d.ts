/* eslint-disable */
declare module 'vue'
declare module 'element-plus'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

