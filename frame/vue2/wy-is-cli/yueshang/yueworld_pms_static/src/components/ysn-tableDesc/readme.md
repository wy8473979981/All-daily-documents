<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Descripttion: 
-->
# TableDesc 列表统计文字组件

可支持增加减少的标签页组件

## TableDesc Attributes

| 参数    | 说明             | 类型    | 可选值 | 默认值 |
| ------- | ---------------- | ------- | ------ | ------ |
| config  | 配置项 | Array  | -      | []      |


## Config Attributes

`config` 主要可选的配置如下：

| 键名  | 说明         | 类型   | 示例 |
| ----- | ------------ | ------ | ---- |
| text |  文案 | String | -    |
| value |  数值 | String | -    |

## Demo

### 基本用法

```html
<template>
  <ysn-tableDesc :config="tableDescConfig" />
</template>
<script>
  export default {
    computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '建筑面积(m²)', value: 100 },
        { text: '计租面积(m²)', value: 100 }
      ]
      return list
    }
  }
  }
</script>
```
