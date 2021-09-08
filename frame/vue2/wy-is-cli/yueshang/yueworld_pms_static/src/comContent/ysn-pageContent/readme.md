# pageContent 列表页组件

用于本项目列表页展示,如遇特殊需求需要单独新增一个组件或在页面直接使用各组件拼接

## PageContent Attributes

| 参数               | 说明                                 | 类型     | 可选值                                | 默认值 | 说明                                                                              |
| ------------------ | ------------------------------------ | -------- | ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| statusSearchConfig | 状态筛选列表                         | Array    |                                       |        | 二维数组,可以渲染多个状态筛选,见下文`statusSearchConfig配置`                      |
| searchForm         | 搜索 form 数据                       | Object   |                                       |        | 高级搜索用 formData,请填写默认值,否则重置后会出现 bug                             |
| tableRightExcel    | 是否显示导入导出按钮                 | Object   | {importExcel:false,exportExcel:false} | false  | 默认导入导出都是 false                                                            |
| searchConfig       | 高级搜索配置                         | Array    |                                       |        | 见 ysn-SeniorSearch 组件配置                                                      |
| searchColumn       | 高级搜索 column                      | Number   |                                       | `3`    | 高级搜索展开列的 column                                                           |
| tableConfig        | 列表属性配置                         | Array    |                                       |        | 见 ysn-table 的 column 配置,`因自定义表头有额外属性,见以下tableConfig 多余配置项` |
| tableOrderConfig   | ysn-table 其他配置                   | Object   |                                       |        | 见 ysn-table 其他所有属性,常用语 checkbox 是否显示等此类操作                      |
| tableDescConfig    | 列表左上角文字描述信息配置           | Function |                                       |        | 见下文`tableDescConfig配置`                                                       |
| queryConfig        | 请求配置                             | Object   |                                       |        | 见下文`queryConfig配置`                                                           |
| persmission        | 权限编码                             | String   |                                       |        | 按照页面名填写权限编码                                                            |
| tableSlots         | 列表插槽                             | Array    |                                       |        | 列表展示用的插槽,插槽内容为列表 config 中的 prop 名字                             |
| beforeQeuryData    | 请求之前数据处理                     | Function |                                       |        | 方法接收一个 data,最终处理后需要 return data 用于接口请求数据                     |
| \$listeners        | ysn-table 所有事件可绑定在此组件之上 | Any      | -                                     |
|                    |

## StatusSearchConfig Item 状态筛选列表 item 配置

| 字段 | 说明                      | 类型   | 说明            |
| ---- | ------------------------- | ------ | --------------- |
| name | 状态筛选名字              | String | -               |
| key  | formData 中传给接口的 key | String | -               |
| list | 状态列表展示              | Array  | list 见下表配置 |

### List Item 状态筛选列表 List Item 配置

| 字段    | 说明         | 类型   | 说明                           |
| ------- | ------------ | ------ | ------------------------------ |
| label   | 字典名       | String | -                              |
| value   | 字典值       | String | -                              |
| dataKey | 数量取值字段 | String | 用于 list 接口请求后取统计数量 |

## TableDescConfig 列表左上角文字描述信息配置

> tableDescConfig 需要传入一个 function,用于处理展示数据
> `方法接收一个data,为请求列表后返回的res,最终处理后需return一个数组` > `数组item配置见下表` > `demo见以下demo基本用法`

| 字段  | 说明       | 类型   | 说明 |
| ----- | ---------- | ------ | ---- |
| text  | 描述的文字 | String | -    |
| value | 展示的数量 | String | -    |

## QueryConfig 请求配置

| 字段    | 说明               | 类型   | 说明                            |
| ------- | ------------------ | ------ | ------------------------------- |
| api     | 请求的接口         | Object | 在 api 文件中维护的请求接口方法 |
| dataKey | 展示列表数据的 key | String | 请求返回数据中列表数据的 key    |

## TableConfig 列表 Config Item 多余配置项

| 字段      | 说明                         | 类型    | 默认值  |
| --------- | ---------------------------- | ------- | ------- |
| showFixed | 是否在自定义表头中固定不可动 | Boolean | `false` |
| isShow    | 是否默认展示该表头           | Boolean | `false` |

> 其他配置参考`ysn-table config item`

## Demo

### 基本用法

