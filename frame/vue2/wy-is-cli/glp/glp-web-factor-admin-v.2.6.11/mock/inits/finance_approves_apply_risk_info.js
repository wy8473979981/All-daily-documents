import Mock from 'mockjs'

const data = [
  {
    custName: '成都返空汇物流科技有限公司', // 客户名称
    custType: '企业', // 客户类型
    idType: '新三证', // 证件类型
    creditCode: '91310000797046224D', // 社会信用代码
    legaler: 'xxx', // 法人
    legalCreditType: '身份证', // 法人证件类型
    legalCreditNo: '310101198504069999', // 法人证件号码
    projName: '成都返空汇正向保理定向支付_父额度', // 项目名称
    totalLimit: '10,000.00', // 获批额度
    limitType: '循环', // 额度类型
    rateType: '按日计息', // 计息方式
    refundType: '随借随还', // 还款方式
    refundAccount: '9837437448488', // 应收账款回款账户
    applyPassDate: '2020-04-13 00:00:00', // 审批通过时间
    validMonth: '24', // 有效期限（月）
    limitStartDate: '2020-04-13 00:00:00', // 额度生效时间
    limitExpiredDate: '2022-04-12 00:00:00', // 额度失效时间
    custManager: 'xxx', // 经办客户经理
    riskManager: 'xxx', // 经办风控经理
    limitRate: '0.01', // 额度提用费比例
    financeDay: '90', // 融资期限（天）
    rateOfYear: '0.125', // 名义利率（年）
    overdueRate: '0.01', // 宽限期利率
    contractFrame: '1', // 合同结构
    premiseOfUse: '1', // 用信前提
    premiseOfPay: '1', // 对外付款前提
    premiseOfValid: '1', // 合同生效前提
    manageAdvise: '1', // 贷后管理建议
    otherNotice: '', // 其他事项
    hasBit: '', // 是否分润
    BitRate: '', // 分润比例
    isPayMargin: '', // 是否缴纳保证金
    payMarginBase: '', // 保证金缴纳基数
    payMarginRate: '0.01', // 保证金缴纳比例
    useOfFund: '', // 贷款用途
    voucher: '徐毅刚', // 担保方名称
    vouchType: '个人', // 担保方类型
    vouchNo: '235407195106112745' // 担保方证件号
  }
]

export default data
