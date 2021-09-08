/*
 * @Author: jllk
 * @LastEditors: jlkk
 * @Description: 收款方式配置项
 */
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
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入收款方式编码/收款方式名称关键字', width: '220px', isSearch: true, isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { SerialNumber: '序号', type: 'index', width: 150, sortable: true, showFixed: true },
    { paymentTypeId: '收款方式编码', sortable: true, isShow: true },
    { paymentTypeName: '收款方式名称', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { creatDate: '创建时间', sortable: true, isShow: true },
    { thirdPartyId: '三方编码', sortable: true, isShow: false }
  ]
}
