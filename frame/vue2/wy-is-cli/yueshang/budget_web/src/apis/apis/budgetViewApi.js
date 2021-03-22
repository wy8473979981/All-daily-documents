import { get, post } from '../interceptor'
import Base from './base'

// 预算查看-主页面
class BudgetViewApi extends Base {

  // 预算查看-查找
  async viewList(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/instance/instanceList', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 利润表-查找
  async find(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/budgetProfitCollect/profitCollectIndex', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 利润表-保存
  async profitSave(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/budgetProfitCollect/profitSave', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}
const budgetViewApi = new BudgetViewApi()

export default budgetViewApi
