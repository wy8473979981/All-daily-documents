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
    { describe: '描述', sortable: true, isShow: true, minWidth: '130px' },
    { typeName: '类型', sortable: true, isShow: true, width: '45px' },
    { receiptTime: '接受时间', sortable: true, isShow: true, width: '110px' }
  ]
}

// 列表数据
export const tableData = function() {
  return [
    {
      describe: '乐乐茶的营业执照即将过…',
      typeName: '通知',
      receiptTime: '2021-07-15 10:30:50'
    },
    {
      describe: '关于严格垃圾分类检查的…',
      typeName: '公告',
      receiptTime: '2021-07-09 11:30:15'
    },
    {
      describe: '亲亲袋鼠的营业执照即将…',
      typeName: '通知',
      receiptTime: '2021-07-05 16:54:07'
    },
    {
      describe: '沙县小吃的营业执照即将…',
      typeName: '通知',
      receiptTime: '2021-07-04 09:05:15'
    },
    {
      describe: '红烧牛肉面的营业执照即…',
      typeName: '通知',
      receiptTime: '2021-07-01 10:16:54'
    }
  ]
}

