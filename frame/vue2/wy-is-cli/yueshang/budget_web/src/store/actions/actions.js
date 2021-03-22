import globalApi from '@/apis/apis/global'
import { get, post } from '@/apis/interceptor'
export default {
  // updateAsync (store, data) {
  //   store.commit('changeUser', data)
  // }
  async saveMenus(context,type) {
    let params = {
      selectType:type
    }
     await globalApi.getSelectList(params).then(res => {
      if(res.code === 0 && res.data){
        let data = res.data;
        context.commit('saveMenus',{type,data})
      }
    })
  },
}
