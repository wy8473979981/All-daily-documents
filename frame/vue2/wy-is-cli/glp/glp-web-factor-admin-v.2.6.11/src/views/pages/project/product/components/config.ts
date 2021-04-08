
export const basicDataMethodOptions = [{ value: '0', label: '人工上传' }, { value: '1', label: '数据对接' }]

export const basicTypeOptions = [
  { value: 0, label: '运单' },
  { value: 1, label: '发票' },
  { value: 2, label: '无要求' }
]

export const basicValidTimeOptions = [
  { value: 0, label: '无' },
  { value: 1, label: '运单完成时间' }
]

export const latestDueDateTypeOptions = [
  { value: 1, label: '基础债权生效时间+风控审批最长期限' },
  { value: 2, label: '自定义' },
  { value: 3, label: '票据最晚还款日' },
  { value: 4, label: '经计算后自然月最后一天' }
]

export const cancelCondition2Options = [
  { value: 1, label: '风控审批最长期限' },
  { value: 2, label: '自定义' }
]

export const capitalFlowOptions = [
  { value: 1, label: '无要求' },
  { value: 2, label: '翻单支付' },
  { value: 3, label: '定向支付' }
]

export const rateDayOptions = [
  { value: 0, label: '风控约定宽限期' },
  { value: 1, label: '风控审批最长期限' }
]

export const debtTypeOptions = [
  { value: 1, label: '商票' },
  { value: 2, label: '运单类' },
  { value: 3, label: '无要求' }
]
export const debtTransNoticeOptions = [
  { value: 1, label: '通知有回执' },
  { value: 2, label: '通知无回执' },
  { value: 3, label: '无通知' }
]
export const billTransTypeOptions = [
  { value: 1, label: '一次性' },
  { value: 2, label: '按笔' }
]
export const valueDateOptions = [
  { value: 1, label: '打款成功日期' },
  { value: 2, label: '财务审核通过日期' }
]
export const makeLoanApproverFlowOptions = [
  { value: 1, label: '放款审批|标准' },
  { value: 2, label: '自动审批' }
]

export const cancelCondition1Options = [
  { value: 1, label: '基础债权生效时间' }
]

export const deadlineTimeOptions = []
export const balanceApprovalFlowOptions = []
