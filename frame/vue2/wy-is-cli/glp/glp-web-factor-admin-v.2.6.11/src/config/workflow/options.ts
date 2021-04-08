import { WorkflowHandler, WorkflowContext } from './type'

// 应收账款审核工作流
export const debt: WorkflowHandler = {
  view: ({ procDefKey, dynamicForm }: WorkflowContext) => {
    if (procDefKey !== 'LC000087') return false
    return `/finance/debt/detail/${dynamicForm.businessId}`
  },
  audit: ({ procDefKey, dynamicForm, currentNode }: WorkflowContext) => {
    if (procDefKey !== 'LC000087') return false
    return `/finance/debt/audit/${dynamicForm.businessId}`
  }
}

// 应收账款作废工作流
export const debtCancel: WorkflowHandler = {
  view: ({ procDefKey, dynamicForm }: WorkflowContext) => {
    if (procDefKey !== 'LC000153') return false
    return `/finance/debt/detail/${dynamicForm.businessId}`
  },
  audit: ({ procDefKey, dynamicForm, currentNode }: WorkflowContext) => {
    if (procDefKey !== 'LC000153') return false
    return `/finance/debt/cancel-audit/${dynamicForm.businessId}`
  }
}

export const account: WorkflowHandler = {
  view: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000071') return false
    return `/customer/bank/actual/detail?processId=${processId}&isDetail=1`
  },
  audit: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000071') return false
    return `/customer/bank/actual/detail?processId=${processId}`
  }
}

export const project: WorkflowHandler = {
  view: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000098') return false
    return `/project/product/detail/${processId}?type=auth&queryParam=processId`
  },
  audit: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000098') return false
    return `/project/product/detail/${processId}?type=auth&queryParam=processId`
  }
}

export const relationBuyerAndSeller: WorkflowHandler = {
  view: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000160') return false
    return `/project/product/relationship/detail?processId=${processId}&isDetail=1`
  },
  audit: ({ procDefKey, processId }: WorkflowContext) => {
    if (procDefKey !== 'LC000160') return false
    return `/project/product/relationship/detail?processId=${processId}`
  }
}

export const balanceAppropriation: WorkflowHandler = {
  view: ({ procDefKey, taskId, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000086') return false
    return `post-loan/balance-return/edit/audit?refund=${orderNo}&taskId=${taskId}`
  },
  audit: ({ procDefKey, taskId, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000086') return false
    return `post-loan/balance-return/edit/audit?refund=${orderNo}&taskId=${taskId}`
  }
}

export const contractmenu: WorkflowHandler = {
  view: ({ procDefKey, dynamicForm }: WorkflowContext) => {
    if (procDefKey !== 'LC000159') return false
    return `/contract/audit/${dynamicForm.businessId}?status=finish`
  },
  audit: ({ procDefKey, dynamicForm }: WorkflowContext) => {
    if (procDefKey !== 'LC000159') return false
    return `/contract/audit/${dynamicForm.businessId}?status=pending`
  }
}

// 融资订单审核工作流
export const order: WorkflowHandler = {
  view: ({ procDefKey, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000161') return false
    return `/finance/order/detail/${orderNo}`
  },
  audit: ({ procDefKey, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000161') return false
    return `/finance/order/audit/${orderNo}`
  }
}

// 普链保融资订单预审工作流
export const plbOrder: WorkflowHandler = {
  view: ({ procDefKey, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000178') return false
    return `/finance/order/pre-detail/${orderNo}`
  },
  audit: ({ procDefKey, orderNo }: WorkflowContext) => {
    if (procDefKey !== 'LC000178') return false
    return `/finance/order/pre-audit/${orderNo}`
  }
}
