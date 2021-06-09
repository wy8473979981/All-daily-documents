import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"
class systemManage extends Base {
	//获取招商进度的项目
	async getAppList(p, showLoading = false) {
		console.log(URL)
	    return await post(URL.systemManage.appListUrl, p, showLoading)
	}
	async getUser(p, showLoading = false) {
		return await post(URL.systemManage.userListUrl, p, showLoading)
	}
	async searchApp(p, showLoading = false) {
		return await get(URL.systemManage.searchAppUrl, p, showLoading)
	}
	async getDicList(p, showLoading = false) {
		return await post(URL.systemManage.dicListUrl, p, showLoading)
	}
	async getDicTypes(p, showLoading = false) {
		return await get(URL.systemManage.dicTypes, p, showLoading)
	}
	async addDic(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.addDic, p, showLoading)
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
	async switchOpen(p, showLoading = false) {
		return await post(URL.systemManage.switchOpenUrl, p, showLoading)
	}
	async deleteDic(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.deleteDicUrl, p, showLoading)
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
	async checkSelect(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.imitCheckUrl, p, showLoading)
		const code = {
			'200': '勾选成功',
			'999': '令牌无效,请重新登录',
			'2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getServeMenu(p, showLoading = false) {
		return await get(URL.systemManage.serveMenu, p, showLoading)
	}
	async getAppSuportList(p, showLoading = false) {
		return await post(URL.systemManage.appSuportListUrl, p, showLoading)
	}
	async addApp(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.addAppUrl, p, showLoading)
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
	async deleteApp(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.deleteAppUrl, p, showLoading)
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
	async updataApp(p, showMsg, showLoading = false) {
		const res = await post(URL.systemManage.updataAppUrl, p, showLoading)
		const code = {
			'200': '更新成功',
			'999': '令牌无效,请重新登录',
			'2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getSecretKey(p, showMsg, showLoading = false) {
		const res = await get(URL.systemManage.secretKeyUrl, p, showLoading)
		const code = {
			'200': '获取成功',
			'999': '令牌无效,请重新登录',
			'2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getDicName(p, showLoading = false) {
		return await get(URL.systemManage.dicNameUrl, p, showLoading)
	}
	async getUserLinkList(p, showLoading = false) {
		return await get(URL.systemManage.userLinkListUrl, p, showLoading)
	}
	async getUpdateSecretUrl(p, showMsg, showLoading = false) {
		const res = await get(URL.systemManage.updateSecretUrl, p, showLoading)
		const code = {
			'200': '更新成功',
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
const systemManageServe = new systemManage()
export default systemManageServe