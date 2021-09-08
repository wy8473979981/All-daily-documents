<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
# SeniorSearch 表单加高级搜索

根据配置生成表单，用于收集、校验数据。
配置项参照form表单

## SeniorSearch Attributes

| 参数           | 说明                             | 类型    | 可选值                     | 默认值                             |
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- |
| config          | 表单数据对象（每列对象里面增加了一个isFirst属性，为ture时，基与搜索按钮 一列）                     | Array  |                           | -                                  |
| isSearch       | 是否需要高级搜索按钮       | Boolean | -                          | `true`                            |





## SeniorSearch Methods

| 方法名            | 说明                                                                                                                                                                 | 参数                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| searchResult          | 搜索结果输入的全部字段 |                      |




## Demo

### 基本用法

```html
<template>
 <SeniorSearch  :isSearch="true" :form="formData2" :config="configData2"  clearable @searchResult="searchResult"></SeniorSearch>
</template>
<script>
  export default {
    data() {
      return {
             formData2: {},
                    configData2 :[ // 表单配置
        { itemType: 'input', prop: 'z1', label: '', placeholder: '请输入', width: '264px',isFirst:true },
          { itemType: 'input', prop: 'z3', label: '', placeholder: '请输入', width: '264px'},
           { itemType: 'input', prop: 'z4', label: '', placeholder: '请输入', width: '264px'},
            { itemType: 'input', prop: 'z5', label: '', placeholder: '请输入', width: '264px'},
             { itemType: 'input', prop: 'z6', label: '', placeholder: '请输入', width: '264px'},
      ],

      };
    },
    methods:{
        searchResult(data){
      console.log('高级搜索',data)
    },
    }
  };
</script>
<!-- form-search-.vue -->
```

 

