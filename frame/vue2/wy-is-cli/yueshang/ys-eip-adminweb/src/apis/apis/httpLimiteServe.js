import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"
class httpLimite extends Base {
	async getHttpList(p, showLoading = false) {
		return await post(URL.httpLimite.listUrl, p, showLoading)
	}
	async deleteHttp(p, showMsg, showLoading = false) {
		const res = await post(URL.httpLimite.deleteUrl, p, showLoading)
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
	async updateHttp(p, showMsg, showLoading = false) {
		const res = await post(URL.httpLimite.updateUrl, p, showLoading)
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
	async addHttp(p, showMsg, showLoading = false) {
		const res = await post(URL.httpLimite.addUrl, p, showLoading)
		const code = {
			'200': '添加成功',
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
const httpLimiteServe = new httpLimite()
export default httpLimiteServe