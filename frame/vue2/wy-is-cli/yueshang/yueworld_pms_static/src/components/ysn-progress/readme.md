# Progress 进度信息展示

根据列表渲染进度信息

## Progress Attributes

| 参数   | 说明             | 类型   | 可选值 | 默认值 |
| ------ | ---------------- | ------ | ------ | ------ |
| active | 当前进度激活下标 | Number | -      | 0      |
| list   | 当前进度内容列表     | Array  | -      | []     |

## List Attributes

`list` 数组中的每个元素都是一个对象，表示一个表单域的配置。
一部分配置是通用配置，对于不同的类型又有不同的选项可以配置。
其主要可选的配置如下：

| 键名  | 说明         | 类型   | 示例 |
| ----- | ------------ | ------ | ---- |
| label | 当前进度标题 | String | -    |
| date  | 当前进度日期 | String | -    |
| ...  | 当前进度自定义字段 | String | -    |

## Demo

### 基本用法

```html
<template>
  <ysn-progress :list="progress_list" :active="progress_active">
    <div slot-scope="scope">
      <div v-if="scope.rows.no">自定义字段名</div>
      <div>{{ scope.rows.no }}</div>
    </div>
  </ysn-progress>
</template>
<script>
  export default {
    data() {
      return {
        progress_active: 3, // 当前进度激活下标
        progress_list: [
          // 进度内容列表
          {
            label: '洽谈', // 进度标题
            date: '2020-04-01', // 进度日期
            no: '1234567890' // 进度自定义字段
          },
          {
            label: '意向',
            date: '2020-04-04'
          },
          {
            label: '合同',
            date: '2020-04-08'
          },
          {
            label: '双签',
            date: '2020-04-10'
          },
          {
            label: '进场',
            date: '2020-04-20'
          },
          {
            label: '开业',
            date: '2020-04-28'
          }
        ]
      }
    }
  }
</script>
```
