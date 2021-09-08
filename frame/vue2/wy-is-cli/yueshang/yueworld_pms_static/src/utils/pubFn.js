/*
 * @Author: fhj
 * @LastEditors: qiuyuwu
 */
import store from '../store'
import router from '../router'
import * as optionsList from '@/utils/optionsList'

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
  },
  /*
  * 统一获取字典
  * kabelStr为字典名字
  * TODO 需要改成统一字典表
  */
  getOptionsList(kabelStr) {
    return optionsList[kabelStr]
  },
  // 新开窗口
  routerPushNew(options) {
    const routeData = router.resolve(options)
    window.open(routeData.href, '_blank')
  }
}

export default PUBFN
