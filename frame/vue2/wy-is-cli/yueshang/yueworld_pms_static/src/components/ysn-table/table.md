# Table 表格

根据配置生成表格，用于表格展示
**切记 column 的第一个 key 为 el-table-column 的 props。**

## Table Attributes

| 参数           | 说明                                                | 类型    | 可选值 | 默认值   |
| -------------- | --------------------------------------------------- | ------- | ------ | -------- |
| data           | 表格数据对象                                        | Array   |        | []       |
| column         | 表格列配置内容                                      | Array   | -      | []       |
| showExpand     | 是否具备展开列                                      | Boolean | -      | `false`  |
| full           | 是否撑满父元素                                      | Boolean | -      | `false`  |
| showFixed      | 是否固定首行                                        | Boolean | -      | `false`  |
| checkbox       | 是否展示 checkbox                                   | Boolean | -      | `true`   |
| selectionProps | selection 操作列添加自定义属性                      | Object  | -      | -        |
| operationWidth | 操作列的宽度                                        | String  | -      | `'auto'` |
| showOperation  | 是否显示操作列                                      | Boolean | -      | `false`  |
| showSlots      | 插槽 name 数组                                      | Array   | -      | []       |
| selectKey      | select 选中高亮时需要的 key,checkbox 为`true`时必填 | String  | -      | `'id'`   |
| isDisTable     | 是否为二维表格                                      | Boolean | -      | `false`  |
| summaryCol     | 合计行 colSpan                                      | Number  | -      | `1`      |
| required       | 是否必填                                            | Boolean | -      | `false`  |
| attrs          | 接收 elementTables 中其他属性                       | Order   | -      |

> `column` 的第一个属性 key 为`el-table-column`的`props` > `column` 的每一项都是一个对象
> 详情见`Column Config` > `full`为 true 时，外部元素必须增加`class="max-area"`

### Table Column Config

`column` 的每一项都是一个对象，表示当前列的配置。
`column` 的第一个属性 key 为`el-table-column`的`props`,`value`为`label`,切记必须放在第一个
其主要可选的配置如下：

| 键名       | 说明                                 | 类型          | 示例                                                                                      |
| ---------- | ------------------------------------ | ------------- | ----------------------------------------------------------------------------------------- |
| 第一个属性 | **必选**，对应的                     | String        | { name:'姓名' } 其中 `name`会作为 prop， `姓名`为 label                                   |
| minWidth   | 最小宽度                             | String        | `'100px'`                                                                                 |
| sortable   | 是否需要排序                         | Boolean       | -                                                                                         |
| labelCLass | 表头单元格 class                     | String        | 右边白色间距：`'whiteRight'`、左右和下边框`'borderRight'`,`'borderBottom'`,`'borderLeft'` |
| formatter  | 数据 formatter，需 retrun 格式化数据 | Function(row) | { `name:'姓名'`,`formatter:row=>'你好'+row.name` }                                        |
| tableList  | 多级表头配置                         | Column        | { `name:'姓名'`,`tableList`:[{`name2`:`'姓名 2'` }]}                                      |
| attrs      | 接受 el-table-column 其他所有参数    | Any           |

> `column`的第一个`key:value` `key为prop，value为label`，为 column 固定写法
> `tableList`用于多级表头,内部使用递归组件，可无限级传入
> `labelClass` 在多级表头前一个元素添加`whiteRight` > `labelClass` 在多级表头内父数组 item 添加`borderBottom borderLeft` 其他视情况添加
> `attrs` 接受 el-table-column 其他所有参数，如需定制情况可直接添加
> `Table Concifg`中`isDisTable`为`true`时，`columnList`的第一个对象为`{ disName: '二维表格表头名', columnClass: 'hasBg' }`，此时数据中的`disName`为二维表单的竖列 label

## Table Events

| 事件名称 | 说明           | 回调参数                        |
| -------- | -------------- | ------------------------------- |
| onSelect | 选择框发生变化 | 当前选中的数据 list(selectData) |

> 每次表格选择发生变化时触发

## Demo

### 基本用法

```html
<template>
  <ysn-table :data="tableData" :column="tableConfig" select-key="id">
  </ysn-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '张三',
            sex: '男',
            age: '18',
            id: 1,
          },
          {
            name: '李四',
            sex: '女',
            age: '19',
            id: 2,
          },
        ],
        tableConfig: [
          { name: '姓名' },
          { sex: '性别', sortable: true },
          { age: '年龄', formatter: (row) => row.age + '岁' },
        ],
      }
    },
  }
</script>
<!-- table-basic-usage.vue -->
```

### 数据插槽用法

```html
<template>
  <ysn-table
    :data="tableData"
    :column="tableConfig"
    :show-slots="['name']"
    select-key="id"
  >
    <template #name="scope">
      <span>
        你好，{{ scope.row.name }}
      </span>
    </template>
  </ysn-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '张三',
            sex: '男',
            age: '18',
            id: 1,
          },
          {
            name: '李四',
            sex: '女',
            age: '19',
            id: 2,
          },
        ],
        tableConfig: [
          { name: '姓名' },
          { sex: '性别', sortable: true },
          { age: '年龄', formatter: (row) => row.age + '岁' },
        ],
      }
    },
  }
</script>
<!-- form-slots-usage.vue -->
```

### 多级表头用法

```html
<template>
  <ysn-table :data="tableData" :column="tableConfig" select-key="id">
  </ysn-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '张三',
            sex: '男',
            age: '18',
            birthYear: '2010',
            birthMonth: '10',
            birthDay: '7',
            id: 1,
          },
          {
            name: '李四',
            sex: '女',
            age: '19',
            birthYear: '2010',
            birthMonth: '10',
            birthDay: '7',
            id: 2,
          },
        ],
        tableConfig: [
          { name: '姓名' },
          { sex: '性别', sortable: true },
          { age: '年龄', formatter: (row) => row.age + '岁' },
          {
            birth: '出生年月日',
            tableList: [
              { birthYear: '出生年' },
              { birthYear: '出生月' },
              { birthYear: '出生日' },
            ],
          },
        ],
      }
    },
  }
</script>
<!-- form-Headers-usage.vue -->
```

### 二维表格用法

```html
<template>
  <ysn-table :data="tableData" :column="tableConfig" is-dis-table> </ysn-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '张三',
            sex: '男',
            age: '18',
            birthYear: '2010',
            birthMonth: '10',
            birthDay: '7',
            id: 1,
            disName: '姓名1',
          },
          {
            name: '李四',
            sex: '女',
            age: '19',
            birthYear: '2010',
            birthMonth: '10',
            birthDay: '7',
            id: 2,
            disName: '姓名2',
          },
        ],
        tableConfig: [
          { disName: '二维表格', columnClass: 'hasBg' },
          { name: '姓名' },
          { sex: '性别', sortable: true },
          { age: '年龄', formatter: (row) => row.age + '岁' },
          {
            birth: '出生年月日',
            tableList: [
              { birthYear: '出生年' },
              { birthYear: '出生月' },
              { birthYear: '出生日' },
            ],
          },
        ],
      }
    },
  }
</script>
<!-- form-Headers-usage.vue -->
```
