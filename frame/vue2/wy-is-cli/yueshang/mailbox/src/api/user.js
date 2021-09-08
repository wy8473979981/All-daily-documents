import { post, get } from "./http"
import { api } from "./api"

class User {
    // 保存为草稿
    async saveMailbox(p, showMsg) {
        const res = await post(api.user.saveMailbox, p)
        return res
    }
    // 获取草稿箱列表
    async selectDraftBox(p, showMsg) {
        const res = await post(api.user.selectDraftBox, p)
        return res
    }
    // 获取草稿箱列表
    async deleteMailBox(p, showMsg) {
        const res = await post(api.user.deleteMailBox, p)
        return res
    }
    // 恢复邮件
    async cancelDelete(p, showMsg) {
        const res = await post(api.user.cancelDelete, p)
        return res
    }
    // 发送邮件
    async sendMailbox(p, showMsg) {
        const res = await post(api.user.sendMailbox, p)
        return res
    }
    // 已发送列表
    async selectSend(p, showMsg) {
        const res = await post(api.user.selectSend, p)
        return res
    }
}
const UserApi = new User()

export default UserApi
