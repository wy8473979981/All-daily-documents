/*
 * @Description: app moudle
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2020-12-23 11:51:40
 */
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from 'vuex'

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import type { AppState } from './state'
// https://segmentfault.com/a/1190000039800522
// import type ... from — 让编译器知道您要导入的内容绝对是一种类型。
// export type ... from — 一样， 仅用作导出。
// TypeScript使用import type扩展了导入语法，该导入类型是只能导入类型的导入。

export type { AppState } from './state'

export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
};
export const store: Module<AppState, RootState> = {
  state,
  mutations,
  actions
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
}