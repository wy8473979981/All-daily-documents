# Confirm 二次确认组件

对点击操作进行二次确认

## Confirm Attributes

| 参数    | 说明               | 类型   | 可选值 | 默认值  |
| ------- | ------------------ | ------ | ------ | ------- |
| title   | 二次确认弹窗标题   | String | -      | ''      |
| width   | 二次确认弹窗宽度   | String | -      | '484px' |
| top     | 二次确认弹窗上边距 | String | -      | '120px' |
| content | 二次确认弹窗内容   | String | -      | ''      |
| tip     | 二次确认弹窗提示   | String | -      | ''      |

## Confirm Events

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| cancel   | 二次确认弹窗 取消操作 | 无       |
| confirm  | 二次确认弹窗 确认操作 | 无       |

## Demo

### 基本用法

```html
<template>
  <ysn-confirm
    title="提示"
    width="484px"
    top="120px"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <div>删除</div>
  </ysn-confirm>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleConfirm() {
        console.log('二次确认确认')
      },
      handleCancel() {
        console.log('二次确认取消')
      }
    }
  }
</script>
```
