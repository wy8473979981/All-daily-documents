# Dialog 弹窗组件

弹窗组件

## Dialog Attributes

| 参数           | 说明                                  | 类型                    | 可选值 | 默认值  |
| -------------- | ------------------------------------- | ----------------------- | ------ | ------- |
| isDetermine    | 是否需要确定按钮                      | Boolean                 | -      | `true`  |
| isCancel       | 是否需要取消按钮                      | Boolean                 | -      | `true`  |
| top            | 弹窗距离顶部距离                      | String                  | -      | `5%`    |
| outClose       | 关闭弹窗                              | [Boolean,String,Number] | -      | `true`  |
| isShowDialog   | 是否显示 dialog external 为 true 时生 | Boolean                 | -      | `false` |
| external       | 是否从外部控制 dialog 打开            | Boolean                 | -      | `false` |
| determineTitle | 确认按钮文字                          | String                  | -      | `确认`  |
| cancelTitle    | 取消按钮文字                          | String                  | -      | `取消`  |

## Dialog Events

| 事件名称    | 说明                              | 回调参数 |
| ----------- | --------------------------------- | -------- |
| cancel      | 弹窗关闭事件                      | 无       |
| ok          | 弹窗关闭事件 确认操作             | 无       |
| closeDialog | external 为 true 时触发，关闭弹窗 | 无       |

## Demo

### 基本用法

```html
<template>
  <ysn-dialog :title="'新增'" :out-close="outClose" @cancel="closeDialog">
    <!-- 默认slot点击时打开弹窗 -->
    <ysn-btn class="mr-8">新增</ysn-btn>
    <!-- 弹窗表格 -->
    <template #contain>
      弹窗内容
    </template>
    <!-- 弹窗按钮 -->
    <template #btn>
      <div class="text-right" @click="preservation">
        <ysn-btn>保存</ysn-btn>
      </div>
    </template>
  </ysn-dialog>
</template>
<script>
  export default {
    data() {
      return {
          outClose:true
      }
    },
    methods: {
      closeDialog() {
        console.log('弹窗关闭')
      },
      handleVisible(){
        console.log('点击保存)
      }
    }
  }
</script>
```

### 外部控制 external:true 用法

```html
<template>
  <ysn-dialog
    :title="'新增'"
    external
    :is-show-dialog="visible"
    @closeDialog="handleVisible"
  >
    <!-- 弹窗表格 -->
    <template #contain>
      弹窗内容
    </template>
    <!-- 弹窗按钮 -->
    <template #btn>
      <div class="text-right" @click="preservation">
        <ysn-btn>保存</ysn-btn>
      </div>
    </template>
  </ysn-dialog>
</template>
<script>
  export default {
    data() {
      return {
          visible:true,//默认打开弹窗
      }
    },
    methods: {
      closeDialog() {
        console.log('弹窗关闭')
      },
      handleVisible(){
        console.log('点击保存)
      }
    }
  }
</script>
```