```html
<template>
  <div class="app-page-main">
    <YsnPageContent
      :statusSearchConfig="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="demo"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn>新增发票</ysn-btn>
      </template>

      <!-- 列表操作列插槽 -->
      <template #default>
        <p>我是列表操作插槽</p>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
  // 请求api
  import { testApi } from '@/api'
  import {
    searchConfig,
    tableConfig,
    dataTmp,
    tableDescConfig,
    statusSearchConfig,
  } from './config'
  export default {
    name: 'PageListDemo',
    props: {},
    data() {
      return {
        // 搜索form
        searchForm: {
          s1: '',
          s2: '',
          s3: '',
          s4: '',
        },
        // 状态筛选
        statusSearchConfig: statusSearchConfig.call(this),
        // 搜索配置 见ysn-seniorSearch
        searchConfig: searchConfig.call(this),
        // 状态搜索值
        statucSearchValue: [],

        // 列表数据统计/描述配置
        tableDescConfig: tableDescConfig,
        // 列表数据
        tableData: [],
        // 列表配置 见ysn-table
        tableConfig: tableConfig.call(this),

        // 接口请求配置
        queryConfig: {
          api: testApi.getList, // 接口请求方式
          dataKey: 'data', // 取请求接口后返回的某个字段作为表单数据 默认data
        },

        // ysn-table额外配置 用于打开checkbox等
        tableOrderConfig: {
          checkbox: false, // 继承el-table所有属性,ysn-table的属性
          showOperation: true,
          operationWidth: '200',
        },

        // 请求后的数据
        reqData: {},
      }
    },
    methods: {
      // 列表数据请求之前数据处理
      beforeQeuryData(data) {
        console.log('请求之前数据处理', data)
        // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
        return dataTmp
        //   return data
      },
      //  数据请求后把数据返回外部
      afterQueryData(data) {
        this.reqData = data
        console.log(data)
      },
    },
  }
</script>
<!-- pageContent-basic-usage.vue -->
```

### config.js 配置文件

```js
import PUBFN from '@/utils/pubFn'

// 列表数据模板配置 调用yapi时忽视
export const dataTmp = {
  t1: 'FP-202030000',
  t2: '测试项目',
  t3: '珠海市酒店管理有限公司',
  t4: '普票',
  t5: 1,
  t6: 1,
  t7: '2020-05-',
  t8: '失败',
}

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审批状态',
      key: 'searchStatus1',
      list: [
        { label: '草稿', value: 1, dataKey: 'total' },
        { label: '审核中', value: 2, dataKey: 'total' },
        { label: '审核通过', value: 3, dataKey: 'total' },
        { label: '已驳回', value: 4, dataKey: 'total' },
      ],
    },
    {
      name: '审批状态2',
      key: 'searchStatus2',
      list: [
        { label: '草稿', value: 1, dataKey: 'total' },
        { label: '审核中', value: 2, dataKey: 'total' },
        { label: '审核通过', value: 3, dataKey: 'total' },
        { label: '已驳回的', value: 4, dataKey: 'total' },
      ],
    },
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    {
      itemType: 'input',
      prop: 's1',
      label: '',
      placeholder: '请输入合同编号、发票编号',
      width: '220px',
      isSearch: true,
      isFirst: true,
    },
    {
      itemType: 'select',
      prop: 's2',
      label: '',
      placeholder: '所有项目',
      width: '220px',
      list: PUBFN.getOptionsList('globalSearchList'),
      isFirst: true,
    },
    {
      itemType: 'select',
      prop: 's3',
      label: '',
      placeholder: '所有费项',
      width: '200px',
      list: PUBFN.getOptionsList('globalSearchList'),
    },
    {
      itemType: 'datePicker',
      type: 'date',
      prop: 's4',
      label: '',
      placeholder: '应收日期',
      width: '200px',
    },
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    {
      t0: '序号',
      type: 'index',
      width: 50,
      sortable: true,
      showFixed: true,
    },
    { t1: '发票编号', sortable: true, isShow: true },
    { t2: '项目', sortable: true, isShow: true },
    { t3: '租户', sortable: true },
    {
      t4: '类型',
      hasClose: true,
      isShow: true,
      
      tableList: [
        {
          t5: '开票金额(元)',
          isShow: true,
          sortable: true,
          width: 140,
          type: 'money',
        },
        {
          t6: '税额(元)',
          isShow: true,
          sortable: true,
          width: 140,
          type: 'money',
        },
        { t7: '发票日期', isShow: true, sortable: true, width: 140 },
        { t8: '状态', isShow: true, sortable: true, width: 140 },
      ],
    },
    {
      t5: '开票金额(元)',
      isShow: true,
      sortable: true,
      width: 140,
      
      type: 'money',
    },
    { t6: '税额(元)', sortable: true, isShow: true },
    { t7: '发票日期', sortable: true },
    { t8: '状态', sortable: true },
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '建筑面积(m²)', value: data.total },
    { text: '计租面积(m²)', value: data.total },
  ]
}
```
