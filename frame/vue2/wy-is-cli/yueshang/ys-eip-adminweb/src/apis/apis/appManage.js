import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"

// 应用管理
class appManage extends Base {

  // 服务维护 列表
  async fwwfList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfListUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 服务维护 新增
  async fwwfAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 模糊搜索  请求通道  和  请求方式
  async fwwfNameByBusiness (p, showMsg, useScreenLoadingBol = false) {
    const res = await get(URL.appManage.fwwfNameByBusinessUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 服务维护 修改
  async fwwfEdit (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfEditUrl, p, useScreenLoadingBol)
    const code = {
      '200': '修改成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 服务维护 详情
  async fwwfDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfDetailUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 服务维护 启用或停用指定的服务
  async fwwfOperate (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfOperateUrl, p, useScreenLoadingBol)
    const code = {
      '200': '状态更改成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 服务维护—删除
  async fwwfDelete (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.fwwfDeleteUrl, p, useScreenLoadingBol)
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 参数维护 列表
  async cswfList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.cswfListUrl, p, useScreenLoadingBol)
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 参数维护 新增参数
  async cswfAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.cswfAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 参数维护 批量新增
  async cswfBatchAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.cswfBatchAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 参数维护 删除参数
  async cswfRemove (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.cswfRemoveUrl, p, useScreenLoadingBol)
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 参数维护 详情查询
  async cswfDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await get(URL.appManage.cswfDetailUrl, p, useScreenLoadingBol)
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 数据规则 列表
  async sjgzList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjgzListUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 数据规则 详情
  async sjgzDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjgzDetailUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 数据规则 — 新增 /可用 / 不可用
  async sjgzAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjgzAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }


  // 数据脱敏 列表
  async sjtmList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjtmListUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 获取指定服务的脱敏参数配置列表
  async sjtmDetail (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjtmDetailUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 数据脱敏 新增
  async sjtmAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjtmAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 数据脱敏 停用或启用指定脱敏参数
  async sjtmMidRegularSwitch (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.sjtmMidRegularSwitchUrl, p, useScreenLoadingBol)
    const code = {
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }

  // 限流配置 列表
  async xlpzList (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.xlpzListUrl, p, useScreenLoadingBol)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }
  // 限流配置 新增
  async xlpzAdd (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.xlpzAddUrl, p, useScreenLoadingBol)
    const code = {
      '200': '新增成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }
  // 限流配置 删除
  async xlpzDelete (p, showMsg, useScreenLoadingBol = true) {
    const res = await post(URL.appManage.xlpzDeleteUrl, p, useScreenLoadingBol)
    const code = {
      '200': '删除成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = { ...{ [res.code]: res.message }, ...code }
    this.code = res.code
    this.showMsg = showMsg
    this.message()
    return res
  }



}

const appManageServe = new appManage()
export default appManageServe
