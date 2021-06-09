import { get, post } from '../interceptor'
import Base from './base.js'

// 助理设置相关接口
class Assistant extends Base {

  // 获取助理人员列表
  async getList (p, showMsg) {
    const res = await post('process/accredit/findProcessAccreditPage', p)
    return res
  }

   // 编辑助理人员
   async saveProcessAccredit (p, showMsg) {
    const res = await post('process/accredit/saveProcessAccredit', p)
    return res
  }

   // 批量删除助理人员
   async deleteByAccreditIds (p, showMsg) {
    const res = await post('process/accredit/deleteByAccreditIds', p)
    return res
  }
}

const assistant = new Assistant()
export default assistant
