/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入关键字', width: '220px', isSearch: true, isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { addresser: '发件人', sortable: true, isShow: true },
    { sendType: '类型', sortable: true, isShow: true },
    { sendTime: '时间', sortable: true, isShow: true }
  ]
}

// 列表数据
export const tableData = function() {
  return [
    {
      addresser: '陈小亚',
      sendType: '关于XX铺位合同的进展',
      sendTime: '2021-07-05 10:30:50'
    },
    {
      addresser: '崔巍',
      sendType: '对招商进度的通知',
      sendTime: '2021-07-09 11:30:15'
    },
    {
      addresser: '戴章名',
      sendType: '员工高温福利发放',
      sendTime: '2021-07-05 16:54:07'
    },
    {
      addresser: '邓燕',
      sendType: '8月份一安排',
      sendTime: '2021-07-04 09:05:15'
    },
    {
      addresser: '丁洁',
      sendType: '关于XX铺位合同的进展',
      sendTime: '2021-07-01 10:16:54'
    }
  ]
}

