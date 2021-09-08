/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'


// 搜索配置
export const searchConfig = function () {
  return [
    // { itemType: 'select', prop: 'programId', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true, change: this.inputChange },
    { itemType: 'selectDialog', prop: 'programId', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true, },

  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { programId: '项目编码', sortable: true, isShow: true },
    { programEquityNature: '产权性质', sortable: true, isShow: true },
    { programType: '经营类型', sortable: true, isShow: true },
    { programGrossArea: '建筑面积(㎡)', sortable: true, isShow: true },
    { programLeasableArea: '计租面积(㎡)', sortable: true, isShow: true },
    { programOperateStatus: '营运状态', sortable: true, isShow: true },
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function (data) {
  return [
    { text: '建筑面积(m²)', value: data.programGrossAreaTotal },
    { text: '计租面积(m²)', value: data.programLeasableAreaTotal }
  ]
}