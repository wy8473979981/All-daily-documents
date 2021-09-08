# Form Item 表单组件

根据配置生成表单，用于收集、校验数据。

> 本组件只是对于 form-item 及表单元素的一个封装，所有 element 中的参数和事件都可以通过属性方式传入

## Form Item Attributes

| 参数          | 说明                                            | 类型    | 可选值     | 默认值  |
| ------------- | ----------------------------------------------- | ------- | ---------- | ------- |
| form          | 表单数据对象                                    | Object  | -          | -       |
| disabled      | 是否禁用该表单内的所有组件                      | Boolean | -          | `false` |
| config        | 表单域配置                                      | Array   | -          | -       |
| rules         | 表单校验规则                                    | Array   | -          | -       |
| column        | 总 col 布局，输入数字多少每行有多少个 form-item | Number  | -          | 4       |
| itemWidth     | form-item 项的宽度                              | String  | -          | '100%'  |
| clearable     | 是否开启每个表单右侧的清楚按钮                  | Boolean | -          | `true`  |
| labelPosition | 是否左边 label                                  | String  | `Top/left` | `top`   |
| attrs         | 接收 el-form-item 其他属性                      | Any     |            |

> `form-item` 必须包裹在`<el-form/>`之内，同一个`<el-form/>`之内可以有多个`form-item`

### Form Item Config Config

`config` 数组中的每个元素都是一个对象，表示一个表单元素的配置。
一部分配置是通用配置，对于不同的类型又有不同的选项可以配置。
其主要可选的配置如下：

| 键名        | 说明                                                                   | 类型         | 示例/说明                                                      |
| ----------- | ---------------------------------------------------------------------- | ------------ | -------------------------------------------------------------- |
| prop        | **必选**，`el-form-item`的`prop`                                       | String       | -                                                              |
| itemType    | **必选**，表单元素类型                                                 | String,Array | 可选值：text/input/checkbox/datePicker/fileUpload/radio/select |
| itemIndex   | itemType===Array 时**必选**，切换时自动改变 itemType 元素              | Number       | -                                                              |
| iconName    | itemType===Array 时 切换的 icon,非必选，仅支持 element-ui 的 icon 类型 | String       | -                                                              |
| label       | 表单元素显示的名称                                                     | String       | -                                                              |
| width       | 表单元素宽度                                                           | String       | `{width:'100%'}`                                               |
| rule        | 表单域的校验规则                                                       | Array        | `[{ required: true, message: '' }]`                            |
| span        | 对应 col 占比，col 为 4，span 为 2，则该表单元素占整行的 50%           | String       | `1`                                                            |
| placeholder | 表单域的提示文字                                                       | String       | -                                                              |
| props       | 直接传递给组件的选项，_不推荐使用_                                     | Object       | -                                                              |
| listKey     | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典的 key           | String       | 默认:`label`                                                   |
| listName    | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典展示的 Name      | String       | 默认:`value`                                                   |
| list        | `itemType`为`radio`/`select`/`checkbox`时有效,设置字典列表             | Array        | `[{label:'名称',value:'1'}]`                                   |
| type        | 接收表单元素的 type                                                    | String       |
| hasSlot     | 是否开启插槽，开启后 prop 为插槽名                                     | Boolean      | 默认`false`                                                    |
| inputType   | `inputType`为`autoValue`时 `placeholder`为`--自动带入--'`              | String       |
| attrs       | 接收表单元素其他属性                                                   | Any          |

> 每个 itemType 的配置见 itemType Config

### ItemType Config

表单项配置中有一个关键属性 `itemType` 用来控制表单项渲染出的控件，配置不同类型的 `itemType` 时支持配置不同的参数，详见下表：

| 类型       | 对应控件       | 支持的配置 |
| ---------- | -------------- | ---------- |
| text       | 文本           |            |
| input      | 单行文本输入框 |            |
| radio      | 单选按钮       | options    |
| checkbox   | 复选框         | options    |
| datePicker | 日期范围       | -          |
| fileUpload | 文件上传       | -          |
| select     | 下拉框         | -          |

