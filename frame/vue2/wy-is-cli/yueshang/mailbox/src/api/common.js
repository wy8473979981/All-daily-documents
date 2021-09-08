import { post, get, upload } from "./http";
import { BlApi } from "./apiOther"
import {api} from "./api";

class Common {
    // 获取用户信息
    async getToken(p, showMsg, showLoading = true) {
        const res = await get(BlApi.getToken, p, showLoading)
        return res
    }
    // 获取用户信息
    async getUserInfo(p, showMsg, showLoading = true) {
        const res = await post(BlApi.userInfo, p, showLoading)
        return res
    }
    // 获取通讯录列表
    async getWabTreePosApp(p, showMsg, showLoading = true) {
        const res = await post(BlApi.getWabTreePosApp, p, showLoading)
        return res
    }
    // 查询通讯录
    async searchUserList(p, showMsg, showLoading = true) {
        const res = await post(BlApi.searchUserList, p, showLoading)
        return res
    }
    // 数据字典
    async mailBoxEnum(p, showMsg) {
        const res = await post(api.common.mailBoxEnum, p)
        return res
    }
    // 查询未读数量
    async selectNoReadCount(p, showMsg, showLoading = true) {
        const res = await post(api.common.selectNoReadCount, p)
        return res
    }
    // 收件箱列表
    async selectReceiver(p, showMsg) {
        const res = await post(api.common.selectReceiver, p)
        return res
    }
    // 已读列表
    async selectIsRead(p, showMsg) {
        const res = await post(api.common.selectIsRead, p)
        return res
    }
    // 未读列表
    async selectNoRead(p, showMsg) {
        const res = await post(api.common.selectNoRead, p)
        return res
    }
    // 已回复列表
    async selectReply(p, showMsg) {
        const res = await post(api.common.selectReply, p)
        return res
    }
    // 未回复列表
    async selectNoReply(p, showMsg) {
        const res = await post(api.common.selectNoReply, p)
        return res
    }
    // 删除列表
    async selectDelete(p, showMsg) {
        const res = await post(api.common.selectDelete, p)
        return res
    }
    // 详情
    async detail(p, showMsg) {
        const res = await post(api.common.detail, p)
        return res
    }
    // 置顶
    async updateIsTop(p, showMsg) {
        const res = await post(api.common.updateIsTop, p)
        return res
    }
    // 取消置顶
    async updateIsNoTop(p, showMsg) {
        const res = await post(api.common.updateIsNoTop, p)
        return res
    }
    // 上传文件
    async fileUpload(p, showMsg) {
        const res = await upload(api.common.fileUpload, p)
        return res
    }
}
const CommonApi = new Common()

export default CommonApi
