/*
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: 账单配置配置文件
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
//   搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入联系人姓名/电话关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', width: '200', placeholder: '所有项目', list: PUBFN.getOptionsList('projectList'), isFirst: true }

  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', sortable: true, showFixed: true },
    { programName: '适用项目', sortable: true, isShow: true },
    { contractType: '合同类型', sortable: true, isShow: true },
    { settlementInfo: '结算联系对象', formatter: row => this.changeTime(row), sortable: true, isShow: true },
    { leaseInfo: '租赁联系对象', formatter: row => this.LeaseContact(row), sortable: true, isShow: true },
    { invoiceInfo: '开票联系对象', formatter: row => this.InvoicingContact(row), sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { creatDate: '创建时间', sortable: true, isShow: true },
    { object: '适用铺位', sortable: true, isShow: false },
    { settlementRealName: '结算联系人', sortable: true, isShow: false },
    { settlementTel: '电话', sortable: true, isShow: false },
    { settlementEmail: '邮箱', sortable: true, isShow: false },
    { settlementFax: '传真', sortable: true, isShow: false },
    { leaseRealName: '租赁联系人', sortable: true, isShow: false },
    { leaseTel: '电话', sortable: true, isShow: false },
    { leaseEmail: '邮箱', sortable: true, isShow: false },
    { leaseFax: '传真', sortable: true, isShow: false },
    { invoiceRealName: '开票联系人', sortable: true, isShow: false },
    { invoiceTel: '电话', sortable: true, isShow: false },
    { invoiceEmail: '邮箱', sortable: true, isShow: false },
    { invoiceFax: '传真', sortable: true, isShow: false },
    { remark: '备注', sortable: true, isShow: false }

  ]
}
