import { post } from '../interceptor'
import Base from './base'

// 网批-审批列表
class FormList extends Base {

  // 列表数据查询
  // async getList (p, showMsg) {
  //   const res = await post('approve/findPageApprove', p)
  //   return res
  // }

   // 列表数据查询
   async getList (p, showMsg) {
    const res = await post('approve/findPageApproveEs', p, 'loading')
    return res
  }

}

const formList = new FormList()

export default formList
