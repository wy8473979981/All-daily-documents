import { get, post } from '../interceptor'
import Base from './base'

// 预算编制-管理及企划费用表
class FeeScheduleApi extends Base {
  // 查找-管理及企划费用表
  async find(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/bizSumfee/getSumFee', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 导出 - 管理及企划费用表
  async bizSumfeeExport(p, showMsg) {
    const res = await get('/bizSumfee/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 工资福利费
  async bizHrfeeExport(p, showMsg) {
    const res = await get('/bizHrfee/excelExport', p, 'arraybuffer')
    return res
  }

  // 导出 - 招聘费:9 新政费用:2 业务招待:10企划:11清洁:12安全保卫:12绿化:4工程维保费预算:3能源明细:6能源汇总:13折旧:14财务:1
  async bizFeeExport(p, showMsg) {
    const res = await get('/bizFee/ExcelExport', p, 'arraybuffer')
    return res
  }

  // 导出 - 整租租赁成本
  async bizRentalExport(p, showMsg) {
    const res = await get('/bizRental/excelExport', p, 'arraybuffer')
    return res
  }

  // 导出 - 差旅费
  async bizTravelFeeExport(p, showMsg) {
    const res = await get('/bizTravelFee/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 非生产采购
  async bizProcureExport(p, showMsg) {
    const res = await get('/bizProcure/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 工程改造费
  async bizReformExport(p, showMsg) {
    const res = await get('/bizReform/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 其他成本费用
  async bizOtherExport(p, showMsg) {
    const res = await get('/bizOther/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 返租支出
  async bizLeasebackExport(p, showMsg) {
    const res = await get('/bizLeaseback/excelExport', p, 'arraybuffer')
    return res
  }
  // 导出 - 培训费
  async bizTrainExport(p, showMsg) {
    const res = await get('/bizTrain/excelExport', p, 'arraybuffer')
    return res
  }

  // 管理及企划费用表-总表-数字化投入-保存
  async saveBizSumfee(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizSumfee/digital', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }


  // 能耗明细 - 能源明细 - 能源汇总 查找ID
  async getEnergyItemBysum(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/instanceSheet/getEnergyItemBysum', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  /* 通用费用表 */
  // 查找
  async feeFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizFee/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 编辑
  async feeEdit(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizFee', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 工资福利费 */
  // 查找
  async wageFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizHrfee/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 编辑
  async wageEdit(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizHrfee/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 培训费 */
  // 查找
  async trainFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizTrain/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 新增编辑
  async trainUpdate(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizTrain/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 批量删除
  async trainDel(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/bizTrain/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 差旅费 */
  // 查找
  async traveFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizTravelFee/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 编辑
  async traveEdit(p, showMsg) {
    const code = {
      '0': '保存成功',
      '1': '请求异常'
    }
    const res = await post('/bizTravelFee/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 非生产性资产采购 */
  // 查找
  async invalidFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizProcure/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 新增编辑
  async invalidUpdate(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizProcure/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 批量删除
  async invalidDel(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/bizProcure/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 整租租赁成本 */
  // 查找
  async rentalFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/bizRental/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 编辑
  async rentalEdit(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizRental/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 其他成本费用 */
  // 查找
  async otherFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizOther/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 新增编辑
  async otherUpdate(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizOther/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 批量删除
  async otherDel(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/bizOther/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 工程改造费 */
  // 查找
  async reformFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizReform/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 新增编辑
  async reformUpdate(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizReform/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 批量删除
  async reformDel(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/bizReform/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  /* 返租支出 */
  // 查找
  async leasebackFind(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/bizLeaseback/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 新增编辑
  async leasebackUpdate(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizLeaseback/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 批量删除
  async leasebackDel(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/bizLeaseback/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 1 清洁，2安全 3 绿化 - 查找对应tab id
  async getFormId(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/feeDetail/getTabInstanceSheet', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 1 清洁，2安全 3 绿化 -明细查询
  async getFeeDetail(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/feeDetail/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 工程维保费明细 工程维保费 -查询id
  async getMaintainId(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/maintain/getTabInstanceSheet', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 工程维保费明细查询
  async getMaintainDetail(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/maintain/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
}

const feeScheduleApi = new FeeScheduleApi()

export default feeScheduleApi
