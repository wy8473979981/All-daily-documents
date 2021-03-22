import { get, post } from '../interceptor'
import Base from './base'

// 预算编制-汇总
class serviceApi extends Base {
  // 资金计划-列表-查询
  async fundPlanList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/capitalPlan/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 基础信息表 - 面积信息 - 项目信息 - 人数信息 查找ID
  async getInfoId(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/collectbase/queryBudgetInstanceSheetIds', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 基础信息表-面积信息-列表-查询
  async areaInfoList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectbase/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 基础信息表-项目信息-列表-查询
  async projectInfoList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectbaseProject/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 基础信息表-人员信息-列表-查询
  async personInfoList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectbaseEmp/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 主要指标-列表-查询
  async mainTargetList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collecttarget/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 租费概况-列表-查询
  async rentpointsList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectrate/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 人事费用概况 - 人事费用 - 人数概况  查找ID
  async getPersonId(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/collectEmp/queryBudgetInstanceSheetIds', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 人事费用概况-人事费用-列表-查询
  async staffCostList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectEmpfee/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 人事费用概况-人数概况-列表-查询
  async personSurveyList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/collectEmp/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 行政费用概况-列表-查询
  async costsurveyList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/tmp/data/costsurvey/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 企划费-列表-查询
  async qhfList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/tmp/data/qhf/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 能耗费概况-列表-查询
  async energyList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/tmp/data/energy/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 地产支付物业款项统计-列表-查询
  async propertystatList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/tmp/data/propertystat/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 物业新增交房统计-列表-查询
  async deliverystatList(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/tmp/data/deliverystat/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }



}

const SummaryApi = new serviceApi()

export default SummaryApi
