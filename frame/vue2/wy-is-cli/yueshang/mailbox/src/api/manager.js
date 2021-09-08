import { post, get } from "./http";
import { api } from "./api"

class Manager {
    // 保存为草稿
    async reply(p, showMsg) {
        const res = await post(api.manager.reply, p)
        return res
    }
    // 转发
    async forwardMailBox(p, showMsg) {
        const res = await post(api.manager.forwardMailBox, p)
        return res
    }
}
const ManagerApi = new Manager()

export default ManagerApi
