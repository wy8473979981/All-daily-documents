import { get, post } from '../interceptor'
import Base from './base'

// 预算编制-收入
class serviceApi extends Base {
  // 其他收入表-总表-查找
  async getOtherRevenueList(p, showMsg) {
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

  // 其他收入表-总表-保存
  async bizSumfeeBatchInsert(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizSumfee/batchInsert', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 招商代理费收入- 其他委管收入 - 查找
  async getIncomeAgentQueryPage(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/incomeAgent/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 招商代理费收入- 其他委管收入-保存
  async incomeAgentInsertBatch(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/incomeAgent/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 招商代理费收入- 其他委管收入 -删除
  async incomeAgentDeleteBatch(p, showMsg) {
    const code = {
      '0': '删除成功',
    }
    const res = await post('/incomeAgent/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 招商代理费收入- 租金管理费收入 - 查找
  async getIncomeRentQueryPage(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await post('/incomeRent/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 招商代理费收入- 租金管理费收入 -保存
  async incomeRentInsertBatch(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/incomeRent/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 招商代理费收入 - 其他收入 - 租金管理费收入 查找ID
  async getIncomeAgentGetTabId(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/incomeAgent/getTabId', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 停车场收入-查找
  async bizParkingQuery(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/bizParking/query', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 停车场收入-保存
  async bizParkingInsertBatch(p, showMsg) {
    const code = {
      '0': '保存成功',
    }
    const res = await post('/bizParking/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 停车场收入-查询车位
  async bizParkingQueryParkingNum(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await get('/bizParking/queryParkingNum', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 停车场收入-保存车位编辑
  async bizParkingInsertParkingNumBatch(p, showMsg) {
    const code = {
      0: '保存成功'
    }
    const res = await post('/bizParking/insertParkingNumBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 其他业务类型收入-查找
  async incomeOtherQueryPage(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/incomeOther/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 其他业务类型收入-保存
  async incomeOtherInsertBatch(p, showMsg) {
    const code = {
      0: '保存成功'
    }
    const res = await post('/incomeOther/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 其他业务类型收入-删除
  async incomeOtherDeleteBatch(p, showMsg) {
    const code = {
      0: '删除成功'
    }
    const res = await post('/incomeOther/deleteBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 预算编制-收入-联营收支明细-查找
  async bizUnionQuery(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizUnion/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }


}

const IncomeApi = new serviceApi()

export default IncomeApi
