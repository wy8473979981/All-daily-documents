import { post, get } from '../../../interceptor'
import Base from '../../base'

// 项目测算
class calculation extends Base {
  // 项目测算列表查找
  async getList(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目列表
  async getProjectList(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目-详情
  async getProjectDetail(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/detail', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取项目测算基础信息
  async getProjectCalculateDetail(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/detail', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 项目测算基础信息保存
  async saveCreate(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/result/create', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据项目测算id获取指标列表详细
  async getTargetInfoByProjectId(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/target/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据指标id获取分级列表
  async getScoreList(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/target/item/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 指标分级信息更新
  async targetUpdate(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/target/item/update', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 创建项目综合指标
  async saveTargetCreate(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/target/create', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 保存更新项目测算指标信息
  async saveTargetUpdate(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/result/target/update', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 删除项目测算-综合指标
  async getTargetDelete(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/target/delete', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 业态
  async getLayoutList(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/layout/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  //  项目测算-删除
  async deleteProjectByIds(p, showMsg) {
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/result/delete', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  //  项目测算-详情
  async getProjectDetailById(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/target/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  //  根据项目ID获取历史测算假设版本列表
  async getVersionByProjectId(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/version/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  //  成本假设列表获取
  async getCostTableData(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/cost/list', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  //  取费假设列表获取
  async getFeeTableData(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/fee/list', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  //  获取财务假设列表
  async getFinanceTableData(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/result/finance/list', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  //  项目过程假设列表
  async getProcessTableData(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/process/list', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 成本假设更新
  async saveCostTableUpdate(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/cost/update', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 财务假设更新
  async saveFinanceTableUpdate(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/result/finance/update', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 项目过程假设更新
  async saveProcessTableUpdate(p, useScreenLoadingBol, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/process/update', p, 'JSON', useScreenLoadingBol)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 测算结果信息保存
  async saveCalculateCreate(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/calculate/create', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 测算结果列表
  async getCalculateTableData(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/project/calculate/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 完成测算
  async calculateStatusUpdate(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await post('/api/project/calculate/status/update', p, 'JSON')
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 导出
  async excelExport(p, url, showMsg) {
    const res = await get(url, p, 'arraybuffer')
    return res
  }


  // 省
  async getProvince(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/city/province/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 市、区县列表选择
  async getCityOrCounty(p, showMsg) {
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法',
    }
    const res = await get('/api/city/area/list', p)
    this.codeMap = { ...code, ...{ [res.code]: res.msg } }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }


}

const calculationApi = new calculation()

export default calculationApi
