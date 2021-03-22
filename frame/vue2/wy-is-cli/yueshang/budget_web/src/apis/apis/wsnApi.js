import { get, post, put, del } from '../interceptor'
import Base from './base'
// 类型配置-存量资产
class WsnApi extends Base {
  // 查询租赁分页列表
  async find(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/multichannel/page', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //编辑详情
  async editDetail(p, showMsg) {
    const code = {
      0: '编辑成功'
    }
    const res = await post('/multichannel/info', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  // 编辑保存
  async edit(p, showMsg) {
    const code = {
      0: '编辑成功'
    }
    const res = await post('/multichannel/save', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //点位统计/multichannel/stat
  async statAll(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/multichannel/stat', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //多经概况-查询
  async wsngkList(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await get('/multichannel/info', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //物业多经概况-查询
  async collectWydjWsngkList(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/collectWydj/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //删除已有合同
  async deleteContract(p, showMsg) {
    const code = {
      0: '删除成功',
      1: '删除失败'
    }
    const res = await post('/multichannel/deleted', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}
const wsnApi = new WsnApi()

export default wsnApi
