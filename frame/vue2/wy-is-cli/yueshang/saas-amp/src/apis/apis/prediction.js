import { get, post } from '../interceptor'
import Base from './base'

// 竞品分析
class Prediction extends Base {
  // 查找
  async find (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
    }
    const res = await post('/modelPrediction/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // pms列表
  async pmsList (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
    }
    const res = await post('/modelPrediction/getStartYear', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  async delList (p, showMsg) {
    const code = {
      '200': '提交成功',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/modelPrediction/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  async findDetail (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在',
    }
    const res = await post('/modelPrediction/details', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 新建
  async add (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2009': '当前项目版本已存在，无法新增！',
    }
    const res = await post('/modelPrediction/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新
  async update (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
      '2009': '当前项目版本不存在，无法编辑！',
    }
    const res = await post('/modelPrediction/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 导入文件
  async importExcel (p, showMsg) {
    const code = {
      '200': '提交成功',
      '999': '令牌无效,请重新登录',
      '3001': 'Excel文件不可以超过500M',
      '3002': '选择模板中Excel文件导入'
    }
    const res = await post('/modelPrediction/import', p, 'JSON')
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

}

const prediction = new Prediction()

export default prediction
