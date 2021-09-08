# TableForm Item 表单组件

根据配置生成 b 表格表单，校验数据。

## Form Item Attributes

| 参数        | 说明                                          | 类型    | 可选值 | 默认值 |
| ----------- | --------------------------------------------- | ------- | ------ | ------ |
| v-model     | 表格表单绑定的数据对象,需要 Object 嵌套 Array | Object  | -      | -      |
| prop        | 绑定的 v-model 中用来渲染数据的数组 key       | String  | -      |        |
| column      | 表格表单配置                                  | Array   | -      | -      |
| rules       | 表单校验规则,Array Item 每个对象的校验规则    | Object  | -      | -      |
| add         | 是否显示添加按钮                              | Boolean | -      | `true` |
| firstRowAdd | 首行是否为新增                                | Boolean | -      | `true` |
| attrs       | 接收 ysn-table,el-table 其他属性              | Any     |        |

### Column Config

`column` 的每一项都是一个对象，表示当前列的配置。
`column` 的第一个属性 key 为`el-table-column`和`ysn-formItem\表单元素的v-model`的`props`,`value`为`label`,切记必须放在第一个
其主要可选的配置如下：

| 键名       | 说明                                                              | 类型    | 示例                                                           |
| ---------- | ----------------------------------------------------------------- | ------- | -------------------------------------------------------------- |
| 第一个属性 | **必选**，对应的                                                  | String  | { name:'姓名' } 其中 `name`会作为 prop， `姓名`为 label        |
| width      | 宽度                                                              | String  | `200px`                                                        |
| itemType   | **必选**，表单元素类型                                            | String  | 可选值：text/input/checkbox/datePicker/fileUpload/radio/select |
| listKey    | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典的 key      | String  | 默认:`label`                                                   |
| listName   | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典展示的 Name | String  | 默认:`value`                                                   |
| list       | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典列表        | Array   | `[{label:'名称',value:'1'}]`                                   |
| type       | 接收表单元素的 type                                               | String  |
| required   | 是否显示必填星号                                                  | Boolean |
| Attrs      | 继承 ysn-formItem 的 Config Item 所有属性                        | Any     |

> `column`的第一个`key:value` `key为prop，value为label`，为 column 固定写法,其余属性继承 ysn-formItem 所有属性

### ItemType Config

表单项配置中有一个关键属性 `itemType` 用来控制表单项渲染出的控件，配置不同类型的 `itemType` 时支持配置不同的参数，详见下表：

| 类型       | 对应控件       | 支持的配置 |
| ---------- | -------------- | ---------- |
| text       | 文本           |            |
| input      | 单行文本输入框 |            |
| radio      | 单选按钮       | options    |
| checkbox   | 复选框         | options    |
| datePicker | 日期范围       | -          |
| fileUpload | 文件上传       | -          |
| select     | 下拉框         | -          |

## Demo

### 基本用法

```html
<template>
  <ysn-formTable
    ref="formTable"
    v-model="formTableData"
    prop="tableData1"
    :column="formTableConfig"
    :rules="formTableRules"
    add
    :first-row-add="false"
  />
</template>
<script>
  export default {
    data() {
      return {
        // v-model对象
        formTableData: {
          // 取v-model[prop]值作为绑定数据列表
          tableData1: [{ t1: '123', upload: [{ name: 'xxx.jpg' }] }],
        },
        // 表单表格配置
        formTableConfig: [
          {
            name: '姓名',
            
            itemType: 'input',
            required: true,
            width: 300,
          },
          {
            date: '姓名',
            
            itemType: 'datePicker',
            type: 'daterange',
            required: true,
            width: 400,
          },
          {
            sex: '性别',
            sortable: true,
            itemType: 'select',
            list: [],
            width: 200,
          },
          {
            upload: '上传',
            itemType: 'fileUpload',
            width: 500,
            actionUrl: '',
            limitNum: 4,
            span: 2,
          },
          {
            t1: '性别',
            sortable: true,
            itemType: 'text',
            list: [],
            width: 200,
          },
        ],
        formTableRules: {
          name: [{ required: true, message: '' }],
        },
      }
    },
    methods: {
      // 表单校验 返回true时校验通过
      async validate() {
        const res = await this.$refs['formTable'].validate()
        console.log(this.formTableData)
        console.log(res)
      },
    },
  }
</script>
<!-- form-basic-usage.vue -->
```
