import { Controller, RequestMapping, ResData } from '@pat-fet/mock-server'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class auth extends Controller {
  @RequestMapping({ url: '/login', method: 'post' })
  login (req, res, context) {
    return null
  }

  @RequestMapping({ url: '/backend/logout', method: 'get' })
  logout (req, res, context) {
    return 'https://fbs.glpfin.com'
  }

  @RequestMapping({ url: '/401', method: 'get' })
  s401 (req, res, context) {
    return new ResData('401', 'session失效', 'https://fbs.glpfin.com')
  }

  // MOCK-COMMON @RequestMapping({ url: '/backend/user/info', method: 'get' })
  getContext (req, res, context) {
    // eslint-disable-next-line
    return {"name":"张三","userNo":"8a405011670f45da9c44974d34d9d638","phone":"13801752164","email":"sanzhang@glprop.com","status":"00","parentUserNo":"a5ade84e2a32488085ed4144664c5d51","parentUserName":"李四","tenantNo":"0001"}
  }

  // MOCK-COMMON @RequestMapping({ url: '/backend/user/rolesAndPerms', method: 'get' })
  getAuthories (req, res, context) {
    // eslint-disable-next-line
    return {"roles":[{"code":"blkfjs","name":"保理开发角色"}],"perms":[{"id":4805,"appId":187,"code":"base","name":"系统基础设置","label":"系统基础设置","parentId":0,"type":1,"pageUrl":"base","seq":1,"description":"系统基础设置","children":[{"id":4806,"appId":187,"code":"calendar","name":"工作日历管理","label":"工作日历管理","parentId":4805,"type":1,"pageUrl":"calendar","seq":1,"description":"工作日历管理","children":[]},{"id":4881,"appId":187,"code":"notice-rule","name":"通知规则管理","label":"通知规则管理","parentId":4805,"type":1,"pageUrl":"notice-rule","seq":2,"description":"通知规则管理","children":[]},{"id":4882,"appId":187,"code":"notice-list","name":"通知信息查询","label":"通知信息查询","parentId":4805,"type":1,"pageUrl":"notice-list","seq":3,"description":"通知信息查询","children":[]}]},{"id":4846,"appId":187,"code":"dashboard","name":"仪表盘","label":"仪表盘","parentId":0,"type":1,"pageUrl":"","seq":1,"description":"仪表盘","children":[]},{"id":4879,"appId":187,"code":"todo","name":"我的待办","label":"我的待办","parentId":0,"type":1,"pageUrl":"todo","seq":1,"description":"我的待办","children":[]},{"id":4847,"appId":187,"code":"comp","name":"组件示例","label":"组件示例","parentId":0,"type":1,"pageUrl":"","seq":2,"description":"组件示例","children":[{"id":4848,"appId":187,"code":"form-render","name":"表单渲染器","label":"表单渲染器","parentId":4847,"type":1,"pageUrl":"","seq":1,"description":"表单渲染器","children":[]},{"id":4849,"appId":187,"code":"data-table","name":"数据表格","label":"数据表格","parentId":4847,"type":1,"pageUrl":"","seq":2,"description":"数据表格","children":[]}]},{"id":4850,"appId":187,"code":"example","name":"页面示例","label":"页面示例","parentId":0,"type":1,"pageUrl":"","seq":3,"description":"页面示例","children":[{"id":4851,"appId":187,"code":"query","name":"查询示例","label":"查询示例","parentId":4850,"type":1,"pageUrl":"","seq":1,"description":"查询示例","children":[]}]},{"id":4852,"appId":187,"code":"customer","name":"客户管理","label":"客户管理","parentId":0,"type":1,"pageUrl":"","seq":4,"description":"客户管理","children":[{"id":4853,"appId":187,"code":"list","name":"客户列表","label":"客户列表","parentId":4852,"type":1,"pageUrl":"","seq":1,"description":"客户列表","children":[]},{"id":4872,"appId":187,"code":"account","name":"账号管理","label":"账号管理","parentId":4852,"type":1,"pageUrl":"","seq":2,"description":"账号管理","children":[]},{"id":4868,"appId":187,"code":"bank","name":"银行账户管理","label":"银行账户管理","parentId":4852,"type":1,"pageUrl":"","seq":3,"description":"银行账户管理","children":[{"id":4869,"appId":187,"code":"actual","name":"实体账户管理","label":"实体账户管理","parentId":4868,"type":1,"pageUrl":"","seq":1,"description":"实体账户管理","children":[]},{"id":4870,"appId":187,"code":"net","name":"账户体系管理","label":"账户体系管理","parentId":4868,"type":1,"pageUrl":"","seq":2,"description":"账户体系管理","children":[]}]}]},{"id":4858,"appId":187,"code":"project","name":"金融产品管理","label":"金融产品管理","parentId":0,"type":1,"pageUrl":"","seq":7,"description":"项目管理","children":[{"id":4883,"appId":187,"code":"quota","name":"额度项目管理","label":"额度项目管理","parentId":4858,"type":1,"pageUrl":"quota","seq":1,"description":"额度项目管理","children":[]},{"id":4859,"appId":187,"code":"product","name":"项目产品管理","label":"项目产品管理","parentId":4858,"type":1,"pageUrl":"","seq":2,"description":"项目产品管理","children":[]},{"id":4860,"appId":187,"code":"relationship","name":"买卖方管理","label":"买卖方管理","parentId":4858,"type":1,"pageUrl":"","seq":3,"description":"买卖方管理","children":[]}]},{"id":4861,"appId":187,"code":"assets","name":"资产管理","label":"资产管理","parentId":0,"type":1,"pageUrl":"","seq":8,"description":"资产管理","children":[{"id":4862,"appId":187,"code":"business-bill","name":"业务单据管理","label":"业务单据管理","parentId":4861,"type":1,"pageUrl":"","seq":1,"description":"业务单据管理","children":[]},{"id":4863,"appId":187,"code":"invoice","name":"发票管理","label":"发票管理","parentId":4861,"type":1,"pageUrl":"","seq":2,"description":"发票管理","children":[]},{"id":4899,"appId":187,"code":"note","name":"票据管理","label":"票据管理","parentId":4861,"type":1,"pageUrl":"note","seq":3,"description":"票据管理","children":[]}]},{"id":4864,"appId":187,"code":"finance","name":"融资管理","label":"融资管理","parentId":0,"type":1,"pageUrl":"","seq":9,"description":"融资管理","children":[{"id":4865,"appId":187,"code":"accounts-receivable","name":"应收账款管理","label":"应收账款管理","parentId":4864,"type":1,"pageUrl":"","seq":1,"description":"应收账款管理","children":[]},{"id":4866,"appId":187,"code":"list","name":"融资申请","label":"融资申请","parentId":4864,"type":1,"pageUrl":"","seq":2,"description":"融资申请","children":[]},{"id":4902,"appId":187,"code":"loan","name":"放款记录","label":"放款记录","parentId":4864,"type":1,"pageUrl":"loan","seq":4,"description":"loan","children":[]},{"id":4979,"appId":187,"code":"zhongdeng","name":"中等登记管理","label":"中等登记管理","parentId":4864,"type":1,"pageUrl":"","seq":4,"description":"中等登记管理","children":[{"id":4980,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4979,"type":2,"pageUrl":"","seq":1,"description":"详情","children":[]}]}]},{"id":4867,"appId":187,"code":"loan","name":"放款管理","label":"放款管理","parentId":0,"type":1,"pageUrl":"","seq":10,"description":"放款管理","children":[]},{"id":4873,"appId":187,"code":"balance","name":"回款管理","label":"回款管理","parentId":0,"type":1,"pageUrl":"balance","seq":12,"description":"回款管理-列表","children":[{"id":4874,"appId":187,"code":"transfer-flow","name":"流水记录","label":"流水记录","parentId":4873,"type":1,"pageUrl":"transfer-flow","seq":1,"description":"流水记录","children":[]}]},{"id":4884,"appId":187,"code":"post-loan","name":"贷后管理","label":"贷后管理","parentId":0,"type":1,"pageUrl":"post-loan","seq":16,"description":"贷后管理","children":[{"id":4885,"appId":187,"code":"clearing","name":"清分","label":"清分","parentId":4884,"type":1,"pageUrl":"clearing","seq":1,"description":"clearing","children":[]},{"id":4891,"appId":187,"code":"balance","name":"回款管理","label":"回款管理","parentId":4884,"type":1,"pageUrl":"balance","seq":1,"description":"balance","children":[{"id":4892,"appId":187,"code":"transfer-flow","name":"回款交易流水","label":"回款交易流水","parentId":4891,"type":1,"pageUrl":"transfer-flow","seq":1,"description":"transfer-flow","children":[]}]},{"id":4886,"appId":187,"code":"balance-return","name":"余额拨付","label":"余额拨付","parentId":4884,"type":1,"pageUrl":"balance-return","seq":2,"description":"balance-return","children":[{"id":4914,"appId":187,"code":"edit","name":"余额拨付-新增编辑","label":"余额拨付-新增编辑","parentId":4886,"type":1,"pageUrl":"edit","seq":1,"description":"余额拨付-新增编辑","children":[]},{"id":4915,"appId":187,"code":"detail","name":"余额拨付详情","label":"余额拨付详情","parentId":4886,"type":2,"pageUrl":"edit","seq":2,"description":"edit","children":[]}]},{"id":4889,"appId":187,"code":"settlement","name":"结算管理","label":"结算管理","parentId":4884,"type":1,"pageUrl":"settlement","seq":4,"description":"settlement","children":[{"id":4890,"appId":187,"code":"detail","name":"结算明细","label":"结算明细","parentId":4889,"type":1,"pageUrl":"detail","seq":1,"description":"detail","children":[]}]},{"id":4900,"appId":187,"code":"capital-flow","name":"资金交易流水","label":"资金交易流水","parentId":4884,"type":1,"pageUrl":"capital-flow","seq":5,"description":"capital-flow","children":[]},{"id":4901,"appId":187,"code":"invoice","name":"开票管理","label":"开票管理","parentId":4884,"type":1,"pageUrl":"invoice","seq":6,"description":"invoice","children":[]}]},{"id":4988,"appId":187,"code":"contract","name":"合同管理","label":"合同管理","parentId":0,"type":1,"pageUrl":"contract","seq":16,"description":"contract","children":[{"id":4989,"appId":187,"code":"formwork","name":"合同模板管理","label":"合同模板管理","parentId":4988,"type":1,"pageUrl":"formwork","seq":1,"description":"formwork","children":[{"id":4990,"appId":187,"code":"tasks","name":"合同模板管理","label":"合同模板管理","parentId":4989,"type":1,"pageUrl":"tasks","seq":1,"description":"tasks","children":[{"id":4991,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4990,"type":1,"pageUrl":"detail","seq":1,"description":"detail","children":[]}]},{"id":4992,"appId":187,"code":"list","name":"合同模板库","label":"合同模板库","parentId":4989,"type":1,"pageUrl":"list","seq":2,"description":"list","children":[{"id":4993,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4992,"type":1,"pageUrl":"detail","seq":1,"description":"detail","children":[]},{"id":4994,"appId":187,"code":"edit","name":"编辑","label":"编辑","parentId":4992,"type":1,"pageUrl":"edit","seq":2,"description":"edit","children":[]},{"id":4995,"appId":187,"code":"history","name":"历史","label":"历史","parentId":4992,"type":1,"pageUrl":"history","seq":3,"description":"hsitory","children":[]}]}]},{"id":4996,"appId":187,"code":"audit","name":"合同审核","label":"合同审核","parentId":4988,"type":1,"pageUrl":"audit","seq":2,"description":"audit","children":[{"id":4997,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4996,"type":1,"pageUrl":"detail","seq":1,"description":"detail","children":[]},{"id":4998,"appId":187,"code":"edit","name":"审核","label":"审核","parentId":4996,"type":1,"pageUrl":"edit","seq":2,"description":"edit","children":[]}]},{"id":4999,"appId":187,"code":"ledger","name":"合同台账","label":"合同台账","parentId":4988,"type":1,"pageUrl":"ledger","seq":3,"description":"ledger","children":[{"id":5000,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4999,"type":1,"pageUrl":"detail","seq":1,"description":"detail","children":[]},{"id":5001,"appId":187,"code":"history","name":"历史","label":"历史","parentId":4999,"type":1,"pageUrl":"history","seq":2,"description":"history","children":[]}]}]},{"id":4893,"appId":187,"code":"accounting","name":"会计引擎","label":"会计引擎","parentId":0,"type":1,"pageUrl":"accounting","seq":18,"description":"accounting","children":[{"id":4894,"appId":187,"code":"system","name":"科目体系管理","label":"科目体系管理","parentId":4893,"type":1,"pageUrl":"system","seq":1,"description":"system","children":[]},{"id":4895,"appId":187,"code":"flow","name":"核算流水管理","label":"核算流水管理","parentId":4893,"type":1,"pageUrl":"flow","seq":2,"description":"flow","children":[]},{"id":4896,"appId":187,"code":"scene","name":"场景配置管理","label":"场景配置管理","parentId":4893,"type":1,"pageUrl":"scene","seq":3,"description":"scene","children":[]},{"id":4911,"appId":187,"code":"evidence-config","name":"凭证配置管理","label":"凭证配置管理","parentId":4893,"type":1,"pageUrl":"evidence-config","seq":4,"description":"evidence-config","children":[{"id":4966,"appId":187,"code":"add","name":"新增","label":"新增","parentId":4911,"type":2,"pageUrl":"","seq":1,"description":"新增","children":[]},{"id":4965,"appId":187,"code":"edit","name":"编辑","label":"编辑","parentId":4911,"type":2,"pageUrl":"","seq":2,"description":"编辑","children":[]}]},{"id":4912,"appId":187,"code":"evidence-detail","name":"凭证明细管理","label":"凭证明细管理","parentId":4893,"type":1,"pageUrl":"evidence-detail","seq":5,"description":"evidence-detail","children":[{"id":4969,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4912,"type":2,"pageUrl":"","seq":2,"description":"详情","children":[]}]},{"id":4913,"appId":187,"code":"evidence-collect","name":"凭证汇总管理","label":"凭证汇总管理","parentId":4893,"type":1,"pageUrl":"evidence-collect","seq":6,"description":"evidence-collect","children":[{"id":4967,"appId":187,"code":"detail","name":"详情","label":"详情","parentId":4913,"type":2,"pageUrl":"","seq":1,"description":"详情","children":[]}]},{"id":4973,"appId":187,"code":"download-manage","name":"下载管理","label":"下载管理","parentId":4893,"type":1,"pageUrl":"download-manage","seq":7,"description":"下载管理","children":[]}]}]}
  }
}

