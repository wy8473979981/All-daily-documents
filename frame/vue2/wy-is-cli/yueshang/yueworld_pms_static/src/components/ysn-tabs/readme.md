# Tabs 标签页组件

可支持增加减少的标签页组件

## Tabs Attributes

| 参数    | 说明             | 类型    | 可选值 | 默认值 |
| ------- | ---------------- | ------- | ------ | ------ |
| v-model | 当前选中的 index | Number  | -      | 0      |
| list    | tabs 渲染列表    | Array   | -      | []     |
| dynamic | 是否开启动态增删 | Boolean | -      | false  |

## List Attributes

`list` 数组中的每个元素都是一个对象，表示一个表单域的配置。
一部分配置是通用配置，对于不同的类型又有不同的选项可以配置。
其主要可选的配置如下：

| 键名  | 说明         | 类型   | 示例 |
| ----- | ------------ | ------ | ---- |
| label | tab 展示名称 | String | -    |

## Tabs Events

| 事件名称 | 说明                           | 回调参数                                                                                                                    |
| -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| change   | 选项选中发生改变时触发         | 被选中的标签 tab 实例                                                                                                       |
| toggle   | tab 动态渲染 开启`dynamic`生效 | type： 当前操作的类型 (枚举值:新增 plus 删除 minus) index： 当前应该删除的下标(下标值新增时返回为 null，只在删除时正确返回) |

## Demo

### 基本用法

```html
<template>
  <ysn-tabs
    :list="tabs_list"
    v-model="tabs_active"
    dynamic
    @change="handleChange"
    @toggle="handleToggle"
  />
</template>
<script>
  export default {
    data() {
      return {
        tabs_active: 0,
        tabs_list: [
          {
            label: '第1单元',
          },
          {
            label: '第2单元',
          },
        ],
      }
    },
    methods: {
      handleChange(event) {},
      handleToggle(type, index) {
        if (type === 'plus') {
          this.tabs_list.push({
            label: `第${this.tabs_list.length + 1}单元`,
          })
        } else {
          this.tabs_list.splice(index, 1)
          this.tabs_list = this.tabs_list.map((item, index) => ({
            label: `第${index + 1}单元`,
          }))
        }
      },
    },
  }
</script>
```
