import { get, post, put, del } from '../interceptor'
import Base from './base'
// 类型配置-存量资产
class LeaseApi extends Base {
  // 查询租赁分页列表
  async find(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/bizLease/queryPage', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }

  // 编辑
  async edit(p, showMsg) {
    const code = {
      0: '编辑成功'
    }
    const res = await post('/bizLease', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 新签用户列表
  async newUser(p, showMsg) {
    const code = {
      0: '查询成功',
    }
    const res = await post('/InstanceBizMerchant/queryByName', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //添加商户
  async addUser(p, showMsg) {
    const code = {
      '0': '提交成功',
    }
    const res = await post('/InstanceBizMerchant', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //新增拆普信息
  async addSplitStore(p, showMsg) {
    const code = {
      0: '提交成功',
      1: '请求异常'
    }
    const res = await post('/bizOperateStore/addSplitStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //编辑合同调铺
  async addChangeStore(p, showMsg) {
    const code = {
      0: '编辑成功',
      1: '请求异常'
    }
    const res = await post('/bizOperateStore/addChangeStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 新增合铺信息
  async addMergeStore(p, showMsg) {
    const code = {
      0: '提交成功',
       1: '请求异常'
    }
    const res = await post('/bizOperateStore/addMergeStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //获取拆铺信息

  async getSplitInfo(p, showMsg) {
    const code = {
      '0': '查询成功'
    }
    const res = await get('/bizOperateStore/getSplitStore/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //获取合铺信息/bizOperateStore/getMergeStore/{leaseId}
  async getMergeInfo(p, showMsg) {
    const code = {
      '0': '加载成功',
    }
    const res = await get('/bizOperateStore/getMergeStore/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //根据铺位id 和生效日 查询合同信息/bizOperateStore/addSplitStore
  async mergeSplit(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/bizLease/queryDataByStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  // 新增拆合铺新铺信息GET /bizNewStore/{id}
  async getNewShop(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await get('/bizNewStore/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 更改拆合铺新铺信息
  async updateNewShop(p, showMsg) {
    const code = {
      0: '提交成功',
    }
    const res = await post('/bizNewStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 删除拆合铺DELETE /bizNewStore
  async deleteNewShop(p, showMsg) {
    const code = {
      0: '删除成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await post('/bizNedeletewStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 根据铺位id 合同id 查询欠费信息
  async owingMoney(p, showMsg) {
    const code = {
      0: '加载成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await get('/bizClearowe/queryListByLeaseId/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 编辑清欠的的费用清单
  async editOwingMoneyInfo(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/bizLease/queryOwe', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }

  // 修改欠费信息
  async updateOwingMoney(p, showMsg) {
    const code = {
      0: '编辑成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await post('bizClearowe/insertBatch', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }



  // 住宅/写字楼 新增-保存
  async addSaveResidence(p, showMsg) {
    const code = {
      0: '保存成功'
    }
    const res = await post('/bizLease', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 住宅/写字楼 编辑-保存
  async editSaveResidence(p, showMsg) {
    const code = {
      0: '保存成功'
    }
    const res = await put('/bizLease', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 住宅/写字楼 删除
  async delResidence(p, showMsg) {
    const code = {
      0: '删除成功'
    }
    const res = await put('/bizLease/updateBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 住宅/写字楼 查询单个
  async getResidence(p, showMsg) {
    const code = {
      0: '查询成功'
    }
    const res = await get('/bizLease/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  //取消合铺
  async deleteMergeStore(p, showMsg) {
    const code = {
      0: '删除成功'
    }
    const res = await post('/bizOperateStore/deleteMergeStore', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //取消拆铺
  async deleteSplitStore(p, showMsg) {
    const code = {
      0: '删除成功'
    }
    const res = await post('/bizOperateStore/deleteSplitStore/', p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //合同信息查询
  async getChangeStore(p, showMsg) {
    const code = {
      0: '查询成功',
      999: '令牌无效,请重新登录',
      2001: '参数非法',
      2003: '该项目已经存在，不能重复添加'
    }
    const res = await post('/bizOperateStore/getChangeStore/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 住宅/写字楼 查询清欠目标
  async getBizClearowe(p, showMsg) {
    const code = {
      0: '查询成功'
    }
    const res = await get('/bizClearowe/queryListByLeaseId/' + p)
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 住宅/写字楼 保存清欠目标
  async saveBizClearowe(p, showMsg) {
    const code = {
      0: '保存成功',
    }
    const res = await post('/bizClearowe/insertBatch', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 楼层获取
  async getFloorList(p, showMsg) {
    const code = {
      0: '保存成功'
    }
    const res = await get('/bizLease/queryFloorList', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //导出bizLease/excelExport
  async getExcle(url, p, showMsg) {
    const res = await get(url, p,'arraybuffer')
    return res
  }
  async getStoreNo(p, showMsg) {
    const code = {
      0: '加载成功',
    }
    const res = await post('/bizLease/queryDataByStoreNo', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
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
    const res = await post('/bizOperateStore/deleteContract', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //获取新铺信息
  async getOperStore(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizOperateStore/getOperStore/'+ p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    return res
  }
  //编辑新浦信息
  async getNewStoreVO(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizOperateStore/getNewStoreVO/'+ p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    return res
  }
  //编辑新铺/bizOperateStore/updateNewStoreVO
  async editNewStoreVO(p, showMsg) {
    const code = {
      0: '编辑成功'
    }
    const res = await post('/bizOperateStore/updateNewStoreVO', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  //住宅/写字楼多经
  async bizLeaseMultiFind(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizLeaseMulti/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //住宅/写字楼多经导出bizLeaseMultiExcelExport
  async getMultiExcle(p, showMsg) {
    const res = await get('/bizLeaseMulti/excelExport', p,'arraybuffer')
    return res
  }
  //住宅/写字楼导出
  async getZxExcle(p, showMsg) {
    const res = await get('/bizLeaseZx/excelExport', p,'arraybuffer')
    return res
  }
  //住宅/写字楼分页
  async bizLeaseZxFind(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizLeaseZx/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
  //住宅写字楼清欠
  async bizClearoweZxFind(p, showMsg) {
    const code = {
      0: '加载成功'
    }
    const res = await post('/bizClearoweZx/queryPage', p)
    this.codeMap = { ...{ [res.code]: res.msg }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    //this.message()
    return res
  }
}
const leaseApi = new LeaseApi()

export default leaseApi
