/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入项目/品牌名/商家', width: '220px', isSearch: true, isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { projectName: '项目', sortable: true, isShow: true },
    { describe: '描述', sortable: true, isShow: true },
    { initiator: '发起人', sortable: true, isShow: true },
    { receiptTime: '接受时间', sortable: true, isShow: true }
  ]
}

// 列表数据
export const tableData = function() {
  return [
    {
      status: 0,
      projectName: '晋江',
      describe: '星巴克发起了开业审批申请',
      initiator: '梁天',
      receiptTime: '2021-07-05 10:30:09'
    },
    {
      status: 0,
      projectName: '晋江',
      describe: '乐乐茶发起了品牌落位申请',
      initiator: '张瑶洁',
      receiptTime: '2021-07-01 11:30:56'
    },
    {
      status: 0,
      projectName: '晋江',
      describe: '麦当劳发起了合同变更申请',
      initiator: '杜伊萱',
      receiptTime: '2021-07-01 09:19:50'
    },
    {
      status: 0,
      projectName: '奉贤',
      describe: '肯德基发起了意向协议申请',
      initiator: '陈遥',
      receiptTime: '2021-06-30 15:22:50'
    },
    {
      status: 0,
      projectName: '奉贤',
      describe: '无印良品发起了暂收款处理申请',
      initiator: '张英菁',
      receiptTime: '2021-06-25 11:52:07'
    }
  ]
}

