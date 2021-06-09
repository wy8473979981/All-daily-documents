import { get, post } from '../interceptor'
import Base from './base.js'
import { URL } from "../URL"
class system extends Base {
	async getServeList (p, showLoading = false) {
		return await post(URL.system.serveListUrl, p, showLoading)
	}
	async getRequst (p, showMsg, showLoading = false) {
		const res =  await get(URL.system.requsttUrl, p, showLoading)
		const code = {
		  '200': '加载成功',
		  '999': '令牌无效,请重新登录',
		  '2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getCountList (p, showLoading = false) {
		return await post(URL.system.countListUrl, p, showLoading)
	}
	async getLineEchart (p, showMsg, showLoading = false) {
		const res = await post(URL.system.lineEchartUrl, p, showLoading)
		const code = {
		  '200': '加载成功',
		  '999': '令牌无效,请重新登录',
		  '2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getLineAppEchart (p, showMsg, showLoading = false) {
		const res = await post(URL.system.lineAppEchartUrl, p, showLoading)
		const code = {
		  '200': '加载成功',
		  '999': '令牌无效,请重新登录',
		  '2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async getCountAppList (p, showLoading = false) {
		return await post(URL.system.countAppListUrl, p, showLoading)
	}
	async getTimeList (p, showLoading = false) {
		return await post(URL.system.timeListUrl, p, showLoading)
	}


	// 获取所有线程池监控信息
	async getThreadPoolInfo (p, showMsg, useScreenLoadingBol = true) {
		const res = await get(URL.system.getThreadPoolInfo, p, useScreenLoadingBol)
		const code = {
			'200': '加载成功',
			'999': '令牌无效,请重新登录',
			'2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	// 修改指定服务上的指定线程池的参数
	async editParamOfThreadPoolForTargetServer (p, showMsg, useScreenLoadingBol = true) {
		const res = await post(URL.system.editParamOfThreadPoolForTargetServer, p, useScreenLoadingBol)
		const code = {
			'200': '加载成功',
			'999': '令牌无效,请重新登录',
			'2001': '参数非法'
		}
		this.codeMap = { ...{ [res.code]: res.message }, ...code }
		this.code = res.code
		this.showMsg = showMsg
		this.message()
		return res
	}
	async retry(p, showMsg, useScreenLoadingBol = true) {
		const res = await post(URL.system.retryUrl, p, useScreenLoadingBol)
		const code = {
			'200': '加载成功',
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
const systemServe = new system()
export default systemServe