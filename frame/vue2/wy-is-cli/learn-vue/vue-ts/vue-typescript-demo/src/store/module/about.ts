import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import store from "../index"

const getList = () => {
  return new Promise<Array<number>>(resolve => {
    setTimeout(() => {
      resolve([4, 5, 6, 7, 8, 9])
    }, 500)
  })
}

export interface IAboutState {
  count: number;
  list: Array<number>;
}

// {
//   state:{
//     count :1,
//     list:[1,2,3,4]
//   }
// }

@Module({
  name: "about",
  dynamic: true, // 动态模块
  store
})
export default class About extends VuexModule implements IAboutState {
  count: number = 1;
  list: Array<number> = [1, 2, 3, 4];

  get filterList() {
    return this.list.filter(item => item % 2 === 0)
  }

  @Mutation
  updateCount(payload: number) {
    this.count += payload
  }
  @Mutation
  updateList(payload: Array<number>) {
    this.list = payload
  }

  @Action
  async getList() {
    const res: Array<number> = await getList()
    this.updateList(res)
  }
}

export const AboutStore = getModule(About)
