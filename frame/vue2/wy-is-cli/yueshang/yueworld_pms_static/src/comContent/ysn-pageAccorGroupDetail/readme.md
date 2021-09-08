
# PageAccorDetail 手风琴详情页组件

用于本项目新增、编辑、详情页面组件

> 1.`详情页数据通过外部大对象控制,内部会在配置文件把对应的子对象通过v-model传递给子组件,在子组件内通过props+model接收`

> 2.子组件需要引入 `import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'`


> 3.子组件内部获取数据统一使用`this.currentFormData`,已通过mixins把配置项中的formDta[dataKey]做了转换

## PageContent Attributes

| 参数           | 描述                             | 类型    | 可选值                     | 默认值                   | 说明|
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- | -------|
| hasMenu  |  是否显示左侧菜单      | Boolean  |     | `true`   |   |
| config  |  主要内容配置      | Array  |     |     |  见`Config Item`配置  |
| formData  |  整个页面的数据   | Object  |     |     | 见`formData示例` |
| update  |  数据更新   | Number  |     |   0  | 每次外部formData更新时需要update++,常用于详情获取数据 |
| change  |  formData更新事件   | Function  |     |     | 内部修改formData值的时候会触发,内部emit一个change事件出来,外部接收后修改formData值即可 |

## Config Item 主要内容配置
| 参数           | 描述                             | 类型    | 可选值                     | 默认值                   | 说明|
| -------------- | -------------------------------- | ------- | -------------------------- | ---------------------------------- | -------|
| title  |  标题名     | String  |     |    |  用于左侧菜单栏与标题展示 |
| showFlod  |  是否显示展开收起      | Boolean  |     |   `true`  |    |
| flodSlot  |  手风琴标题右侧插槽   | String  |     |     | `flodSlot:‘插槽名’` |
| flodicon  |  是否显示标题右边的加号   | Boolean  |     |  `false`   |  显示后点击加号会触发对应子组件内部的`flodClick`事件  |
| component  |  手风琴内容组件   | Component  |     |     |  component: require('./blocks/xxx.vue').default |
| dataKey  |  子对象的key`[必填]`   | String  |     |     |  整个组件接收一个v-model对象,通过dataKey为每个component的子对象做v-model绑定 |
| valiForm  |  表单校验refs名   | Array  |     |     | 本组件会通过refs+valiForm获取到每个子组件内部需要校验的form对象进行校验   |
| slot  |  手风琴内容插槽   | String  |     |    |  赋值后`slot:'name'` name则为插槽名,展示在该项的内容下  |


### Slots 默认插槽
| 字段           | 描述                           | 类型      | 说明   |
| -------------- | -------------------------------- | --------- | -------|
| btn  |  顶部按钮插槽      | -  |  -   | 
| bottom  |  底部按钮插槽      | -  |  -   | 


## Events  事件




| 事件名           | 描述                           |  接收参数      | 说明   |
| -------------- | -------------------------------- | --------- | -------|
| valiFormDate  |  页面校验      | Array  |  `默认获取config内所有valiForm的集合进行校验,可传入一个[$refs.xxx]数组form对象同时进行校验`   | 



## Demo

### 基本用法

```html
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="handlerClick">保存</ysn-btn>
      </template>

      <!-- 底部插槽 -->
      <template #bottom>
        <div class="text-center" style="width:100%;background:#ddd">底部插槽-用于底部按钮 高度32px</div>
      </template>

      <!-- flod插槽 -->
      <template #baseInfo>
        基本信息flod插槽
      </template>
      <template #slotName>
        我是内容插槽 以下为组件
        <From1 v-model="formData.baseInfo" />
        插槽内容结束
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>
<script>
import From1 from './blocks/form1.vue'
// 请求api
import { pageConfig } from './config'
export default {
  name: 'PageAccordionDetailDemo',
  components: { From1 },
  props: {},
  data() {
    return {
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 统一数据
      formData: {
        baseInfo: {
          BuildingName: '',
          FloorName: '',
          OfficeId: ''
        }
      }
    }
  },

  mounted() {
  },
  methods: {
    async handlerClick() {
      // this.hasMenu = !this.hasMenu
      let res = await this.$refs.pageDetail.valiFormDate()
      console.log(res)
      // const refsList = [
      //   this.$refs.pageDetail.$refs.baseInfo.$refs.rulesForm,
      //   this.$refs.pageDetail.$refs.baseInfo2.$refs.rulesForm
      // ]
      // this.$refs.pageDetail.valFormDate(refsList)
    }
  }
}
</script>
<!-- PageAccorDetail-basic-usage.vue -->
```


### config.js配置文件

```js

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: 'flod插槽', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form1.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon:true,//展示头部加号
    },
    {
      title: '内容插槽',
      showFlod: true,
      hiddenFlod: true, // 默认收起
      slot: 'slotName', // 内容插槽
      dataKey:'baseInfo', //dataKey必须跟子组件内model接收的props一致
    }
  ]
}

```

### ./blocs/form1.vue 子组件示例
``` html
<template>
  <el-form ref="rulesForm" :model="baseInfo" label-position="top" size="small" :rules="rulesForm">
    {{$attrs.title}}
    <ysn-formItem :form="baseInfo" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>

export default {
  name: 'From1',
  components: {},
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData1: {},
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'BuildingName', label: '所属楼栋', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'FloorName', label: '楼层', placeholder: '请选择全部楼层', width: '200px' },
        { itemType: 'select', prop: 'OfficeId', label: '单元号', placeholder: '请选择单元号', width: '200px' }
      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }],
        FloorName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  methods:{
    flodClick(){
      console.log('headerClick')
    },
  }

}
</script>
```