import { post, get } from "./api";
import { URL } from "./URL"
class zhaoshang {
	//获取招商进度的项目
	async getMakeBusnessProjectList(p, showLoading = false) {
	    return await get(URL.makeBusiness.selectProjectList, p, showLoading)
	}
	async getTableData(p, showMsg) {
		return await get(URL.makeBusiness.investmentList, p)
	}
	async getTableDetailData(p, showMsg) {
		return await get(URL.makeBusiness.investmentsList, p)
	}
	async getRejectTableData(p, showMsg) {
		return await get(URL.makeBusiness.rejectList, p)
	}
	async getExtractList(p, showMsg) {
		return await get(URL.makeBusiness.extractList, p)
	}
	async getPerfListTableData(p, showMsg) {
		return await get(URL.makeBusiness.summariesList, p)
	}
	async getPrefDetailTableData(p, showMsg) {
		return await get(URL.makeBusiness.assessmentsProjectsList, p)
	}
	async getBrandList(p, showMsg) {
		return await get(URL.makeBusiness.monitoringList, p)
	}
	async getRentCompleteRate(p, showMsg) {
		return await get(URL.makeBusiness.rentcompleteratetList, p)
	}
	async getBrandNum(p, showMsg) {
		return await get(URL.makeBusiness.jcstlist, p)
	}
	async getHtbslist(p, showMsg) {
		return await get(URL.makeBusiness.htbslist, p)
	}
	async getSwqplist(p, showMsg) {
		return await get(URL.makeBusiness.swqplist, p)
	}
}
const zhaoshangServe = new zhaoshang()
export default zhaoshangServe