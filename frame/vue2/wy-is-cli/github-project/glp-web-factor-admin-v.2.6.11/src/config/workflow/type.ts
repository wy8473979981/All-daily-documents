export interface WorkflowContextForm {
  businessId: string;
}

export type WorkflowContextKey =
  'LC000071' // 银行账户审批
| 'LC000098' // 项目配置审批
| 'LC000087' // 应收账款审批
| 'LC000153' // 应收账款作废
| 'LC000160' // 买卖方关系审批
| 'LC000086' // 余额拨付申请,
| 'LC000159' // 合同审批
| 'LC000161' // 融资订单审批
| 'LC000178' // 普链保预审

export interface WorkflowContext {
  taskId: string;
  processId: string;
  procDefKey: WorkflowContextKey;
  orderNo: string;
  currentNode: string;
  dynamicForm: WorkflowContextForm;
}

export interface WorkflowHandler {
  view: (ctx: WorkflowContext) => false | string;
  audit: (ctx: WorkflowContext) => false | string;
}
