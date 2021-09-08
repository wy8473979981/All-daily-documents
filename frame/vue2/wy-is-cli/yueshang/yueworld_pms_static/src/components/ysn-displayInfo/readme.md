<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
# DisplayInfo 表单

详情展示组件

## DisplayInfo Attributes

| 参数           | 说明                             | 类型    | 可选值                     | 默认值                             |
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- |
| data          | 详情数据对象                     | Object  | -                          | -                                  |
| config       |  详情展示配置对象       | Object | -                          |                             |
| column       | 总的clo布局 | Number | -                          | `4`                             |


### Config  Config
config配置项

| 键名        | 说明                                                                            | 类型                                                        | 示例                                                                         |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| prop         | **必选**，对应data中的key                                                            | String                                                      | -                                                                            |
| label        | **必选**,详情中展示的名称                                                            | String                                                      |                 |
| span       | 单独块占每行col的比例                                                                | String                                                      | `{span:2}` 默认column为4时，该模块占一行的50%                                                                             |
| formatter     | 格式化数据                                                                          | Function(row)                                                         | `{formatter:row=>'你好'+row.name}`                                                                            |
| click       | 点击事件                                                                | Function(row)                                                       |  触发点击事件 {click:this.handleClick}                

## Demo

### 基本用法

```html
<template>
   <ysn-displayInfo :data="data" :config="config" :column="4" />
</template>
<script>
  export default {
    data() {
      return {
        data: {name:'李雷',age:'18'},
        config: [
            {  prop: 'name', label: '姓名',  span:'2', formatter:row=>'你好'+row.name },
            {  prop: 'age', label: '年龄',  span:'2', click:this.handleClick },
        ],
      };
    },
    methods: {
        handleClick: row => {
          console.log(row)
          alert(row.age+'岁')
        },
    }
  };
</script>
<!-- display-info-basic-usage.vue -->
```
