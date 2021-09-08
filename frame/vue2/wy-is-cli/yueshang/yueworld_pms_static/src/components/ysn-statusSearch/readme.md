# StatusSearch 状态筛选组件

用于列表等状态类的筛选搜索

## StatusSearch Attributes

| 参数    | 说明             | 类型    | 可选值 | 默认值 |
| ------- | ---------------- | ------- | ------ | ------ |
| config  | 组件配置  | Array  | -      | []      |
| name    | 状态名字    | String   | -      |  ''     |

## Config List Item Attributes



| 键名  | 说明         | 类型   | 示例 |
| ----- | ------------ | ------ | ---- |
| label | 状态名 | String | -    |
| value | 状态值 | String | -    |
| statusNum | 数量 | [String|NUmber] | -    |

## StatusSearch Events

| 事件名称 | 说明                           | 回调参数                                                                                                                    |
| -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| change   | 选项选中发生改变时触发         |  选中后的状态数组                    |

## Demo

### 基本用法

```html
<template>
      <ysn-statusSearch 
        :config="statusSearchConfig" 
        name="审批状态"  
        @change="handleChange"/>
</template>
<script>
  export default {
    computed: {
        // 筛选条件
        statusSearchConfig() {
        return [
            { label: '草稿', value: 1, statusNum: 0 },
            { label: '审核中', value: 2, statusNum: 1 },
            { label: '审核通过', value: 3, statusNum: 10 },
            { label: '已驳回', value: 4, statusNum: 20 }
        ]
        }
    },
    methods: {
      // change
      handleChange(statusList) {
        console.log(statusList)
      },
      
    }
  }
</script>
```
