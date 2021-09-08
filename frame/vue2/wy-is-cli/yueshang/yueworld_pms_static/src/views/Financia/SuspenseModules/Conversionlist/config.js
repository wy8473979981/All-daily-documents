/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 转换单列表配置
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'auditStatus01' },
        { label: '审核中', value: 2, dataKey: 'auditStatus02' },
        { label: '审核通过', value: 3, dataKey: 'auditStatus03' },
        { label: '驳回', value: 4, dataKey: 'auditStatus04' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入转出商家/企业，转换编号，转出品牌名', width: '220', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('allPros'), isFirst: true, change: this.proName },
    { itemType: 'datePicker', prop: 'conversionDate', label: '', startPlaceholder: '转换日期起', endPlaceholder: '转换日期止', rangeSeparator: '~', type: 'daterange', width: '206px', isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', label: '', width: '200px', placeholder: '所有费项', list: PUBFN.getOptionsList('allProjectFees') },
    { itemType: 'input', prop: 'intoTenantName', label: '', width: '246px', placeholder: '请输入转入商家/企业，转入品牌名' },
    { itemType: 'input', prop: 'creator', label: '', width: '200px', placeholder: '请输入创建人' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', showFixed: true, sortable: true, width: '100px' },
    { programName: '项目名称', sortable: true, isShow: true },
    { conversionNo: '转换编号', sortable: true, isShow: true },
    { rollTenantName: '转出商家/企业', sortable: true, isShow: true },
    { intoTenantName: '转入商家/企业', isShow: true },
    { feeName: '费项', isShow: true, sortable: true },
    { conversionAmount: '转换金额(元)', isShow: true, sortable: true, type: 'money' },
    { auditStatusText: '审核状态', isShow: true, sortable: true },
    { conversionDate: '转换日期', isShow: true, sortable: true },
    { creatTime: '创建时间', isShow: false, sortable: true },
    { createor: '创建人', isShow: false, sortable: true },
    { updatedDate: '最后更新时间', isShow: false, sortable: true },
    { updater: '最后修改人', isShow: false, sortable: true },
    { rollBrandName: '转出品牌名', isShow: false, sortable: true },
    { intoBrandName: '转入品牌名', isShow: false, sortable: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function() {
  return [
    { text: '转换金额汇总(元)', value: 72500 }
  ]
}
