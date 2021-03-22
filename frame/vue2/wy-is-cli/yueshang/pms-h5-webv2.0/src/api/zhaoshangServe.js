import { post, get } from "./api";
import { URL } from "./URL"
class zhaoshang {
	async getTableData(p, showMsg) {
		return await get(URL.externalLinkURL.investmentList, p)
	}
	async getTableDetailData(p, showMsg) {
		return await get(URL.externalLinkURL.investmentsList, p)
	}
	async getRejectTableData(p, showMsg) {
		return await get(URL.externalLinkURL.rejectList, p)
	}
	async getExtractList(p, showMsg) {
		return await get(URL.externalLinkURL.extractList, p)
	}
	async getPerfListTableData(p, showMsg) {
		return await get(URL.externalLinkURL.summariesList, p)
	}
	async getPrefDetailTableData(p, showMsg) {
		return await get(URL.externalLinkURL.assessmentsProjectsList, p)
	}
	async getBrandList(p, showMsg) {
		return await get(URL.externalLinkURL.monitoringList, p)
	}
	async getRentCompleteRate(p, showMsg) {
		return await get(URL.externalLinkURL.rentcompleteratetList, p)
	}
	async getBrandNum(p, showMsg) {
		return await get(URL.externalLinkURL.jcstlist, p)
	}
	async getHtbslist(p, showMsg) {
		return await get(URL.externalLinkURL.htbslist, p)
	}
	async getSwqplist(p, showMsg) {
		return await get(URL.externalLinkURL.swqplist, p)
	}
}
const zhaoshangServe = new zhaoshang()
export default zhaoshangServe