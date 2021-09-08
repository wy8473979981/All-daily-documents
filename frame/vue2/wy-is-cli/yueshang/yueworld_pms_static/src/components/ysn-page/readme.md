<!--
 * @Author: fhj
 * @LastEditors: xueyx
 * @Description: 
-->
# Page 分页组件

分页组件

## Page Attributes

| 参数    | 说明               | 类型   | 可选值 | 默认值  |
| ------- | ---------------- | ------ | ------ | ------- |
| total   | 总数   | Number | -      | 0      |
| page   |  page对象   | Object | -      |  |
| pageSizes     | 每页数量可选值 | Array | -      | `[10, 20, 30, 50]` |



## Page Events

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| change   | 分页发生变化事件 | page       |


## page Object
| 参数    | 说明               | 类型   | 可选值 | 默认值  |
| ------- | ---------------- | ------ | ------ | ------- |
| pageNo   | 当前页码   | Number | -      |       |
| pageSize   |  每页条数   | Number | -      |  |

>`page:{
>   pageNo:1,
>   pageSize:20    
>}`

## Demo

### 基本用法

```html
<template>
  <ysn-page :page="page" @change="pageChange"/>
</template>
<script>
  export default {
    data() {
      return {
          page:{
              pageNo:1,
              pageSize:20
          }
      }
    },
    methods: {
      pageChange(newPage) {
          this.page = {...newPage}
          this.getList()
      },
      getList(){
        console.log('获取列表数据)
      }
    }
  }
</script>
```




### 外部控制 external:true用法

```html
<template>
  <ysn-dialog 
        :title="'新增'" 
        external
        :is-show-dialog="visible"
        @closeDialog="handleVisible">
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