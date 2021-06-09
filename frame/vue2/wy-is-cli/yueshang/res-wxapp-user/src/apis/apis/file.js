import { get, post } from '../interceptor'
import Base from './base.js'

// 文件相关接口

class File extends Base {

  // 文件上传
  async uploadFile (p, showMsg) {
    const res = await post('file/uploadFile', p)
    return res
  }

  // 文件加载
  async loadFiles (p, showMsg) {
    const res = await post('file/loadFiles', p)
    return res
  }

  // 文件删除
  async deleteFile (p, showMsg) {
    const res = await post('file/delete', p)
    return res
  }

  // 添加打印次数
  async addApprovePrint (p, showMsg) {
    const res = await post('approve/print/addApprovePrint', p)
    return res
  }

   // 获取其他附件
   async getOtherFileDetail (p, showMsg) {
    const res = await post('approve/getOtherFileDetail', p)
    return res
  }
  
  // 获取审批单全部附件列表
  async getAllFileDetail (p, showMsg) {
    const res = await post('approve/getAllFileDetail', p)
    return res
  }

  // 获取总裁签字附件
  async getSignFile (p, showMsg) {
    const res = await post('approve/getSignFile', p)
    return res
  }
}

const file = new File()
export default file
