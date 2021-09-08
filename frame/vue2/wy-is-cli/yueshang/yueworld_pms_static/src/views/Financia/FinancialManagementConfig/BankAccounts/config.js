/*
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: 银行账户配置文件
 */
import PUBFN from '@/utils/pubFn'
// import { getOptionsLabel } from '@/filters/index'
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
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入银行账户编码/银行名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'accountName', label: '', placeholder: '请选择账套', width: '220px', list: PUBFN.getOptionsList('accountfeeName'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { bankAccountId: '银行账户编码', width: '200', sortable: true, isShow: true },
    { accountName: '账套名称', width: '200', sortable: true, isShow: true },
    { area: '区域', sortable: true, isShow: true },
    { bankName: '银行名称', width: '150', sortable: true, isShow: true },
    { bankAccount: '账户', width: '200', sortable: true, isShow: true },
    { currency: '币种', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { creatDate: '创建时间', width: '200', sortable: true, isShow: true },
    { thirdPartyId: '三方编码', width: '200', sortable: true, isShow: false }
  ]
}
