##### 简介
1. 直接给data 和 config，可以展示数据
2. 给分页，和分页的接口方法，可以一键配置不用管
3. 如果有额外的请求条件，或者是搜索后展示，需要给queryParams

#### config
1. key列的prop， label列表头显示
2. render可以自定义渲染表身, 他陪type: custom 使用
3. renderHeader 可以自定义渲染表头
4. type是配置可编辑的表格使用， 如input，select，后期可以增加
5. disable，show，editable 函数，或者布尔值，返回boolean
6. props是配置type后，使用的额外属性，只给可以编辑的dom使用， 如对input配置size，placeholder，select配置options都在这里使用
7. 支持其他对el-table的所有属性和方法，支持对el-table-column所有属性，方法暂时没做

##### height
1. 这个可选属性，如果不传，则默认到父组件的父级100%，table的高度是减去分页组件的高度


```
config = [
  {
    key: 'name',
    label: '姓名',
    type: 'custom',
    renderHeader: (h, data) => {
      return `姓名${data.row.$index}`
    },
    render: (h, data) => {
      return `张三${data.row.$index}`
    },
    {
      key: 'age',
      label: '年龄',
      type: 'input',
      props: {
        size: 'mini'
      }
    },
    {
      key: 'sex',
      label: '性别',
      type: 'select',
      props: {
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: 'nv',
            value: '2'
          }
        ]
      }
    },
    {
      key: 'status',
      label: '状态',
      formatter: (row, column, cellValue, index) => { // 原生方法
        return index%2 ? '启用' : '未启用'
      }
    }
  }
]
```
