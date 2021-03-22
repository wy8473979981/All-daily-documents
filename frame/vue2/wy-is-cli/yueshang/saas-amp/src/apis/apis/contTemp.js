import { post } from '../interceptor'
import Base from './base'

class ContTemp extends Base {
  // 新增模板草稿
  async createScript (p, showMsg) {
    const code = {
      '200': '暂存成功',
      '2001': '参数非法'
    }
    const res = await post('/contractMould/add', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 更新草稿
  async updateScript (p, showMsg) {
    const code = {
      '200': '更新草稿成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2010': '合同模板已发布，无法再次编辑'
    }
    const res = await post('/contractMould/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 新增/发布模板
  async createLaunch (p, showMsg) {
    /**
     * step 1 保存为草稿
     * step 2 发布
     */
    const { contract_mould_view, company_id, ...rest } = p
    /*
      step 1
    */
    const res = await contTemp.createScript(rest, { success: false, error: true })
    if (res.code === 200) {
      const params2 = {
        contract_mould_id: res.result.contract_mould_id,
        company_contract_id: rest.company_contract_id,
        contract_mould_view
      }
      const code = {
        '200': '发布成功',
        '2001': '参数非法',
        '2007': '数据不存在',
        '2010': '合同模板已发布，无法再次编辑',
        '2011': '系统排队中，请稍后再试',
        '2012': '合同模板数据存在问题，请仔细核实'
      }
      /*
        step 2
      */
      const res2 = await post('/contractMould/publish', { ...params2, timeout: 1000 * 60 * 5 })
      console.log(res2, 'step2')
      this.codeMap = code
      this.code = res2.code
      this.showMsg = showMsg
      this.message()
      return res2
    } else {
      return {
        code: 300,
        msg: '暂存失败'
      }
    }
  }

  // 更新/发布模板
  async updateLaunch (p, showMsg) {
    /**
     * step 1 保存为草稿
     * step 2 发布
     */
    const { contract_mould_view, company_id, ...rest } = p
    /*
      step 1
    */
    const res = await contTemp.updateScript(rest, { success: false, error: true })
    if (res.code === 200) {
      const params2 = {
        contract_mould_id: res.result.contract_mould_id,
        company_contract_id: rest.company_contract_id,
        contract_mould_view
      }
      const code = {
        '200': '发布成功',
        '2001': '参数非法',
        '2007': '数据不存在',
        '2010': '合同模板已发布，无法再次编辑',
        '2011': '系统排队中，请稍后再试',
        '2012': '合同模板数据存在问题，请仔细核实'
      }
      /*
        step 2
      */
      console.log(params2, '---更新发布2')
      const res2 = await post('/contractMould/publish', { ...params2, timeout: 1000 * 60 * 5 })
      console.log(res2, 'step2')
      this.codeMap = code
      this.code = res2.code
      this.showMsg = showMsg
      this.message()
      return res2
    } else {
      return {
        code: 300,
        msg: '暂存失败'
      }
    }
  }

  // 查找模板
  async find (p, showMsg) {
    const code = {
      '200': '模板列表加载成功',
      '2001': '参数非法'
    }
    const res = await post('/contractMould/list', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 查找没有版本号的模板
  async findVersions (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法'
    }
    const res = await post('/contractMould/version', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据模板编号查询
  async findById (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/contractMould/load', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 根据机构编号-合同模板分类编号-版本号组合查询
  async findByMultiFactor (p, showMsg) {
    const code = {
      '200': '加载成功',
      '2001': '参数非法'
    }
    const res = await post('/contractMould/getContractMouldByCompanyId2CateId2Version', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 更新模板
  async update (p, showMsg) {
    const code = {
      '200': '更新成功',
      '2001': '参数非法',
      '2007': '数据不存在',
      '2010': '合同模板已发布，无法再次编辑'
    }
    const res = await post('/contractMould/update', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 删除模板
  async del (p, showMsg) {
    const code = {
      '200': '删除成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/contractMould/del', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 恢复模板
  async restore (p, showMsg) {
    const code = {
      '200': '恢复成功',
      '2001': '参数非法',
      '2007': '数据不存在'
    }
    const res = await post('/contractMould/renew', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
}

const contTemp = new ContTemp()

export default contTemp
