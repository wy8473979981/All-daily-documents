/*
 * @Author: fhj
 * @LastEditors: fhj
 */
import store from '../store'
import router from '../router'

const PUBFN = {
  // router push
  routerPush(options) {
    const view = store.state.tagsView.visitedViews.filter(item => item.name === options.name)
    if (view.length > 0) {
      store.dispatch('tagsView/delView', view[0]).then(({ visitedViews }) => {
        router.push(options)
      })
    } else {
      router.push(options)
    }
  },
  // 删除当前页面
  delView() {
    const view = store.state.tagsView.visitedViews
    store.dispatch('tagsView/delView', view[0])
  }
}

export default PUBFN
