/*
 * @Author: zbk
 * @LastEditors: AGENT
 * @Description: 开票核算配置
 */
import PUBFN from '@/utils/pubFn'
// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'auditStatus',
      list: [
        { label: '正常', value: 1, dataKey: 'auditStatus01' },
        { label: '已失效', value: 2, dataKey: 'auditStatus02' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入开票单位编码/开票单位关键字', width: '220px', isSearch: true, isFirst: true, change: this.proName },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '全部项目', list: PUBFN.getOptionsList('projectList'), width: '220px', isFirst: true }
  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { payeeInvoiceId: '开票单位编码', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { accountName: '开票单位', sortable: true, isShow: true },
    { UnifiedSocialCreditCode: '统一社会信用代码', width: 135, sortable: true, isShow: true },
    { bankName: '银行名称', sortable: true, isShow: true },
    { bankAccount: '账户', isShow: true, sortable: true },
    { tel: '电话', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { creatDate: '创建时间', isShow: true, sortable: true },
    { address: '地址', isShow: false, sortable: true },
    { drawerRealName: '开票人', isShow: false, sortable: true },
    { reviewerrRealName: '复核人', isShow: false, sortable: true },
    { payeerRealName: '收款人', isShow: false, sortable: true },
    { projectId: '项目号', isShow: false, sortable: true },
    { diskNo: '税盘编号', isShow: false, sortable: true },
    { ukeyNo: '开票点编码', isShow: false, sortable: true },
    { invoiceType: '开票类型', isShow: false, sortable: true },
    { identitySecretkey: '身份认证密钥', isShow: false, sortable: true },
    { mainExtensionNumber: '主分机号', isShow: false, sortable: true },
    { terminalNumber: '终端号', isShow: false, sortable: true },
    { invoiceAddress: '开票地址', isShow: false, sortable: true }
  ]
}
