/*
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 页面配置项
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
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入收款单位编码/收款单位关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: this.$PUBFN.getOptionsList('projectList'), isFirst: true, listName: 'label', listValue: 'value' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { payeeCompanyId: '收款单位编码', sortable: true, isShow: true, width: 140 },
    { programName: '项目', isShow: true },
    { accountName: '收款单位', sortable: true, isShow: true, width: 140 },
    { accountNameShort: '简称', sortable: true, isShow: true, width: 100 },
    { payeeCompanyType: '主体', isShow: true, sortable: true, width: 140 },
    { bankName: '银行名称', isShow: true, sortable: true, width: 140 },
    { bankAccount: '账户', isShow: true, sortable: true, width: 140 },
    { isAgent: '代收', isShow: false, sortable: true, width: 140 },
    { subjectInfo: '科目', isShow: false, sortable: true, width: 140 },
    { status: '状态', isShow: true, sortable: true, width: 100 },
    { creatDate: '创建时间', isShow: true, sortable: true, width: 140 }
  ]
}
