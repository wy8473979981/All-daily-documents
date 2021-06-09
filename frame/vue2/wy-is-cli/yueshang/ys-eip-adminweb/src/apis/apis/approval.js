import { get, post } from '../interceptor'
import Base from './base.js'

// 审批数据相关接口
class Approval extends Base {

  // 审批推送查询列表
  async findApprovePushPage (p, showMsg) {
    const res = await post('approve/push/findApprovePushPage', p)
    return res
  }
  
  // 审批推送查询删除
  async deleteApprovePush (p, showMsg) {
    const res = await post('approve/dataPush/deleteApprovePush', p)
    return res
  }

  // 审批信息查询列表
  async getInfoList (p, showMsg) {
    const res = await post('approve/getPageApproveVo', p)
    return res
  }
  
  // 审批信息查询删除
  async deleInfo (p, showMsg) {
    const res = await post('approve/deletePageApproveVo', p)
    return res
  }

  // 数据通知列表
  async getNoticeList (p, showMsg) {
    const res = await post('approve/dataPush/findPmApproveDataSyncPage', p)
    // const res = await post('approve/nofity/findNotifyPage', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  
  // 数据通知删除
  async deleNotice (p, showMsg) {
    // const res = await post('approve/dataPush/deleteByPushIds', p)
    const res = await post('approve/dataPush/deleteBySyncIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

   // 审批共享列表
   async getShareList (p, showMsg) {
    const res = await post('approve/share/findPmApprveSharePage', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  
  // 审批共享删除
  async deleShare (p, showMsg) {
    const res = await post('approve/share/deleteByShareIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 延期申请列表
  async getDelayList (p, showMsg) {
    const res = await post('approve/delay/findPmApproveDelayPage', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  
  // 延期申请删除
  async deleDelay (p, showMsg) {
    const res = await post('approve/delay/deleteByDelayIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  // 待办事项列表
  async getTodoList (p, showMsg) {
    const res = await post('approve/task/findPmApproveTaskPage', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  
  // 待办事项删除
  async deleTodo (p, showMsg) {
    const res = await post('approve/task/deleteByTaskIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

   // 数据同步列表
   async getSyncList (p, showMsg) {
    const res = await post('approve/sync/findPmApproveSyncPage', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }

  
  // 数据同步删除
  async deleSync (p, showMsg) {
    const res = await post('approve/sync/deleteBySyncIds', p)
    const code = {
      '200': '加载成功',
      '999': '令牌无效,请重新登录',
      '2001': '参数非法'
    }
    this.codeMap = code
    this.code = res.code
    this.showMsg = showMsg
    // this.message()
    return res
  }


}

const approval = new Approval()
export default approval
