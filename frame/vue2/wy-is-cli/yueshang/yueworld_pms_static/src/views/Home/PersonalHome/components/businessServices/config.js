/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入项目/品牌名关键字', width: '220px', isSearch: true, isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { projectName: '项目', sortable: true, isShow: true },
    { describe: '描述', sortable: true, isShow: true },
    { timeRemaining: '剩余时间', sortable: true, isShow: true }
  ]
}

// 列表数据
export const tableData = function() {
  return [
    {
      projectName: '晋江',
      describe: '喜茶发起了保修申请',
      timeRemaining: '1天2小时30分钟'
    },
    {
      projectName: '奉贤',
      describe: '喜茶发起了投诉申请',
      timeRemaining: '剩余40分钟'
    },
    {
      projectName: '晋江',
      describe: '海底捞发起了放行申请',
      timeRemaining: '已过期'
    },
    {
      projectName: '奉贤',
      describe: '爱婴室发起了广播申请',
      timeRemaining: '已过期'
    }
  ]
}

