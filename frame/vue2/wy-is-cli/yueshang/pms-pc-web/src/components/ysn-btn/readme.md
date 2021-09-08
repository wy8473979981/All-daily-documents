<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
# Btn 按钮

用于本项目所有主要、次要、删除按钮。

## Btn Attributes

| 参数           | 说明                             | 类型    | 可选值                     | 默认值                             |
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- |
| type          | 按钮类型                     | String  | `primary`/`info`/`delete`  /`reset`                        | `primary`                               |
| attr  | 支持el-button所有属性                | Any  | -                          |                       |

> `type`为`delete`时为删除样式按钮
> `type`为`reset`时为重置样式按钮
> `type`为`primary`时为深蓝色主要功能按钮
> `type`为`info`时为灰色次要按钮

## Demo

### 基本用法

```html
<template>
  <ysn-btn>确认</ysn-btn>
  <ysn-btn type="info">取消</ysn-btn>
  <ysn-btn type="delete">删除</ysn-btn>
  <ysn-btn type="reset">重置</ysn-btn>
  
  <!-- 禁用状态 -->
  <ysn-btn disabled>确认</ysn-btn>
  <ysn-btn type="info" disabled>取消</ysn-btn>
  <ysn-btn type="delete" disabled>删除</ysn-btn>
</template>
<script>
  export default {
    data() {
      return {
        
      };
    }
  };
</script>
<!-- btn-basic-usage.vue -->
```