function getPerms () {
  // eslint-disable-next-line
  return [{"code":"dashboard"},{"code":"comp","children":[{"code":"form-render"},{"code":"data-table"}]},{"code":"example","children":[{"code":"query","children":[{"code":"edit"}]}]},{"code":"todo"},{"code":"base","children":[{"code":"calendar","children":[{"code":"add"}]},{"code":"notice-rule","children":[{"code":"edit"}]},{"code":"notice-list","children":[{"code":"edit"},{"code":"info"}]}]},{"code":"customer","children":[{"code":"list","children":[{"code":"enterprise-detail"},{"code":"individ-detail"},{"code":"add"},{"code":"enterprise-edit"},{"code":"individ-edit"}]},{"code":"account","children":[{"code":"edit"},{"code":"add"}]},{"code":"bank","children":[{"code":"actual","children":[{"code":"add"}]},{"code":"net","children":[{"code":"add"}]}]}]},{"code":"project","children":[{"code":"quota"},{"code":"product","children":[{"code":"edit"}]},{"code":"relationship","children":[{"code":"edit"},{"code":"add"},{"code":"detail"}]}]},{"code":"finance","children":[{"code":"accounts-receivable","children":[{"code":"detail"}]},{"code":"list","children":[{"code":"approval"},{"code":"detail"}]},{"code":"loan","children":[{"code":"detail"}]},{"code":"zhongdeng","children":[{"code":"detail"}]}]},{"code":"assets","children":[{"code":"business-bill","children":[{"code":"detail"}]},{"code":"invoice","children":[{"code":"detail"}]},{"code":"note","children":[{"code":"detail"}]}]},{"code":"contract","children":[{"code":"formwork","children":[{"code":"tasks","children":[{"code":"detail"}]},{"code":"list","children":[{"code":"detail"},{"code":"edit"},{"code":"history"},{"code":"add"}]}]},{"code":"audit","children":[{"code":"detail"}]},{"code":"ledger","children":[{"code":"detail"},{"code":"history"}]}]},{"code":"post-loan","children":[{"code":"balance","children":[{"code":"transfer-flow"}]},{"code":"clearing"},{"code":"balance-return","children":[{"code":"detail"},{"code":"edit"}]},{"code":"settlement","children":[{"code":"detail"}]},{"code":"capital-flow"},{"code":"invoice"}]},{"code":"accounting","children":[{"code":"system"},{"code":"flow"},{"code":"scene"},{"code":"evidence-config","children":[{"code":"add"},{"code":"edit"}]},{"code":"evidence-detail","children":[{"code":"detail"}]},{"code":"evidence-collect","children":[{"code":"detail"}]},{"code":"download-manage"}]}]
}