## Demo

### 基本用法

```html
<template>
  <h-form inline v-model="formData" :form-items="formItems"></h-form>
</template>
<script>
  export default {
    data() {
      return {
        formItems: [
          {
            key: 'name',
            type: 'text',
            label: '姓名',
            prefix: 'Mrs.',
            placeholder: '尊名',
            tips: '您的尊姓大名？',
            rules: ['required'],
            props: {
              width: 200,
            },
          },
          {
            key: 'gender',
            type: 'radio',
            label: '性别',
            options: [
              { value: '0', label: '女' },
              { value: '1', label: '男' },
            ],
          },
        ],
        formData: {},
      }
    },
  }
</script>
<!-- form-basic-usage.vue -->
```

### 表单联动

```html
<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rulesForm"
      label-position="top"
    >
      <ysn-formItem
        :form="formData"
        :config="configData"
        :column="5"
        :pack-up="packUp"
        clearable
        label-position="left"
      >
        <!--插槽-->
        <template #t22>
          <el-button class="el-button el-button--text">插槽</el-button>
        </template>
      </ysn-formItem>
    </el-form>
    <el-button class="mt-20" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
  export default {
    name: 'ex-form',

    components: { Button },

    data() {
      return {
        configData: [
          // 表单配置
          {
            itemType: ['select', 'input'],
            itemIndex: 0,
            iconName: 'el-icon-user-solid', //支持自定义icon
            prop: 't1',
            label: '输入框',
            placeholder: '请输入',
            width: '206px',
            required: true,
          },
          {
            itemType: 'input',
            type: 'textarea',
            prop: 't2',
            label: '输入框',
            placeholder: '请输入',
            width: '206px',
          },
          {
            itemType: 'radio',
            prop: 't3',
            label: '单选框',
            list: selectList,
            width: '264px',
          },
          {
            itemType: 'checkbox',
            prop: 't3',
            label: '复选框',
            list: selectList,
            checkAll: true,
          },
          {
            itemType: 'datePicker',
            prop: 't5',
            label: '日期带默认值',
            type: 'date',
            width: '206px',
          },
          {
            itemType: 'datePicker',
            prop: 't6',
            label: '日期valueFormat',
            type: 'date',
            width: '206px',
            span: 2,
            align: ' right',
            valueFormat: 'yyyy-MM',
          },
          {
            itemType: 'datePicker',
            prop: 't4',
            label: '日期range',
            type: 'daterange',
            width: '206px',
            span: 2,
          },
          { itemType: 'select', prop: 't22', label: '插槽', hasSlot: true },
          {
            itemType: 'input',
            prop: 't20',
            label: '搜索框',
            placeholder: '请输入',
            width: '206px',
            isSearch: true,
          },

          {
            itemType: 'fileUpload',
            prop: 'fileList',
            label: '上传文件',
            btnText: '上传',
            width: '428px',
            isSearch: true,
            actionUrl: '',
            limitNum: 4,
            span: 2,
          },
          {
            itemType: 'monthPicker',
            prop: 't7',
            label: '月份选择',
            type: 'month',
            width: '206px',
            valueFormat: 'yyyy-MM',
          },
          {
            itemType: 'timePicker',
            prop: 't10',
            label: '时间选择：时-分',
          },
        ],

        rulesForm: {
          // 表单验证
          t1: [{ required: true, message: '请输入必填项' }],
        },
      }
    },

    methods: {
      //提交
      submit() {
        this.$refs.ruleForm.validate((valid, failedObj) => {
          console.log(failedObj, valid)
          if (valid) {
            // 在这里添加提交代码
            console.log('this.formData=======', this.formData)
          } else {
            // 光标定位在以一个校验不通过项
            setTimeout(() => {
              var isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            }, 100)
          }
        })
      },
    },
  }
</script>
<!-- form-advanced-usage.vue -->
```
