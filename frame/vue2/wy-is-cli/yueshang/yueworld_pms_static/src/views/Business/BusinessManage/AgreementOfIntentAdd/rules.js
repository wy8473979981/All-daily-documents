/*
 * @Description: 表单默认验证
 * @Author: zengcheng
 * @Date: 2021-07-01 16:07:13
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-07 20:52:39
 */
// 基本信息表单验证
export const rule = {
  programName: [{ required: true, message: '项目名称不能为空' }],
  intentProtocolName: [{ required: true, message: '意向名称不能为空' }],
  tenantName: [{ required: true, message: '商家名称不能为空' }],
  programOperateStatus: [{ required: true, message: '经营状态不能为空' }],
  taxTypeId: [{ required: true, message: '计税类型不能为空' }],
  centralizedId: [{ required: true, message: '收银类型不能为空' }],
  signedId: [{ required: true, message: '合同签署不能为空' }],
  attributeId: [{ required: true, message: '合同属性不能为空' }],
  textType: [{ required: true, message: '文本类型不能为空' }]

}

// 商务信息信息表单验证
export const businessAffairsRule = {

  leaseArea: [{ required: true, message: '租赁区域不能为空' }],
  isRentShop: [{ required: true, message: '是否分铺计租不能为空' }],
  areaIdType: [{ required: true, message: '计租面积类型' }],
  spaceFormatNamePlan: [{ required: true, message: '规划业态不能为空' }],
  spaceGrossArea: [{ required: true, message: '建筑面积不能为空' }],
  spaceNetArea: [{ required: true, message: '套内面积不能为空' }],
  meterRentArea: [{ required: true, message: '计租面积不能为空' }],
  appointDate: [{ required: true, message: '交付日不能为空' }],
  decorationEnterDate: [{ required: true, message: '装修进场日不能为空' }],
  decorateEndDate: [{ required: true, message: '装修结束日不能为空' }],
  openDate: [{ required: true, message: '开业日不能为空' }],
  contBeginDate: [{ required: true, message: '合同开始日不能为空' }],
  contEndDate: [{ required: true, message: '合同结束日不能为空' }],
  decoratePeriod: [{ required: true, message: '装修期不能为空' }],
  rentYears: [{ required: true, message: '租期不能为空' }],
  meterRentBeginDate: [{ required: true, message: '租金起计日不能为空' }],
  managementBeginDate: [{ required: true, message: '物管费起计日不能为空' }]

}

// 周期费项

export const fixedRenRule = {
  deductPaymentCycleId: [{ required: true, message: '提成支付周期不能为空' }],
  fixedPaymentCycleId: [{ required: true, message: '固定支付周期不能为空' }],
  collectId: [{ required: true, message: '账期模式不能为空' }],
  n: [{ required: true, message: 'n' }],
  paymentUnitId: [{ required: true, message: '单价' }],
  latestpaymentDay: [{ required: true, message: '最迟缴费日' }],
  tax: [{ required: true, message: '税率' }],
  invoiceTypeId: [{ required: true, message: '票据类型' }],
  commissionType: [{ required: true, message: '提成类型' }],
  isClassDeduction: [{ required: true, message: '是否有品类扣' }],
  salesTaxRate: [{ required: true, message: '销售额税率' }],
  algorithmId: [{ required: true, message: '收费方式' }],
  cycleType: [{ required: true, message: '销售额税率' }],
  t0: [{ required: true, message: '销售额类型' }]

}
