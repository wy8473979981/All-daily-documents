import { post } from '../interceptor'
import Base from './base'

// 资产汇总
class StockAssets extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/projectDetail/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 加载展示页在建详情
  async loadInbuild (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/projectConfig/show_zj', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 业态下拉框
  async smallLayoutDropList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/projectDetail/smallLayoutDropList', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 上报、驳回、审核
  async verify_action (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2002': '操作不当',
      '2007': '该项目导入数据之和跟后台配置不相等',
      '4005': '由于该项目重新上传数据，请刷新此页面',
    }
    const res = await post('/projectVerify/verify_action', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 三部审核
  async business_verify (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2002': '操作失败',
    }
    const res = await post('/projectVerify/business_verify', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 商业导入前查看是否导入过数据
  async importJudgeOldData (p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/projectDetail/import_judge_old_data', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const stockAssets = new StockAssets()

export default stockAssets
