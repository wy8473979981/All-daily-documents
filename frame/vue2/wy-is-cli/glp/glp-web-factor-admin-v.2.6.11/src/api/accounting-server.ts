import { http } from './http'
const glpFae = '/glp-fae'
// 会计引擎
// 科目体系管理-新增
export function addSubjectSubmit (params: any) {
  return http().post(`${glpFae}/subject/add`, params)
}
// 科目体系管理-编辑
export function editSubjectSubmit (params: any) {
  return http().post(`${glpFae}/subject/edit`, params)
}
// 科目体系管理-禁用
export function handlSubjectDisabled (params: any) {
  return http().post(`${glpFae}/subject/status`, params)
}
// 场景配置管理-新增
export function addScenarioSubmit (params: any) {
  return http().post(`${glpFae}/scene/create`, params)
}
// 场景配置管理-编辑
export function editScenarioSubmit (params: any) {
  return http().post(`${glpFae}/scene/update`, params)
}
// 场景配置管理-禁用
export function handlScenarioDisabled (params: any) {
  return http().post(`${glpFae}/scene/operateAvailState`, params)
}
// 凭证配置管理-根据场景code校验是否已经生成该场景的凭证配置
export function getEvidenceConfigCheckScene (params: any) {
  return http().post(`${glpFae}/vouchermc/checkScene`, params)
}
// 凭证配置管理-新增
export function addEvidenceConfigSubmit (params: any) {
  return http().post(`${glpFae}/vouchermc/create`, params)
}
// 凭证配置管理-获取详情
export function editEvidenceConfigInfo (id: any) {
  return http().get(`${glpFae}/vouchermc/getOneVoucher/${id}`)
}
// 凭证配置管理-编辑
export function editEvidenceConfigSubmit (params: any) {
  return http().post(`${glpFae}/vouchermc/update`, params)
}
// 凭证配置管理-禁用
export function handlEvidenceConfigDisabled (params: any) {
  return http().post(`${glpFae}/vouchermc/upstatus`, params)
}
// 凭证明细管理-详情
export function handlEvidenceDetailInfo (params: any) {
  return http().post(`${glpFae}/voucher/record/detail`, params)
}
// 凭证明细管理-编辑
export function handlEvidenceDetailUpdata (params: any) {
  return http().post(`${glpFae}/voucher/record/update`, params)
}
// 凭证明细管理-作废
export function handlEvidenceDetailCancel (params: any) {
  return http().post(`${glpFae}/voucher/record/operateAvailState`, params)
}
// 凭证明细管理-导出
export function handlEvidenceDetailExport (params: any) {
  return http().post(`${glpFae}/vouchermc/exportAsyncExcel`, params)
}
// 凭证汇总管理-汇总上月
export function handlEvidenceCollectSummarize () {
  return http().get(`${glpFae}/summary/summarize`)
}
// 凭证汇总管理-同步JED
export function handlEvidenceCollectPostJde (params: any) {
  return http().post(`${glpFae}/summary/postJde`)
}
// 凭证汇总管理-列表同步JED
export function handlEvidenceCollectPostSceneJde (params: any) {
  return http().post(`${glpFae}/summary/postSceneJde`, params)
}
// 凭证汇总管理-获取汇总上月 同步JED 按钮状态
export function handlEvidenceCollectSummarizeStatus (params: any) {
  return http().get(`${glpFae}/summary/summarizeStatus`)
}
// 凭证汇总管理-详情
export function handlEvidenceCollectDetail (id: any) {
  return http().post(`${glpFae}/summary/detail/${id}`)
}
// 凭证汇总管理-导出
export function handlEvidenceCollectExport (params: any) {
  return http().post(`${glpFae}/summary/exportExcel`, params)
}
// 下载管理-删除
export function handlDownloadManageDelete (params: any) {
  return http().post(`${glpFae}/download/delete`, params)
}
